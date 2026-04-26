import type { Phase } from "../game/GameState";

export type MusicTrackId =
  | "music_menu"
  | "music_gameplay_calm"
  | "music_gameplay_tense"
  | "music_boss"
  | "music_victory"
  | "music_defeat";

export const selectMusicTrack = (
  phase: Phase,
  lowestIndicatorValue: number,
  bossRound: boolean
): MusicTrackId | undefined => {
  if (phase === "MENU" || phase === "TAP_TO_START") {
    return "music_menu";
  }

  if (phase === "VICTORY") {
    return "music_victory";
  }

  if (phase === "DEFEAT") {
    return "music_defeat";
  }

  if (phase === "BOSS_TURN" || phase === "BOSS_INTRO" || bossRound || lowestIndicatorValue < 30) {
    return "music_boss";
  }

  if (phase === "PLAYER_TURN" && lowestIndicatorValue < 60) {
    return "music_gameplay_tense";
  }

  if (phase === "PLAYER_TURN") {
    return "music_gameplay_calm";
  }

  return undefined;
};
