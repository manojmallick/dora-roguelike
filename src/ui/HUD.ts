import { COLORS } from "../config";

export const renderTurnTimer = (
  context: CanvasRenderingContext2D,
  width: number,
  remainingSeconds: number
): void => {
  const danger = remainingSeconds < 5;

  context.fillStyle = danger ? COLORS.dangerRed : COLORS.text;
  context.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(`Your hand - ${Math.ceil(remainingSeconds)} seconds`, width / 2, 198);
};
