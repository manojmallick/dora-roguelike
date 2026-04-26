import { COLORS } from "../config";

export const renderVictoryScene = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.safeGreen;
  context.font = "700 30px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("You have survived the audit.", width / 2, height * 0.42, Math.max(260, width - 48));

  context.fillStyle = COLORS.text;
  context.font = "700 22px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText("You will not be fined... this quarter.", width / 2, height * 0.52, Math.max(260, width - 48));
};
