import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
    mediaStream: MediaStream | null;
    isRecording: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ mediaStream, isRecording }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    // Handle Resize
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                canvas.width = width;
                canvas.height = height;
            }
        });

        resizeObserver.observe(container);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (!mediaStream || !isRecording || !canvasRef.current) return;

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioContext.createMediaStreamSource(mediaStream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 64; // Lower FFT size for fewer, wider bars
        source.connect(analyser);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            if (!isRecording) return;

            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 0.6; // Spacing
            const centerY = canvas.height / 2;
            let x = 0;

            // Gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, '#a5b4fc'); // Indigo 300
            gradient.addColorStop(0.5, '#4f46e5'); // Indigo 600
            gradient.addColorStop(1, '#a5b4fc'); // Indigo 300
            ctx.fillStyle = gradient;

            // Draw mirrored bars
            for (let i = 0; i < bufferLength; i++) {
                // Scale height
                const v = dataArray[i] / 255;
                const h = v * canvas.height * 0.8; // Max 80% height

                // Draw rounded rect
                ctx.beginPath();
                ctx.roundRect(
                    x + (canvas.width / bufferLength - barWidth) / 2, // Center in slot
                    centerY - h / 2,
                    barWidth,
                    Math.max(h, 4), // Min height 4px
                    10 // Radius
                );
                ctx.fill();

                x += canvas.width / bufferLength;
            }
        };

        draw();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            audioContext.close();
        };
    }, [mediaStream, isRecording]);

    if (!isRecording) return null;

    return (
        <div ref={containerRef} className="w-full h-full flex items-center justify-center min-h-[60px]">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
        </div>
    );
};
