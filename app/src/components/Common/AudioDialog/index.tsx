import { RootStore } from "@/store";
import { useCallback, useState, useEffect, useRef, useMemo } from "react";
import useAudioRecorder from "../AudioRecorder/hook";
import { Icon } from '@/components/Common/Iconify/icons';
import { DialogStandaloneStore } from "@/store/module/DialogStandalone";

interface MyAudioRecorderProps {
  onComplete?: (file: File) => void;
}

export const MyAudioRecorder = ({ onComplete }: MyAudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [lastRecordingBlob, setLastRecordingBlob] = useState<Blob | null>(null);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [milliseconds, setMilliseconds] = useState<number>(0);
  const millisecondTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [audioPermissionGranted, setAudioPermissionGranted] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number[]>(Array(30).fill(0));
  const animationFrameRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    mediaRecorder,
  } = useAudioRecorder();

  // Setup audio analyzer
  const setupAudioAnalyser = useCallback((stream: MediaStream) => {
    try {
      // Close existing AudioContext if any
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        analyserRef.current = null;
        sourceRef.current = null;
      }

      // Create new AudioContext
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      // Create analyzer node
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128; // Smaller FFT size for better performance
      analyser.smoothingTimeConstant = 0.7; // Enhanced smoothing
      analyserRef.current = analyser;
      
      // Connect audio source to analyzer
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      sourceRef.current = source;
      
      // Initialize audio level array with minimum height values
      setAudioLevel(Array(30).fill(3)); 
      
      // Create update function for audio levels
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        
        // Get frequency data even when not recording for smooth animation
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        // Calculate weighted average volume, emphasizing low and mid frequencies
        const sum = dataArray.reduce((acc, val, i) => {
          // Weight low and mid frequencies more
          const weight = i < dataArray.length / 3 ? 1.5 : 
                          i < dataArray.length * 2/3 ? 1.2 : 0.8;
          return acc + (val * weight);
        }, 0);
        
        const average = sum / dataArray.length;
        // Ensure value is always a number
        const scaledValue: number = Math.max(average * 1.5, 3);
        
        // Update audio level display with smooth animation
        setAudioLevel(prevLevels => {
          const newLevels = [...prevLevels].map(n => n || 0); // Ensure all values are numbers
          // Shift array left, add new value at end
          for (let i = 0; i < newLevels.length - 1; i++) {
            newLevels[i] = newLevels[i+1] || 0;
          }
          newLevels[newLevels.length - 1] = scaledValue;
          return newLevels;
        });
        
        // Continue animation loop
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      
      // Start animation immediately
      animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      console.log("Audio visualization started");
    } catch (error) {
      console.error("Failed to setup audio analyzer:", error);
    }
  }, []);

  // Cleanup audio analyzer resources
  const cleanupAudioAnalyser = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      try {
        audioContextRef.current.close();
      } catch (error) {
        console.error("Failed to close AudioContext:", error);
      }
    }
    
    audioContextRef.current = null;
    analyserRef.current = null;
  }, []);

  // Start recording automatically when component mounts
  useEffect(() => {
    const initRecording = async () => {
      try {
        const stream = await startRecording();
        if (stream) {
          setupAudioAnalyser(stream);
        }
        setAudioPermissionGranted(true);
        setIsRecording(true);
        
        // Start timer for recording duration
        const timer = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        setTimerId(timer);
        
        // Start milliseconds timer for smoother UI updates
        const msTimer = setInterval(() => {
          setMilliseconds(prev => (prev + 1) % 100);
        }, 10);
        millisecondTimerRef.current = msTimer;
      } catch (error) {
        console.error("Failed to start recording:", error);
      }
    };
    
    initRecording();
    
    return () => {
      if (timerId) clearInterval(timerId);
      if (millisecondTimerRef.current) clearInterval(millisecondTimerRef.current);
      cleanupAudioAnalyser();
    };
  }, []);

  // When recording blob changes, store it
  useEffect(() => {
    if (recordingBlob) {
      setLastRecordingBlob(recordingBlob);
    }
  }, [recordingBlob]);

  // Monitor mediaRecorder status changes
  useEffect(() => {
    if (mediaRecorder) {
      const handleStart = () => {
        setIsRecording(true);
      };
      
      const handleStop = () => {
        setIsRecording(false);
        cleanupAudioAnalyser();
      };
      
      mediaRecorder.addEventListener('start', handleStart);
      mediaRecorder.addEventListener('stop', handleStop);
      
      return () => {
        mediaRecorder.removeEventListener('start', handleStart);
        mediaRecorder.removeEventListener('stop', handleStop);
      };
    }
  }, [mediaRecorder, cleanupAudioAnalyser]);

  const handleStopRecording = useCallback(() => {
    if (isRecording) {
      setIsRecording(false);
      
      try {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          stopRecording();
        }
      } catch (error) {
        console.error("Stop recording error:", error);
      }
      
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
      
      if (millisecondTimerRef.current) {
        clearInterval(millisecondTimerRef.current);
        millisecondTimerRef.current = null;
      }
      
      cleanupAudioAnalyser();
    }
  }, [isRecording, stopRecording, mediaRecorder, timerId, cleanupAudioAnalyser]);

  const handleComplete = useCallback(() => {
    if (recordingBlob) {
      const isMP4 = recordingBlob.type === 'audio/mp4';
      const extension = isMP4 ? 'mp4' : 'webm';
      const mimeType = isMP4 ? 'audio/mp4' : 'audio/webm';
      const file = new File([recordingBlob], `my_recording_${Date.now()}.${extension}`, {
        type: mimeType
      });
      
      // Add duration as a custom property to the file
      const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
      const seconds = Math.floor(recordingTime % 60).toString().padStart(2, '0');
      const durationStr = `${minutes}:${seconds}`;
      Object.defineProperty(file, 'audioDuration', {
        value: durationStr,
        writable: false
      });
      
      onComplete?.(file);
    }
  }, [recordingBlob, onComplete, recordingTime]);

  const handleDelete = useCallback(() => {
    setLastRecordingBlob(null);
    setRecordingTime(0);
    setMilliseconds(0);
    
    const initNewRecording = async () => {
      try {
        const stream = await startRecording();
        if (stream) {
          setupAudioAnalyser(stream);
        }
        setIsRecording(true);
        
        // Restart timer
        const timer = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
        setTimerId(timer);
        
        // Restart milliseconds timer
        const msTimer = setInterval(() => {
          setMilliseconds(prev => (prev + 1) % 100);
        }, 10);
        millisecondTimerRef.current = msTimer;
      } catch (error) {
        console.error("Failed to restart recording:", error);
      }
    };
    
    initNewRecording();
  }, [startRecording, setupAudioAnalyser]);

  // Format time display as MM:SS.XX
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(recordingTime / 60).toString().padStart(2, '0');
    const seconds = Math.floor(recordingTime % 60).toString().padStart(2, '0');
    const ms = milliseconds.toString().padStart(2, '0');
    return `${minutes}:${seconds}.${ms}`;
  }, [recordingTime, milliseconds]);

  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full h-full p-4 bg-neutral-900 rounded-lg">
        <div className="w-full">
          <div className="flex items-center">
            <span className="text-white font-bold">REC</span>
            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </div>
        </div>
        
        <div className="w-full flex-1 flex flex-col items-center justify-center my-4">
          <div className="my-4 w-full">
            {!audioPermissionGranted ? (
              <div className="text-yellow-500 text-center text-sm mb-2">
                Please allow microphone access to start recording
              </div>
            ) : null}
            
            <div className="w-full h-[40px] flex items-center justify-center rounded">
              <div className="w-full h-full flex items-end justify-center space-x-1 px-2">
                {audioLevel.map((level, index) => (
                  <div 
                    key={index} 
                    className="w-[3px] bg-green-500 rounded-t-sm" 
                    style={{ 
                      height: `${Math.min(level, 100)}%`,
                      transition: 'height 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
                      opacity: isRecording ? 1 : 0.5,
                      transform: `translateY(${isRecording ? 0 : 2}px)`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-white text-7xl font-bold mt-4">
            {formattedTime}
          </div>
        </div>
        
        <div className="flex justify-center mt-4 w-full">
          {isRecording ? (
            <button
              className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center focus:outline-none active:transform active:scale-95 transition-transform"
              onClick={handleStopRecording}
            >
              <div className="w-6 h-6 bg-white rounded"></div>
            </button>
          ) : (
            <div className="flex gap-5">
              <button
                className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center focus:outline-none active:transform active:scale-95 transition-transform"
                onClick={handleDelete}
              >
                <Icon icon="mdi:close" className="text-red-500" width="30" height="30" />
              </button>
              <button
                className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center focus:outline-none active:transform active:scale-95 transition-transform"
                onClick={handleComplete}
              >
                <Icon icon="mdi:check" className="text-white" width="30" height="30" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const ShowAudioDialog = ((onComplete: (file: File) => void) => {
  return RootStore.Get(DialogStandaloneStore).setData({
    size: 'sm',
    onlyContent: true,
    isOpen: true,
    content: <MyAudioRecorder onComplete={(file) => {
      onComplete(file)
      RootStore.Get(DialogStandaloneStore).close();
    }} />
  })
})