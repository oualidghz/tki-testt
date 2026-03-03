import { useEffect, useRef } from "react";
import type { TestResult } from "@/lib/index";
import { conflictStyles } from "@/lib/index";
import { cn } from "@/lib/utils";

interface ResultsChartProps {
  results: TestResult;
  className?: string;
}

export function ResultsChart({ results, className }: ResultsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const labels = conflictStyles.map(style => style.name);
    const data = conflictStyles.map(style => results.percentages[style.id] || 0);
    const backgroundColors = conflictStyles.map(style => style.color);

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Set canvas size
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Chart dimensions
    const padding = { top: 20, right: 20, bottom: 60, left: 60 };
    const chartWidth = rect.width - padding.left - padding.right;
    const chartHeight = rect.height - padding.top - padding.bottom;
    const barWidth = chartWidth / labels.length;
    const maxValue = 100;

    // Draw grid lines
    ctx.strokeStyle = "hsl(var(--border))";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = "hsl(var(--muted-foreground))";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      const value = maxValue - (maxValue / 5) * i;
      ctx.fillText(`${value}%`, padding.left - 10, y);
    }

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding.left + index * barWidth + barWidth * 0.1;
      const y = padding.top + chartHeight - barHeight;
      const width = barWidth * 0.8;

      // Bar
      ctx.fillStyle = backgroundColors[index];
      ctx.beginPath();
      ctx.roundRect(x, y, width, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // X-axis labels
      ctx.fillStyle = "hsl(var(--foreground))";
      ctx.font = "500 13px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      const labelX = x + width / 2;
      const labelY = padding.top + chartHeight + 10;
      
      // Wrap long labels
      const words = labels[index].split(' ');
      let line = '';
      let lineY = labelY;
      words.forEach((word, i) => {
        const testLine = line + (line ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > barWidth * 0.8 && i > 0) {
          ctx.fillText(line, labelX, lineY);
          line = word;
          lineY += 16;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, labelX, lineY);

      // Value on top of bar
      ctx.fillStyle = "hsl(var(--foreground))";
      ctx.font = "600 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(`${value.toFixed(1)}%`, x + width / 2, y - 5);
    });
  }, [results]);

  return (
    <div className={cn("w-full h-[400px]", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
