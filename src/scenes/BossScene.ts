import { COLORS } from "../config";

export const renderBossIntroScene = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.dangerRed;
  context.font = "700 28px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("GRAND REGULATOR APPROACHING", width / 2, height * 0.44, Math.max(260, width - 48));

  context.fillStyle = COLORS.text;
  context.font = "16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText("The audit has escalated.", width / 2, height * 0.52);
};
