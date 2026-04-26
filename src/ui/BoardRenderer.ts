import { COLORS } from "../config";
import type { IndicatorState } from "../game/ComplianceBoard";

interface BoardRenderOptions {
  x: number;
  y: number;
  width: number;
  now: number;
}

export const getIndicatorColor = (value: number): string => {
  if (value > 60) {
    return COLORS.safeGreen;
  }

  if (value >= 30) {
    return COLORS.warnAmber;
  }

  return COLORS.dangerRed;
};

export const renderComplianceBoard = (
  context: CanvasRenderingContext2D,
  indicators: IndicatorState[],
  options: BoardRenderOptions
): void => {
  const rowHeight = 34;
  const labelWidth = Math.min(118, options.width * 0.32);
  const valueWidth = 48;
  const barWidth = Math.max(80, options.width - labelWidth - valueWidth - 28);

  context.save();
  context.textBaseline = "middle";

  indicators.forEach((indicator, index) => {
    const y = options.y + index * rowHeight;
    const pulseAge = options.now - indicator.lastChangedAt;
    const pulse = pulseAge >= 0 && pulseAge < 250 ? 1 - pulseAge / 250 : 0;

    context.fillStyle = pulse > 0 ? "rgba(192, 57, 43, 0.22)" : "rgba(26, 26, 46, 0.72)";
    context.fillRect(options.x, y, options.width, rowHeight - 7);

    context.fillStyle = COLORS.text;
    context.font = "700 14px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.textAlign = "left";
    context.fillText(indicator.label, options.x + 10, y + 14, labelWidth - 12);

    const barX = options.x + labelWidth;
    const barY = y + 8;
    const barHeight = 12;

    context.fillStyle = "#273247";
    context.fillRect(barX, barY, barWidth, barHeight);
    context.fillStyle = getIndicatorColor(indicator.value);
    context.fillRect(barX, barY, barWidth * (indicator.value / 100), barHeight);

    context.fillStyle = COLORS.text;
    context.textAlign = "right";
    context.fillText(`${indicator.value}%`, options.x + options.width - 10, y + 14, valueWidth);
  });

  context.restore();
};
