import React, { useEffect, useState, useRef } from 'react';
import { api } from '@/lib/trpc';
import { FileType } from '../Editor/type';
import { DeleteIcon, DownloadIcon } from './icons';
import { Icon } from '@/components/Common/Iconify/icons';
import { RootStore } from '@/store';
import { MusicManagerStore } from '@/store/musicManagerStore';
import { observer } from 'mobx-react-lite';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';
import { useTranslation } from 'react-i18next';

interface AudioMetadata {
  coverUrl?: string;
  trackName?: string;
  albumName?: string;
  artists?: string[];
  previewUrl?: string;
}

interface Props {
  files: FileType[];
  preview?: boolean;
}

const INITIAL_DISPLAY_COUNT = 3;

export const AudioRender = observer(({ files, preview = false }: Props) => {
  const [audioMetadata, setAudioMetadata] = useState<Record<string, AudioMetadata>>({});
  const musicManager = RootStore.Get(MusicManagerStore);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const progressRefs = useRef<Record<string, HTMLDivElement>>({});
  const [currentTime, setCurrentTime] = useState<Record<string, string>>({});
  const [duration, setDuration] = useState<Record<string, string>>({});
  const [showAll, setShowAll] = useState(false);
  const { t } = useTranslation()

  const getMetadata = async (file: FileType) => {
    try {
      const metadata = await api.public.musicMetadata.query({
        filePath: file.preview.includes('s3file') ? new URL(file.preview, window.location.href).href : file.preview
      });
      setAudioMetadata(prev => ({
        ...prev,
        [file.name]: metadata
      }));
    } catch (error) {
      console.error('Failed to fetch audio metadata:', error);
    }
  };

  useEffect(() => {
    files?.filter(i => i.previewType === 'audio').forEach(file => {
      getMetadata(file);
      
      // Set initial duration for recordings with audioDuration property
      if (file.name.startsWith('my_recording_') && (file as any).audioDuration) {
        setDuration(prev => ({
          ...prev,
          [file.name]: (file as any).audioDuration
        }));
      }
    });
  }, [files]);

  const isCurrentPlaying = (fileName: string) => {
    return musicManager.isPlaying && musicManager.currentTrack?.file.name === fileName;
  };

  const togglePlay = async (fileName: string) => {
    const audioFiles = files.filter(i => i.previewType === 'audio');
    const file = audioFiles.find(f => f.name === fileName);
    if (!file) {
      return;
    }

    if (musicManager.currentTrack?.file.name === fileName) {
      await musicManager.togglePlay();
      return;
    }

    musicManager.addToPlaylist(file, audioMetadata[fileName], true);

    const otherFiles = audioFiles.filter(f => f.name !== fileName);
    otherFiles.forEach(f => {
      musicManager.addToPlaylist(f, audioMetadata[f.name], false);
    });
  };

  const formatTime = (seconds: number): string => {
    // Handle invalid input
    if (!isFinite(seconds) || isNaN(seconds)) {
      return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const updateProgress = () => {
      if (!musicManager.audioElement) return;

      const fileName = musicManager.currentTrack?.file.name;
      if (!fileName) return;

      const progress = progressRefs.current[fileName];
      if (!progress) return;

      // Avoid division by zero or NaN values
      const percentage = musicManager.duration > 0 
        ? (musicManager.currentTime / musicManager.duration) * 100 
        : 0;
      progress.style.width = `${percentage}%`;

      setCurrentTime(prev => ({
        ...prev,
        [fileName]: formatTime(musicManager.currentTime)
      }));

      if (musicManager.duration) {
        // Check for valid duration before setting
        if (!isNaN(musicManager.duration) && isFinite(musicManager.duration)) {
          setDuration(prev => ({
            ...prev,
            [fileName]: formatTime(musicManager.duration)
          }));
        }
      }
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [musicManager.currentTrack]);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>, fileName: string) => {
    if (!musicManager.audioElement || musicManager.currentTrack?.file.name !== fileName) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;

    musicManager.seek(musicManager.duration * percentage);
  };

  const handleEnded = (fileName: string) => {
    setIsPlaying(prev => ({ ...prev, [fileName]: false }));
    const progress = progressRefs.current[fileName];
    if (progress) {
      progress.style.width = '0%';
    }
  };

  const handleProgressBarDrag = (e: React.MouseEvent<HTMLDivElement>, fileName: string) => {
    if (!musicManager.audioElement || musicManager.currentTrack?.file.name !== fileName) return;

    const progressBar = e.currentTarget;
    const updateTimeFromMousePosition = (e: MouseEvent) => {
      const rect = progressBar.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      musicManager.seek(musicManager.duration * percentage);
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateTimeFromMousePosition(e);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getBackgroundStyle = (coverUrl?: string) => {
    if (!coverUrl) {
      return 'bg-gradient-to-r from-gray-100 to-gray-50 dark:from-blue-500/10 dark:to-purple-500/10 backdrop-blur-sm hover:bg-opacity-90 border border-black/5 dark:border-white/5';
    }
    return 'bg-cover bg-center relative overflow-hidden hover:bg-opacity-90';
  };

  const audioFiles = files?.filter(i => i.previewType === 'audio') || [];

  return (
    <div className="flex flex-col gap-2">
      {audioFiles.map((file, index) => {
        const metadata = audioMetadata[file.name];
        return (
          <AnimatePresence mode="wait" key={`${file.name}-${index}`}>
            {(!showAll && index >= INITIAL_DISPLAY_COUNT) ? null : (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut"
                }}
              >
                <div className={`group relative flex items-center gap-3 p-2 md:p-3 cursor-pointer !transition-all rounded-xl ${getBackgroundStyle(metadata?.coverUrl)}`}>
                  {metadata?.coverUrl && (
                    <>
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40"
                        style={{ backgroundImage: `url(${metadata.coverUrl})` }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-20" />
                    </>
                  )}

                  <div className="relative flex items-center gap-3 w-full z-10">
                    <div
                      className="relative min-w-[40px] md:min-w-[50px] h-[40px] md:h-[50px] cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        togglePlay(file.name);
                      }}>
                      {metadata?.coverUrl ? (
                        <img
                          src={metadata.coverUrl}
                          alt="Album Cover"
                          className="w-full h-full rounded-md object-cover pointer-events-none"
                        />
                      ) : (
                        <div className="w-full h-full rounded-md bg-gray-200 flex items-center justify-center pointer-events-none">
                          <Icon icon="ph:music-notes" className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center hover:bg-black/20 rounded-md !transition-all pointer-events-none">
                        <Icon
                          icon={isCurrentPlaying(file.name) ? "ph:pause-fill" : "ph:play-fill"}
                          className="w-6 h-6 text-white drop-shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className={`font-medium truncate max-w-[90%] ${metadata?.coverUrl ? 'text-white' : ''}`}>
                          {file.name.startsWith('my_recording_')
                            ? ((duration[file.name] || (file as any).audioDuration)
                              ? `${t('recording')} (${duration[file.name] || (file as any).audioDuration})`
                              : t('recording'))
                            : (metadata?.trackName || file.name)}
                        </div>
                        <AnimatePresence>
                          {isCurrentPlaying(file.name) && (
                            <motion.div
                              className={`text-xs ${metadata?.coverUrl ? 'text-white/80' : 'text-gray-500'}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                              {currentTime[file.name]} / {duration[file.name] || (file as any).audioDuration}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      {metadata?.artists && metadata.artists.length > 0 && (
                        <div className={`text-sm truncate ${metadata?.coverUrl ? 'text-white/80' : 'text-gray-500'}`}>
                          {metadata.artists.join(', ')}
                        </div>
                      )}

                      {file.name.startsWith('my_recording_') && !isCurrentPlaying(file.name) && !metadata?.artists && (
                        <div className={`text-sm ${metadata?.coverUrl ? 'text-white/80' : 'text-gray-500'}`}>
                          {duration?.[file.name] || (file as any).audioDuration || t('recording')}
                        </div>
                      )}

                      <AnimatePresence>
                        {isCurrentPlaying(file.name) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          >
                            <div
                              className="relative h-1 bg-black/20 rounded-full mt-2 cursor-pointer"
                              onClick={(e) => handleProgressBarClick(e, file.name)}
                              onMouseDown={(e) => handleProgressBarDrag(e, file.name)}
                            >
                              <div
                                ref={el => {
                                  if (el) {
                                    progressRefs.current[file.name] = el;
                                  }
                                }}
                                className={`absolute h-full rounded-full !transition-all duration-100 ${metadata?.coverUrl ? 'bg-white' : 'bg-primary'
                                  }`}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {!file.uploadPromise?.loading?.value && !preview && (
                      <DeleteIcon
                        files={files}
                        className={`ml-2 group-hover:opacity-100 opacity-0 ${metadata?.coverUrl ? 'text-white' : ''
                          }`}
                        file={file}
                      />
                    )}
                    {preview && (
                      <DownloadIcon
                        className={`ml-2 ${metadata?.coverUrl ? 'text-white' : ''}`}
                        file={file}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}

      {audioFiles.length > INITIAL_DISPLAY_COUNT && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='w-full flex justify-center'
        >
          <Button
            variant="light"
            className="mt-2 w-fit mx-auto"
            onPress={() => setShowAll(!showAll)}
          >
            <Icon
              icon={showAll ? "ph:caret-up" : "ph:caret-down"}
              className="mr-2"
            />
            {showAll ? t('collapse') : `${t('show-all')} (${audioFiles.length})`}
          </Button>
        </motion.div>
      )}
    </div>
  );
})