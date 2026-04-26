import { AudioCache } from "./audio/audioCache";
import { getAudioManifest } from "./audio/elevenlabs";
import { COLORS, DEBUG_SKIP_AUDIO, DEV_MODE, GAME_TITLE, INDICATORS, TOTAL_ROUNDS } from "./config";
import { CardDeck } from "./game/CardDeck";
import { ComplianceBoard, type Indicator } from "./game/ComplianceBoard";
import { GameState, type Phase } from "./game/GameState";
import { RegulatorAI, type Attack } from "./game/RegulatorAI";
import { renderBossIntroScene } from "./scenes/BossScene";
import { renderGameScene } from "./scenes/GameScene";
import { renderLoadingScene } from "./scenes/LoadingScene";
import { renderMenuScene } from "./scenes/MenuScene";
import { renderComplianceBoard } from "./ui/BoardRenderer";
import { getCardAt, renderCards, type CardHitBox } from "./ui/CardRenderer";

const canvas = document.querySelector<HTMLCanvasElement>("#game");

if (!canvas) {
  throw new Error("Game canvas #game was not found.");
}

const context = canvas.getContext("2d");

if (!context) {
  throw new Error("2D canvas context is not available.");
}

const gameState = new GameState("LOADING");
const audioCache = new AudioCache(getAudioManifest(), { skipAudio: DEBUG_SKIP_AUDIO });
const complianceBoard = new ComplianceBoard();
const cardDeck = new CardDeck();
const regulatorAI = new RegulatorAI();
cardDeck.draw(5);

let lastFrameTime = performance.now();
let devicePixelRatioCache = window.devicePixelRatio || 1;
let pointer = { x: -1, y: -1 };
let cardHitBoxes: CardHitBox[] = [];
let currentRound = 0;
let currentAttack: Attack | undefined;
let currentReaction = "";

const startRound = (round: number): void => {
  currentRound = round;
  currentAttack = regulatorAI.getAttack(round);
  currentReaction = "";
  gameState.setPhase(regulatorAI.isBossRound(round) ? "BOSS_TURN" : "PLAYER_TURN");
};

const advanceRound = (): void => {
  if (complianceBoard.isFailed()) {
    gameState.setPhase("DEFEAT");
    return;
  }

  if (currentRound >= regulatorAI.getTotalRounds()) {
    gameState.setPhase("VICTORY");
    return;
  }

  startRound(currentRound + 1);
};

const restoreTargets = (target: Indicator | "all" | "incidents-testing" | "none", amount: number): void => {
  if (target === "none") {
    return;
  }

  if (target === "all") {
    complianceBoard.restore(complianceBoard.getLowest().id, amount);
    return;
  }

  if (target === "incidents-testing") {
    complianceBoard.restore("incidents", amount);
    complianceBoard.restore("testing", amount);
    return;
  }

  complianceBoard.restore(target, amount);
};

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

  if (phase === "LOADING" || phase === "TAP_TO_START") {
    renderLoadingScene(context, width, height, gameState.getLoadingProgress(), phase === "TAP_TO_START");
    return;
  }

  if (phase === "MENU") {
    renderMenuScene(context, width, height);
    renderComplianceBoard(context, complianceBoard.getAll(), {
      x: Math.max(16, width * 0.08),
      y: height * 0.56,
      width: Math.min(560, width - 32),
      now: performance.now()
    });
    cardHitBoxes = renderCards(context, cardDeck.getHand(), {
      x: 16,
      y: Math.max(height - 156, height * 0.76),
      width: width - 32,
      height: 136,
      pointer
    });
    return;
  }

  if (phase === "BOSS_INTRO") {
    renderBossIntroScene(context, width, height);
    return;
  }

  context.fillStyle = COLORS.background;
  context.fillRect(0, 0, width, height);

  if ((phase === "PLAYER_TURN" || phase === "BOSS_TURN") && currentAttack) {
    renderGameScene(context, width, currentAttack, currentReaction);
    renderComplianceBoard(context, complianceBoard.getAll(), {
      x: Math.max(16, width * 0.08),
      y: 210,
      width: Math.min(560, width - 32),
      now: performance.now()
    });
    cardHitBoxes = renderCards(context, cardDeck.getHand(), {
      x: 16,
      y: Math.max(height - 156, height * 0.76),
      width: width - 32,
      height: 136,
      pointer
    });
    return;
  }

  if (phase === "VICTORY" || phase === "DEFEAT") {
    drawCenteredText(
      phase === "VICTORY"
        ? "You have survived the audit. You will not be fined... this quarter."
        : "EUR 10,000,000. The fine has been calculated.",
      height * 0.48,
      width < 520 ? 20 : 28,
      phase === "VICTORY" ? COLORS.safeGreen : COLORS.dangerRed
    );
    return;
  }

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
canvas.addEventListener("pointermove", (event) => {
  const rect = canvas.getBoundingClientRect();
  pointer = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
});

canvas.addEventListener("click", () => {
  if (gameState.getPhase() !== "TAP_TO_START") {
    return;
  }

  void audioCache.unlock().then(() => {
    gameState.setPhase("MENU");
    audioCache.play("music_menu");
  });
});

canvas.addEventListener("pointerdown", (event) => {
  if (gameState.getPhase() === "MENU") {
    startRound(1);
    return;
  }

  if (gameState.getPhase() !== "PLAYER_TURN" && gameState.getPhase() !== "BOSS_TURN") {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const cardId = getCardAt(cardHitBoxes, event.clientX - rect.left, event.clientY - rect.top);

  if (!cardId || !currentAttack) {
    return;
  }

  const played = cardDeck.play(cardId);
  if (!played) {
    return;
  }

  audioCache.play("sfx_card_play");

  const blocked = cardDeck.doesCardCounter(played, currentAttack);
  if (blocked && played.effect.kind === "restore") {
    restoreTargets(played.target, played.effect.amount ?? 0);
  }

  if (!blocked) {
    complianceBoard.damageMany(currentAttack.targets.map((indicator) => ({
      indicator,
      amount: currentAttack?.damage ?? 0
    })));
  }

  currentReaction = regulatorAI.getReaction(blocked);
  advanceRound();
});

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

    if (event.key.toLowerCase() === "d") {
      audioCache.play("dialogue_test");
    }

    if (event.key.toLowerCase() === "m") {
      audioCache.play("music_menu");
    }

    if (event.key.toLowerCase() === "s") {
      audioCache.play("sfx_card_play");
    }

    const damageKeyIndex = ["q", "w", "e", "r", "t"].indexOf(event.key.toLowerCase());
    if (damageKeyIndex >= 0) {
      complianceBoard.damage(INDICATORS[damageKeyIndex], 25);
    }

    if (event.key.toLowerCase() === "a") {
      const lowest = complianceBoard.getLowest();
      complianceBoard.restore(lowest.id, 20);
    }

    if (complianceBoard.isFailed()) {
      gameState.setPhase("DEFEAT");
    }
  });
}

resizeCanvas();
void audioCache.load((loaded, total) => {
  gameState.setLoadingProgress(loaded / total);

  if (loaded === total) {
    gameState.setPhase("TAP_TO_START");
  }
});
requestAnimationFrame(loop);
