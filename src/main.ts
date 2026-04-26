import { COLORS, DEV_MODE, GAME_TITLE, TOTAL_ROUNDS } from "./config";
import { GameState, type Phase } from "./game/GameState";

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Game canvas #game was not found.");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("2D canvas context is not available.");
}

const gameState = new GameState("LOADING");

let lastFrameTime = performance.now();
let devicePixelRatioCache = window.devicePixelRatio || 1;

const resizeCanvas = (): void => {
  devicePixelRatioCache = window.devicePixelRatio || 1;
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = Math.floor(width * devicePixelRatioCache);
  canvas.height = Math.floor(height * devicePixelRatioCache);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(devicePixelRatioCache, 0, 0, devicePixelRatioCache, 0, 0);
};

const drawCenteredText = (
  text: string,
  y: number,
  size: number,
  color: string = COLORS.text
): void => {
  const maxWidth = Math.max(280, window.innerWidth - 48);
  let fontSize = size;

  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `700 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;

  while (context.measureText(text).width > maxWidth && fontSize > 16) {
    fontSize -= 1;
    context.font = `700 ${fontSize}px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  }

  context.fillText(text, window.innerWidth / 2, y);
};

const render = (): void => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const phase = gameState.getPhase();

  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  context.fillStyle = COLORS.surface;
  context.fillRect(0, 0, width, 72);

  context.fillStyle = COLORS.text;
  const headerFontSize = width < 520 ? 14 : 20;
  context.font = `700 ${headerFontSize}px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`;
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.fillText(GAME_TITLE, 24, 36, Math.max(130, width - 172));

  context.textAlign = "right";
  context.fillText(`Round 0 / ${TOTAL_ROUNDS}`, width - 24, 36, 128);

  drawCenteredText("Survive the audit. Save the FinTech.", height * 0.42, width < 520 ? 22 : 28);
  drawCenteredText(`Phase: ${phase}`, height * 0.52, 22, COLORS.euBlue);

  if (DEV_MODE) {
    context.fillStyle = COLORS.muted;
    context.font = "14px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
    context.textAlign = "left";
    context.textBaseline = "bottom";
    context.fillText(
      `dev phase=${phase} elapsed=${gameState.getElapsedSeconds().toFixed(2)}s`,
      16,
      height - 16
    );
  }
};

const update = (deltaSeconds: number): void => {
  gameState.update(deltaSeconds);
};

const loop = (frameTime: number): void => {
  const deltaSeconds = (frameTime - lastFrameTime) / 1000;
  lastFrameTime = frameTime;

  update(deltaSeconds);
  render();
  requestAnimationFrame(loop);
};

window.addEventListener("resize", resizeCanvas);

if (DEV_MODE) {
  window.addEventListener("keydown", (event) => {
    const phaseKeys: Record<string, Phase> = {
      "0": "LOADING",
      "1": "TAP_TO_START",
      "2": "MENU",
      "3": "PLAYER_TURN",
      "4": "REGULATOR_TURN",
      "5": "BOSS_INTRO",
      "6": "BOSS_TURN",
      "7": "VICTORY",
      "8": "DEFEAT"
    };

    const nextPhase = phaseKeys[event.key];
    if (nextPhase) {
      gameState.setPhase(nextPhase);
    }
  });
}

resizeCanvas();
requestAnimationFrame(loop);
