import { COLORS } from "../config";

export const renderDefeatScene = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.dangerRed;
  context.font = "700 38px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("EUR 10,000,000", width / 2, height * 0.42, Math.max(260, width - 48));

  context.fillStyle = COLORS.text;
  context.font = "700 22px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText("The fine has been calculated.", width / 2, height * 0.52, Math.max(260, width - 48));
};
