import { COLORS, GAME_TITLE } from "../config";

export const renderLoadingScene = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number,
  readyForTap: boolean
): void => {
  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.text;
  context.font = "700 28px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(GAME_TITLE, width / 2, height * 0.34, Math.max(260, width - 48));

  context.fillStyle = COLORS.muted;
  context.font = "16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText("The Regulator is reviewing your compliance records...", width / 2, height * 0.43, Math.max(260, width - 48));

  const barWidth = Math.min(420, width - 48);
  const barHeight = 12;
  const barX = (width - barWidth) / 2;
  const barY = height * 0.5;

  context.fillStyle = COLORS.surface;
  context.fillRect(barX, barY, barWidth, barHeight);
  context.fillStyle = COLORS.euBlue;
  context.fillRect(barX, barY, barWidth * progress, barHeight);

  context.fillStyle = readyForTap ? COLORS.text : COLORS.muted;
  context.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText(
    readyForTap ? "[ Tap anywhere to begin your audit ]" : `${Math.round(progress * 100)}% loaded`,
    width / 2,
    height * 0.6
  );
};
