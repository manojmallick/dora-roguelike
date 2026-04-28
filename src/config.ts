import { parseCoopView } from "./game/CoopMode";

export const GAME_TITLE = "DORA: The Compliance Roguelike";
export const TOTAL_ROUNDS = 15;
export const CARD_TIMER_SECONDS = 15;
export const DEV_MODE = import.meta.env.DEV;
export const DEBUG_SKIP_AUDIO = import.meta.env.VITE_DEBUG_SKIP_AUDIO === "true";
export const RECORDING_MODE = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).has("recording");
export const ENABLE_QA_SHORTCUTS = DEV_MODE || RECORDING_MODE;
export type Locale = "en" | "nl";
export const GAME_LOCALE: Locale = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).get("locale") === "nl"
  ? "nl"
  : "en";
export type BossMode = "dora" | "gdpr";
export const BOSS_MODE: BossMode = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).get("boss") === "gdpr"
  ? "gdpr"
  : "dora";
export type GameDifficulty = "normal" | "hard";
export const GAME_DIFFICULTY: GameDifficulty = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).get("difficulty") === "hard"
  ? "hard"
  : "normal";
export const COOP_VIEW = parseCoopView(typeof window !== "undefined" ? window.location.search : "");

export const INDICATORS = [
  "ictrisk",
  "incidents",
  "thirdparty",
  "testing",
  "reporting"
] as const;

export const COLORS = {
  background: "#0d0d1a",
  surface: "#1a1a2e",
  euBlue: "#4a90e2",
  dangerRed: "#c0392b",
  safeGreen: "#27ae60",
  warnAmber: "#e67e22",
  text: "#ecf0f1",
  muted: "#8fa3b8"
} as const;
