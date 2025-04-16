import { observer } from 'mobx-react-lite';
import { RootStore } from '@/store';
import { MusicManagerStore } from '@/store/musicManagerStore';
import { Icon } from '@/components/Common/Iconify/icons';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

export const BlinkoMusicPlayer = observer(() => {
  const musicManager = RootStore.Get(MusicManagerStore);
  const isPc = useMediaQuery('(min-width: 768px)');
  const progressRef = useRef<HTMLDivElement>(null);
  const currentTrack = musicManager.currentTrack;
  const metadata = currentTrack?.metadata;
  const [isCompact, setIsCompact] = useState(false);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!musicManager.audioElement) return;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    musicManager.seek(musicManager.duration * percentage);
  };

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current || !musicManager.audioElement) return;
      const percentage = (musicManager.currentTime / musicManager.duration) * 100;
      progressRef.current.style.width = `${percentage}%`;
    };

    const interval = setInterval(updateProgress, 100);
    return () => clearInterval(interval);
  }, [musicManager.currentTrack]);

  useEffect(() => {
    if (musicManager.showMiniPlayer) {
      const timer = setTimeout(() => {
        setIsCompact(true);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsCompact(false);
    }
  }, [musicManager.showMiniPlayer]);

  return (
    <AnimatePresence mode="wait">
      {musicManager.showMiniPlayer && currentTrack && (
        <motion.div
          initial={{ y: -100, x: isPc ? "-50%" : 0 }}
          animate={{ y: 0, x: "-50%" }}
          exit={{ y: -100, x: "-50%" }}
          transition={{
            y: {
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.8
            },
            x: {
              type: "tween",
              duration: 0.2
            }
          }}
          className="fixed top-3 left-[50%] z-50 w-fit md:w-[450px] rounded-2xl bg-none select-none"
          onMouseEnter={() => setIsCompact(false)}
          onMouseLeave={() => setIsCompact(true)}
        >
          <motion.div
            animate={isCompact ? "compact" : "full"}
            variants={{
              full: {
                height: "85px",
                width: isPc ? "450px" : "100%",
                margin: isPc ? '0' : 'auto',
                opacity: 1,
                borderRadius: "16px"
              },
              compact: {
                height: isPc ? "42px" : '36px',
                width: isPc ? "220px" : '100px',
                x: isPc ? "50%" : '0',
                opacity: 0.95,
                borderRadius: "18px",
                margin: isPc ? '0' : 'auto',
              }
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              mass: 0.8,
              duration: 0.6
            }}
            className="relative overflow-hidden shadow-lg backdrop-blur-2xl"
          >
            {metadata?.coverUrl ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${metadata.coverUrl})`,
                    filter: 'blur(20px)',
                    transform: 'scale(1.1)',
                    opacity: isCompact ? 0.3 : 0.5,
                  }}
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-xl" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-blue-500/20 dark:to-purple-500/20" />
                <div className="absolute inset-0 backdrop-blur-xl bg-black/5 dark:bg-black/10" />
              </>
            )}

            <div className={`relative flex items-center  ${isCompact ? 'p-2 gap-4' : 'p-4 gap-2'} transition-all duration-500 ease-in-out`}>
              <motion.div
                animate={{
                  width: isCompact ? 26 : 50,
                  height: isCompact ? 26 : 50,
                  minWidth: isCompact ? 26 : 50,
                  scale: isCompact ? 0.95 : 1,
                  marginRight: isCompact ? 16 : 14,
                  marginLeft: isCompact ? 8 : 0,
                  marginTop: isCompact ? -22 : 0
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 200,
                  mass: 0.8,
                  duration: 0.6
                }}
                className="relative rounded-md overflow-hidden"
              >
                {metadata?.coverUrl ? (
                  <img
                    src={metadata.coverUrl}
                    alt="Album Cover"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-200 flex items-center justify-center">
                    <Icon icon="ph:music-notes" className={`${isCompact ? 'w-4 h-4' : 'w-6 h-6'} text-gray-500`} />
                  </div>
                )}
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.div
                  className="flex items-center justify-between"
                  animate={{
                    y: isCompact ? -1 : 0,
                    scale: isCompact ? 0.98 : 1,
                    marginBottom: isCompact ? 2 : 4
                  }}
                >
                  <motion.div className="flex-1">
                    <motion.div
                      className={`truncate ${isPc ? 'max-w-[180px]' : 'max-w-[100px]'} ${metadata?.coverUrl ? 'text-white' : 'text-gray-700 dark:text-white'}`}
                      animate={{
                        fontSize: isCompact ? 12 : 14,
                        lineHeight: isCompact ? "16px" : "20px",
                        marginLeft: isCompact ? -20 : 0,
                        marginTop: isCompact ? -2 : 0,
                        opacity: isCompact ? (isPc ? 1 : 0) : 1
                      }}
                    >
                      {metadata?.trackName || currentTrack.file.name}
                    </motion.div>
                    <motion.div
                      animate={{ height: isCompact ? 0 : "auto", opacity: isCompact ? 0 : 1 }}
                      className={`text-sm truncate overflow-hidden ${metadata?.coverUrl ? 'text-white/80' : 'text-gray-600 dark:text-white/80'}`}
                    >
                      {metadata?.artists && metadata.artists.join(', ')}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4"
                    animate={{
                      opacity: isCompact ? 0 : 1,
                      width: isCompact ? 0 : "auto",
                      scale: isCompact ? 0.8 : 1
                    }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 200,
                      duration: 0.6
                    }}
                  >
                    <button onClick={() => musicManager.playPrevious()}>
                      <Icon
                        icon="ph:skip-back-fill"
                        className={`w-${isPc ? 6 : 4} h-${isPc ? 6 : 4} text-white hover:text-white/80 transition-colors`}
                      />
                    </button>
                    <button onClick={() => musicManager.togglePlay()}>
                      <Icon
                        icon={musicManager.isPlaying ? "ph:pause-fill" : "ph:play-fill"}
                        className={`w-${isPc ? 8 : 6} h-${isPc ? 8 : 6} text-white hover:text-white/80 transition-colors`}
                      />
                    </button>
                    <button onClick={() => musicManager.playNext()}>
                      <Icon
                        icon="ph:skip-forward-fill"
                        className={`w-${isPc ? 6 : 4} h-${isPc ? 6 : 4} text-white hover:text-white/80 transition-colors`}
                      />
                    </button>
                    <button onClick={() => musicManager.closeMiniPlayer()}>
                      <Icon
                        icon="ph:x"
                        className={`w-${isPc ? 6 : 4} h-${isPc ? 6 : 4} text-white hover:text-white/80 transition-colors`}
                      />
                    </button>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 overflow-hidden"
                  animate={{
                    scale: isCompact ? 0.95 : 1,
                    y: isCompact ? -2 : 0,
                    marginTop: isCompact ? 2 : 4
                  }}
                >
                  <motion.span
                    className="text-xs text-white/80"
                    animate={{
                      opacity: isCompact ? 0 : 1,
                      width: isCompact ? 0 : "auto",
                      marginRight: isCompact ? 0 : 8
                    }}
                  >
                    {formatTime(musicManager.currentTime)}
                  </motion.span>
                  <div
                    className={`flex-1 transition-all duration-300`}
                    style={{
                      height: isCompact ? '2px' : '4px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '9999px',
                      cursor: 'pointer'
                    }}
                    onClick={handleProgressBarClick}
                  >
                    <motion.div
                      ref={progressRef}
                      className="h-full rounded-full bg-white"
                      animate={{
                        height: isCompact ? '2px' : '4px'
                      }}
                    />
                  </div>
                  <motion.span
                    className="text-xs text-white/80"
                    animate={{
                      opacity: isCompact ? 0 : 1,
                      width: isCompact ? 0 : "auto",
                      marginLeft: isCompact ? 0 : 8
                    }}
                  >
                    {formatTime(musicManager.duration)}
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
