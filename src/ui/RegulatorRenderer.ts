import { COLORS } from "../config";
import type { RegulatorVoice } from "../game/RegulatorAI";

export const getRegulatorAccent = (voice: RegulatorVoice): string => (
  voice === "grand" ? COLORS.dangerRed : COLORS.euBlue
);

export const renderRegulator = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  voice: RegulatorVoice,
  speaking: boolean,
  now: number
): void => {
  const accent = getRegulatorAccent(voice);
  const sway = speaking ? Math.sin(now / 240) * 0.04 : 0;

  context.save();
  context.translate(x, y);
  context.rotate(sway);

  context.fillStyle = "#101827";
  context.strokeStyle = accent;
  context.lineWidth = 2;

  context.beginPath();
  context.arc(0, -44, 22, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.fillRect(-28, -20, 56, 74);
  context.strokeRect(-28, -20, 56, 74);

  context.fillStyle = accent;
  context.beginPath();
  context.moveTo(0, -10);
  context.lineTo(8, 18);
  context.lineTo(0, 30);
  context.lineTo(-8, 18);
  context.closePath();
  context.fill();

  context.fillStyle = "#29384d";
  context.fillRect(28, 18, 34, 28);
  context.strokeRect(28, 18, 34, 28);

  context.fillStyle = accent;
  context.beginPath();
  context.arc(18, -4, 4, 0, Math.PI * 2);
  context.fill();

  context.restore();

  renderWaveform(context, x, y + 76, accent, speaking, now);
};

const renderWaveform = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string,
  speaking: boolean,
  now: number
): void => {
  context.save();
  context.fillStyle = color;

  for (let index = 0; index < 9; index += 1) {
    const phase = now / 120 + index * 0.8;
    const height = speaking ? 8 + Math.abs(Math.sin(phase)) * 24 : 8;
    context.fillRect(x - 45 + index * 11, y - height / 2, 5, height);
  }

  context.restore();
};
