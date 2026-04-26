export const GAME_TITLE = "DORA: The Compliance Roguelike";
export const TOTAL_ROUNDS = 15;
export const DEV_MODE = import.meta.env.DEV;
export const DEBUG_SKIP_AUDIO = import.meta.env.VITE_DEBUG_SKIP_AUDIO !== "false";

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
