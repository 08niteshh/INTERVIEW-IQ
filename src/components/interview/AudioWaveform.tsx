import React, { useEffect, useRef } from 'react';

interface AudioWaveformProps {
  isRecording: boolean;
  frequencyData: Uint8Array | null;
  audioVolume: number;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  isRecording,
  frequencyData,
  audioVolume,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barCount = 32;
      const barWidth = 3;
      const spacing = 4;
      const totalWidth = (barWidth + spacing) * barCount;
      const startX = (canvas.width - totalWidth) / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < barCount; i++) {
        let height = 4;

        if (isRecording) {
          if (frequencyData && frequencyData.length > 0) {
            const freqIndex = Math.floor((i / barCount) * (frequencyData.length / 2));
            const val = frequencyData[freqIndex] || 0;
            height = Math.max(4, (val / 255) * (canvas.height - 8));
          } else {
            // Simulated micro bounce while recording
            const t = Date.now() / 150;
            height = Math.max(4, (Math.sin(t + i * 0.4) * 0.5 + 0.5) * (canvas.height * 0.6));
          }
        }

        const x = startX + i * (barWidth + spacing);
        const y = centerY - height / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + height);
        gradient.addColorStop(0, '#38bdf8');
        gradient.addColorStop(0.5, '#06b6d4');
        gradient.addColorStop(1, '#818cf8');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, height, [2]);
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isRecording, frequencyData, audioVolume]);

  return (
    <div className="flex items-center justify-center p-2 rounded-2xl bg-slate-950/60 border border-white/5 backdrop-blur-md">
      <canvas
        ref={canvasRef}
        width={240}
        height={36}
        className="w-full max-w-[240px] h-[36px]"
      />
    </div>
  );
};
