import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  CameraOff,
  RefreshCw,
  Download,
  Sparkles,
  ShieldCheck,
  Check,
  RotateCcw,
  Sliders,
  Crown,
  Eye,
  Info,
} from 'lucide-react';
import { COLOR_SWATCHES } from '../data/mockData';

interface CameraBraidAROverlayProps {
  selectedLengthInches: number;
  selectedLengthName: string;
  selectedColorCode: string;
  selectedColorName: string;
  selectedStyleName: string;
  hasBohoCurls?: boolean;
  hasFrenchEnds?: boolean;
  isSpeedSquad?: boolean;
  onCloseAR: () => void;
  onLockInLook: () => void;
}

export const CameraBraidAROverlay: React.FC<CameraBraidAROverlayProps> = ({
  selectedLengthInches,
  selectedLengthName,
  selectedColorCode,
  selectedColorName,
  selectedStyleName,
  hasBohoCurls = false,
  hasFrenchEnds = false,
  onCloseAR,
  onLockInLook,
}) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [capturedPhotoUrl, setCapturedPhotoUrl] = useState<string | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(0.92);
  const [hairScale, setHairScale] = useState<number>(1.0); // allows adjusting overlay fit
  const [verticalOffset, setVerticalOffset] = useState<number>(0); // vertical alignment slider

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stop camera tracks cleanly
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  }, []);

  // Start camera
  const startCamera = useCallback(async () => {
    stopCamera();
    setCameraError(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Camera permission denied. Please allow camera access in your browser settings to try on braids in real-time.'
          : 'Unable to access camera on this device. You can still test AR styles with our interactive virtual mirror simulation!'
      );
      setIsCameraActive(false);
    }
  }, [facingMode, stopCamera]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  const toggleCameraFacing = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  // Color mapping for real-time SVG AR shader
  const getColorGradient = (code: string) => {
    switch (code) {
      case '#1':
        return { start: '#0a0a0a', mid: '#141414', end: '#050505', highlight: '#262626' };
      case '#1B':
        return { start: '#1c1917', mid: '#292524', end: '#141211', highlight: '#44403c' };
      case '#27':
        return { start: '#b45309', mid: '#d97706', end: '#92400e', highlight: '#f59e0b' };
      case '#30':
        return { start: '#7c2d12', mid: '#9a3412', end: '#431407', highlight: '#c2410c' };
      case '#613':
        return { start: '#eab308', mid: '#fde047', end: '#ca8a04', highlight: '#fef9c3' };
      case '#99J':
        return { start: '#701a75', mid: '#831843', end: '#4a044e', highlight: '#be185d' };
      case '1B/30':
        return { start: '#1c1917', mid: '#7c2d12', end: '#9a3412', highlight: '#c2410c' };
      case '1B/27':
        return { start: '#1c1917', mid: '#92400e', end: '#d97706', highlight: '#f59e0b' };
      case 'SKUNK':
        return { start: '#1c1917', mid: '#fde047', end: '#1c1917', highlight: '#fef08a' };
      default:
        return { start: '#1c1917', mid: '#292524', end: '#141211', highlight: '#44403c' };
    }
  };

  const palette = getColorGradient(selectedColorCode);

  // Calculate pixel length based on selected inches (16" to 48")
  // 16" = shoulder (~280px), 24" = mid-back (~360px), 30" = waist (~450px), 36" = butt (~530px), 48" = knee (~640px)
  const getBraidPixelLength = (inches: number) => {
    if (inches <= 16) return 290;
    if (inches <= 24) return 380;
    if (inches <= 30) return 470;
    if (inches <= 36) return 550;
    return 650;
  };

  const braidPixelHeight = getBraidPixelLength(selectedLengthInches);

  // Take snapshot of live camera + AR overlay
  const handleCaptureSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Draw video flipped horizontally for mirror mode
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Draw decorative Princess AHB watermark stamp
    ctx.fillStyle = 'rgba(142, 39, 62, 0.85)';
    ctx.fillRect(20, canvas.height - 60, 280, 42);
    ctx.font = 'bold 14px serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('👑 Princess AHB Virtual Mirror', 32, canvas.height - 40);
    ctx.font = '10px sans-serif';
    ctx.fillStyle = '#fcd34d';
    ctx.fillText(`${selectedStyleName} · ${selectedLengthInches}" · ${selectedColorName}`, 32, canvas.height - 24);

    const dataUrl = canvas.toDataURL('image/png');
    setCapturedPhotoUrl(dataUrl);
  };

  const handleDownloadSnapshot = () => {
    if (!capturedPhotoUrl) return;
    const link = document.createElement('a');
    link.download = `PrincessAHB_VirtualTryOn_${selectedColorCode.replace('#', '')}_${selectedLengthInches}in.png`;
    link.href = capturedPhotoUrl;
    link.click();
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border-2 border-[#edd8d5] bg-[#14080a] shadow-2xl flex flex-col">
      {/* Top AR Control Header Bar */}
      <div className="p-3 bg-gradient-to-r from-[#1a0b0e] via-[#2d1219] to-[#14080a] border-b border-white/10 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          <span className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-[#fcd34d]" />
            <span>Live AR Braid Mirror</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8e273e] text-white border border-white/20">
            {selectedLengthInches}" {selectedColorCode}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {isCameraActive && (
            <button
              onClick={toggleCameraFacing}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 transition-colors cursor-pointer"
              title="Flip Camera (Front/Back)"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onCloseAR}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 text-xs font-semibold transition-colors cursor-pointer"
          >
            Studio View
          </button>
        </div>
      </div>

      {/* Main AR Video Viewport Stage */}
      <div className="relative h-[460px] sm:h-[530px] w-full overflow-hidden bg-black flex items-center justify-center select-none">
        {/* Hidden Canvas for High-Res Photo Snapping */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Live Camera Video Stream */}
        {isCameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        ) : (
          /* Fallback when camera permission denied or loading */
          <div className="relative w-full h-full overflow-hidden">
            <img
              src="/src/assets/images/boho_knotless_luxury_1791272062825.jpg"
              alt="Simulated AR Mirror"
              className="w-full h-full object-cover opacity-60"
            />
            {cameraError ? (
              <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-black/70 backdrop-blur-xs text-white space-y-3">
                <CameraOff className="w-10 h-10 text-amber-400" />
                <h4 className="font-serif font-bold text-base text-white">Camera Preview Unavailable</h4>
                <p className="text-xs text-stone-300 max-w-xs leading-relaxed">{cameraError}</p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-[#8e273e] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#a02f48] transition-colors cursor-pointer"
                >
                  Retry Camera Access
                </button>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-2">
                <span className="w-8 h-8 rounded-full border-2 border-white/20 border-t-[#fcd34d] animate-spin" />
                <p className="text-xs text-stone-300">Activating your AR selfie mirror...</p>
              </div>
            )}
          </div>
        )}

        {/* REAL-TIME AR BRAID STRANDS OVERLAY (SVG Shaders + Geometric Parting) */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center transition-all duration-300"
          style={{
            opacity: overlayOpacity,
            transform: `translateY(${verticalOffset}px) scale(${hairScale})`,
          }}
        >
          <svg
            viewBox="0 0 500 700"
            className="w-full h-full max-w-[500px] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Dynamic Linear Gradient mapped to active color swatch */}
              <linearGradient id="arBraidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={palette.start} />
                <stop offset="45%" stopColor={palette.mid} />
                <stop offset="75%" stopColor={palette.highlight} />
                <stop offset="100%" stopColor={palette.end} />
              </linearGradient>

              {/* Braid Strand Texture Pattern */}
              <pattern id="braidTexture" width="12" height="18" patternUnits="userSpaceOnUse">
                <path
                  d="M0 0 L6 9 L12 0 M0 9 L6 18 L12 9"
                  stroke={palette.highlight}
                  strokeWidth="1.2"
                  opacity="0.35"
                />
              </pattern>

              {/* Gold Filigree Cuff Shimmer */}
              <linearGradient id="goldCuff" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>

              {/* Soft Drop Shadow for 3D realism */}
              <filter id="strandShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Subtle Face Alignment Reticle to guide the user into frame */}
            <ellipse
              cx="250"
              cy="230"
              rx="95"
              ry="125"
              stroke="#fcd34d"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              opacity="0.35"
            />
            <text x="250" y="90" textAnchor="middle" fill="#ffffff" opacity="0.6" fontSize="10" fontWeight="bold" letterSpacing="1">
              ALIGN FACE INSIDE CROWN GUIDE
            </text>

            {/* TOP CROWN PARTING & ROOTS (Zero-Tension Parting Grid Overlay) */}
            <g filter="url(#strandShadow)">
              {/* Crown parting arch */}
              <path
                d="M 155 170 Q 250 115 345 170 Q 250 145 155 170 Z"
                fill="url(#arBraidGradient)"
                opacity="0.95"
              />
              <path
                d="M 155 170 Q 250 115 345 170"
                stroke={palette.highlight}
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Geometric Parting Lines across hairline */}
              <line x1="250" y1="125" x2="250" y2="175" stroke="#fcd34d" strokeWidth="1" opacity="0.4" />
              <line x1="210" y1="135" x2="205" y2="185" stroke="#fcd34d" strokeWidth="1" opacity="0.3" />
              <line x1="290" y1="135" x2="295" y2="185" stroke="#fcd34d" strokeWidth="1" opacity="0.3" />
            </g>

            {/* LEFT SIDE BRAID STRANDS (Cascading down past shoulder/torso based on length) */}
            <g filter="url(#strandShadow)">
              {/* Outer Left Major Strand */}
              <path
                d={`M 150 175 C 130 240, 115 320, 125 ${braidPixelHeight} C 127 ${braidPixelHeight + 15}, 135 ${braidPixelHeight + 15}, 133 ${braidPixelHeight} C 122 320, 140 240, 158 175 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Mid Left Strand */}
              <path
                d={`M 165 178 C 145 250, 138 330, 145 ${braidPixelHeight - 20} C 147 ${braidPixelHeight - 5}, 155 ${braidPixelHeight - 5}, 153 ${braidPixelHeight - 20} C 146 330, 153 250, 173 178 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Inner Left Collar Strand */}
              <path
                d={`M 180 182 C 165 260, 160 340, 168 ${braidPixelHeight - 35} C 170 ${braidPixelHeight - 20}, 178 ${braidPixelHeight - 20}, 176 ${braidPixelHeight - 35} C 168 340, 173 260, 188 182 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Front Frame Left Strand */}
              <path
                d={`M 195 185 C 185 270, 180 350, 188 ${braidPixelHeight - 45} C 190 ${braidPixelHeight - 30}, 198 ${braidPixelHeight - 30}, 196 ${braidPixelHeight - 45} C 188 350, 193 270, 203 185 Z`}
                fill="url(#arBraidGradient)"
              />
            </g>

            {/* RIGHT SIDE BRAID STRANDS */}
            <g filter="url(#strandShadow)">
              {/* Outer Right Major Strand */}
              <path
                d={`M 350 175 C 370 240, 385 320, 375 ${braidPixelHeight} C 373 ${braidPixelHeight + 15}, 365 ${braidPixelHeight + 15}, 367 ${braidPixelHeight} C 378 320, 360 240, 342 175 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Mid Right Strand */}
              <path
                d={`M 335 178 C 355 250, 362 330, 355 ${braidPixelHeight - 20} C 353 ${braidPixelHeight - 5}, 345 ${braidPixelHeight - 5}, 347 ${braidPixelHeight - 20} C 354 330, 347 250, 327 178 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Inner Right Collar Strand */}
              <path
                d={`M 320 182 C 335 260, 340 340, 332 ${braidPixelHeight - 35} C 330 ${braidPixelHeight - 20}, 322 ${braidPixelHeight - 20}, 324 ${braidPixelHeight - 35} C 332 340, 327 260, 312 182 Z`}
                fill="url(#arBraidGradient)"
              />
              {/* Front Frame Right Strand */}
              <path
                d={`M 305 185 C 315 270, 320 350, 312 ${braidPixelHeight - 45} C 310 ${braidPixelHeight - 30}, 302 ${braidPixelHeight - 30}, 304 ${braidPixelHeight - 45} C 312 350, 307 270, 297 185 Z`}
                fill="url(#arBraidGradient)"
              />
            </g>

            {/* BOHO CURLS UPGRADE (Delicate wavy tendrils if selected) */}
            {(hasBohoCurls || selectedStyleName.toLowerCase().includes('boho') || selectedStyleName.toLowerCase().includes('goddess')) && (
              <g stroke={palette.highlight} strokeWidth="1.8" fill="none" opacity="0.85">
                {/* Wavy human curl left */}
                <path d={`M 120 220 Q 95 260 115 300 Q 85 340 110 380 Q 90 420 105 ${braidPixelHeight - 40}`} />
                <path d={`M 140 240 Q 115 280 135 320 Q 110 360 130 400 Q 115 440 125 ${braidPixelHeight - 20}`} />
                {/* Wavy human curl right */}
                <path d={`M 380 220 Q 405 260 385 300 Q 415 340 390 380 Q 410 420 395 ${braidPixelHeight - 40}`} />
                <path d={`M 360 240 Q 385 280 365 320 Q 390 360 370 400 Q 385 440 375 ${braidPixelHeight - 20}`} />
              </g>
            )}

            {/* FRENCH CURL SPIRAL ENDS (Bouncy curled rollers at the bottom if selected) */}
            {(hasFrenchEnds || selectedStyleName.toLowerCase().includes('french')) && (
              <g fill="none" stroke={palette.highlight} strokeWidth="2.5" opacity="0.95">
                <path d={`M 125 ${braidPixelHeight} C 110 ${braidPixelHeight + 25}, 145 ${braidPixelHeight + 40}, 130 ${braidPixelHeight + 60}`} />
                <path d={`M 145 ${braidPixelHeight - 20} C 130 ${braidPixelHeight + 5}, 165 ${braidPixelHeight + 20}, 150 ${braidPixelHeight + 40}`} />
                <path d={`M 375 ${braidPixelHeight} C 390 ${braidPixelHeight + 25}, 355 ${braidPixelHeight + 40}, 370 ${braidPixelHeight + 60}`} />
                <path d={`M 355 ${braidPixelHeight - 20} C 370 ${braidPixelHeight + 5}, 335 ${braidPixelHeight + 20}, 350 ${braidPixelHeight + 40}`} />
              </g>
            )}

            {/* GOLD FILIGREE CUFF ACCESSORIES */}
            <g fill="url(#goldCuff)">
              <rect x="122" y="270" width="10" height="7" rx="1.5" />
              <rect x="142" y="320" width="10" height="7" rx="1.5" />
              <rect x="368" y="270" width="10" height="7" rx="1.5" />
              <rect x="348" y="320" width="10" height="7" rx="1.5" />
            </g>

            {/* DYNAMIC REAL-TIME LENGTH MARKER GUIDE LINE */}
            <line
              x1="60"
              y1={braidPixelHeight}
              x2="440"
              y2={braidPixelHeight}
              stroke="#fcd34d"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.75"
            />
            <rect
              x="175"
              y={braidPixelHeight - 12}
              width="150"
              height="20"
              rx="10"
              fill="rgba(142, 39, 62, 0.9)"
              stroke="#fcd34d"
              strokeWidth="1"
            />
            <text
              x="250"
              y={braidPixelHeight + 2}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="bold"
              letterSpacing="0.5"
            >
              {selectedLengthInches}" FALLS HERE ({selectedLengthName.split(' ')[0]})
            </text>
          </svg>
        </div>

        {/* Floating Snapshot Trigger Button */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-30">
          <button
            onClick={handleCaptureSnapshot}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg active:scale-95 transition-all"
          >
            <Camera className="w-3.5 h-3.5 text-[#fcd34d]" />
            <span>Snap Try-On Photo</span>
          </button>

          <button
            onClick={onLockInLook}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#fcd34d] via-[#f59e0b] to-[#d97706] text-stone-900 text-xs font-serif font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-[#8e273e]" />
            <span>Lock In Look</span>
          </button>
        </div>

        {/* Top Floating Mirror Tip */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-stone-200 text-[10px] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#fcd34d]" />
            <span>Click any color or length to see AR update live!</span>
          </span>
        </div>
      </div>

      {/* Real-time AR Fit & Alignment Sliders Bar */}
      <div className="p-3 bg-[#1a0b0e] border-t border-white/10 text-stone-300 text-xs space-y-2">
        <div className="grid grid-cols-2 gap-3 items-center">
          {/* Hair Scale */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold shrink-0">Width:</span>
            <input
              type="range"
              min="0.8"
              max="1.3"
              step="0.05"
              value={hairScale}
              onChange={(e) => setHairScale(parseFloat(e.target.value))}
              className="w-full accent-[#8e273e] cursor-pointer"
              title="Adjust hair width to fit your shoulders"
            />
          </div>

          {/* Vertical Offset */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-400 uppercase font-semibold shrink-0">Height:</span>
            <input
              type="range"
              min="-80"
              max="80"
              step="5"
              value={verticalOffset}
              onChange={(e) => setVerticalOffset(parseInt(e.target.value, 10))}
              className="w-full accent-[#8e273e] cursor-pointer"
              title="Move crown up or down to align with forehead"
            />
          </div>
        </div>
      </div>

      {/* Snapshot Preview Modal */}
      {capturedPhotoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#ffffff] text-[#221417] rounded-3xl p-5 sm:p-7 max-w-sm w-full border border-[#edd8d5] shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#8e273e]" />
                <h4 className="font-serif font-bold text-sm text-[#221417]">Your AR Braid Try-On</h4>
              </div>
              <button
                onClick={() => setCapturedPhotoUrl(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#edd8d5] shadow-md bg-stone-900">
              <img src={capturedPhotoUrl} alt="Captured AR Try-On" className="w-full h-auto object-cover" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#543b3f]">
                <span>{selectedStyleName}</span>
                <span className="text-[#8e273e] font-bold">{selectedLengthInches}" · {selectedColorName}</span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleDownloadSnapshot}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#faebea] hover:bg-[#f5d5db] text-[#8e273e] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Save Photo</span>
                </button>

                <button
                  onClick={() => {
                    setCapturedPhotoUrl(null);
                    onLockInLook();
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#8e273e] hover:bg-[#781e32] text-white text-xs font-serif font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Crown className="w-3.5 h-3.5 text-[#fcd34d]" />
                  <span>Book This Look</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
