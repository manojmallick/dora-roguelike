import { COLORS, GAME_TITLE } from "../config";

export const renderMenuScene = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number
): void => {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.text;
  context.font = "700 32px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(GAME_TITLE, width / 2, height * 0.36, Math.max(260, width - 48));

  context.fillStyle = COLORS.euBlue;
  context.font = "700 20px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText("Audio unlocked. Awaiting the audit.", width / 2, height * 0.48, Math.max(260, width - 48));

  context.fillStyle = COLORS.muted;
  context.font = "14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
  context.fillText("Dev keys: D dialogue, M music, S sfx", width / 2, height * 0.58, Math.max(260, width - 48));
};
