import { useEffect, useRef } from "react";
import { MicOff, User, VideoOff } from "lucide-react";

export default function VideoPlayer({ stream, muted = false, mirrored = false, label, isLocal = false }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream || null;
    }
  }, [stream]);

  const videoTracks = stream?.getVideoTracks() || [];
  const audioTracks = stream?.getAudioTracks() || [];
  const videoOff = videoTracks.length === 0 || !videoTracks[0]?.enabled;
  const audioOff = audioTracks.length === 0 || !audioTracks[0]?.enabled;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-slate-950 ${isLocal ? "rounded-2xl shadow-elevated" : ""}`}>
      {/* Video */}
      {stream && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted={muted}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
        />
      )}

      {/* No-video placeholder */}
      {(!stream || videoOff) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-gradient opacity-10 blur-2xl scale-[2.5]" />
              <div className="relative w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                {videoOff && stream ? (
                  <VideoOff size={28} className="text-slate-500" strokeWidth={1.5} />
                ) : (
                  <User size={28} className="text-slate-500" strokeWidth={1.5} />
                )}
              </div>
            </div>
            <span className="text-[12px] font-medium text-slate-500">
              {isLocal ? "Camera off" : "Waiting for video..."}
            </span>
          </div>
        </div>
      )}

      {/* Label badge */}
      {label && (
        <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5
          px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-xl
          text-white text-[11px] font-semibold tracking-wide border border-white/[0.08]">
          <span className={`w-[6px] h-[6px] rounded-full ${isLocal ? "bg-cyan-400" : "bg-emerald-400"}`} />
          {label}
          {!isLocal && audioOff && <MicOff size={11} className="ml-0.5 opacity-60" />}
        </div>
      )}
    </div>
  );
}
