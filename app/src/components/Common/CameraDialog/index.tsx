import { RootStore } from "@/store";
import { DialogStandaloneStore } from "@/store/module/DialogStandalone";
import { Icon } from '@/components/Common/Iconify/icons';
import { Button } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

interface MyCameraProps {
  onComplete?: (file: File) => void;
}

export const MyCamera = ({ onComplete }: MyCameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [photoConstraints, setPhotoConstraints] = useState({
    facingMode: { exact: "user" },
    width: { ideal: 4096 },
    height: { ideal: 3072 },
    aspectRatio: 4 / 3
  });
  const [videoConstraints, setVideoConstraints] = useState({
    facingMode: { exact: "user" },
    width: { ideal: 1280 },
    height: { ideal: 960 },
    aspectRatio: 4 / 3,
    frameRate: { ideal: 24 }
  });
  const [showBlackScreen, setShowBlackScreen] = useState(false);
  const [lastCaptureType, setLastCaptureType] = useState<'photo' | 'video' | null>(null);

  useEffect(() => {
    async function getMaxResolution() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');

        const photoConfig = {
          deviceId: cameras[0]?.deviceId,
          facingMode: { exact: facingMode },
          width: { ideal: 4096 },
          height: { ideal: 3072 },
          aspectRatio: 4 / 3
        };

        const videoConfig = {
          deviceId: cameras[0]?.deviceId,
          facingMode: { exact: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 960 },
          aspectRatio: 4 / 3,
          frameRate: { ideal: 24 }
        };

        setPhotoConstraints(photoConfig);
        setVideoConstraints(videoConfig);
      } catch (err) {
        console.error("get camera resolution error:", err);
      }
    }
    getMaxResolution();
  }, [facingMode]);

  const handleSwitchCamera = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      const tracks = webcamRef.current.stream.getTracks();
      tracks.forEach(track => track.stop());
    }

    setFacingMode(prevMode => prevMode === "user" ? "environment" : "user");
  }, []);

  // 开始录像
  const startRecording = useCallback(() => {
    setIsRecording(true);
    setRecordedChunks([]);
    const stream = webcamRef.current?.stream;
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 1500000,
        audioBitsPerSecond: 128000,
      });

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start(1000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.onstop = () => {
        if (recordedChunks.length > 0) {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm'
          });

          setShowBlackScreen(true);
          setLastCaptureType('video');
          setTimeout(() => {
            setShowBlackScreen(false);
          }, 300);
          const url = URL.createObjectURL(blob);
        }
      };

      mediaRecorderRef.current.requestData();
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, [isRecording, recordedChunks]);

  const handleMouseDown = useCallback(() => {
    const timer = setTimeout(() => {
      startRecording();
    }, 500);
    setPressTimer(timer);
  }, [startRecording]);

  const handleMouseUp = useCallback(() => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }

    if (isRecording) {
      stopRecording();
    } else {
      if (webcamRef.current) {
        const videoTrack = webcamRef.current.stream?.getVideoTracks()[0];
        if (videoTrack) {
          videoTrack.applyConstraints(photoConstraints).then(() => {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
              setShowBlackScreen(true);
              setLastCaptureType('photo');
              setTimeout(() => {
                setShowBlackScreen(false);
                videoTrack.applyConstraints(videoConstraints);
              }, 300);

              // console.log("image src:", imageSrc);
            }
          });
        }
      }
    }
  }, [pressTimer, isRecording, stopRecording, photoConstraints, videoConstraints]);

  const handleComplete = useCallback(async () => {
    if (lastCaptureType === 'photo') {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        const blob = await fetch(imageSrc).then(r => r.blob());
        const file = new File([blob], `photo_${Date.now()}.jpg`, { type: 'image/jpeg' });
        onComplete?.(file);
      }
    } else if (lastCaptureType === 'video') {
      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const file = new File([blob], `video_${Date.now()}.webm`, { type: 'video/webm' });
        onComplete?.(file);
      }
    }

    setLastCaptureType(null);
    setRecordedChunks([]);
  }, [lastCaptureType, recordedChunks, onComplete]);

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center">
      <div className="w-full h-full flex items-center justify-center bg-black">
        <Webcam
          ref={webcamRef}
          audio={true}
          muted={true}
          videoConstraints={videoConstraints}
          screenshotFormat="image/jpeg"
          className="w-full h-auto aspect-[4/3] object-cover"
        />
      </div>

      {showBlackScreen && (
        <div className="absolute inset-0 bg-black z-[1200]" />
      )}

      <Button
        isIconOnly
        className="absolute right-5 top-5 backdrop-blur-sm rounded-full"
        onPress={() => RootStore.Get(DialogStandaloneStore).close()}
      >
        <Icon icon="iconamoon:close-thin" width="24" height="24" />
      </Button>


      <div className="fixed bottom-10 left-0 right-0 flex justify-center items-center gap-5">
        {lastCaptureType && !showBlackScreen && (
          <Button isIconOnly onPress={handleComplete} radius='lg' className={`absolute right-10 group w-fit`} color='primary' >
            <Icon icon="mynaui:upload" width="24" height="24" />
          </Button>
        )}

        <button
          className={`w-20 h-20 rounded-full border-4 ${isRecording
            ? "border-red-500 bg-red-500 animate-pulse scale-110 transition-transform duration-1000"
            : "border-white bg-white"
            } flex items-center justify-center transition-colors duration-200`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <span className={`${isRecording
            ? "text-white"
            : "text-black"
            } text-sm select-none`}>
          </span>
        </button>

        <Button
          className="absolute left-10" radius="lg" isIconOnly
          onPress={handleSwitchCamera}
        >
          <Icon icon="icon-park-solid:flip-camera" width="24" height="24" />
        </Button>
      </div>
    </div>
  );
}

export const ShowCamera = ((onComplete: (file: File) => void) => {
  return RootStore.Get(DialogStandaloneStore).setData({
    size: 'full',
    isOpen: true,
    onlyContent: true,
    content: <MyCamera onComplete={(file) => {
      onComplete(file)
      RootStore.Get(DialogStandaloneStore).close();
    }} />
  })
})