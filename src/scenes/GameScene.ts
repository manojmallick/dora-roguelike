import { COLORS, TOTAL_ROUNDS } from "../config";
import type { Attack } from "../game/RegulatorAI";

export const renderGameScene = (
  context: CanvasRenderingContext2D,
  width: number,
  attack: Attack,
  attackText: string,
  reaction: string
): void => {
  context.fillStyle = COLORS.surface;
  context.fillRect(0, 0, width, 72);

  context.fillStyle = COLORS.text;
  context.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText("DORA: The Compliance Roguelike", 24, 36, Math.max(140, width - 180));

  context.textAlign = "right";
  context.fillText(`Round ${attack.round} / ${TOTAL_ROUNDS}`, width - 24, 36, 140);

  context.textAlign = "center";
  context.fillStyle = attack.voice === "grand" ? COLORS.dangerRed : COLORS.euBlue;
  context.font = "700 16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText(attack.voice === "grand" ? "GRAND REGULATOR" : "REGULATOR", width / 2, 104);

  context.fillStyle = COLORS.text;
  context.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  context.fillText(attackText, width / 2, 140, Math.max(260, width - 48));

  if (reaction) {
    context.fillStyle = COLORS.muted;
    context.font = "16px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.fillText(reaction, width / 2, 174, Math.max(260, width - 48));
  }
};
