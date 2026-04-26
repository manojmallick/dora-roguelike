import { describe, expect, it } from "vitest";
import { selectMusicTrack } from "../src/audio/MusicDirector";

describe("MusicDirector", () => {
  it("uses calm gameplay music when compliance is healthy", () => {
    expect(selectMusicTrack("PLAYER_TURN", 80, false)).toBe("music_gameplay_calm");
  });

  it("uses tense gameplay music below 60", () => {
    expect(selectMusicTrack("PLAYER_TURN", 55, false)).toBe("music_gameplay_tense");
  });

  it("uses boss music below 30 or during boss rounds", () => {
    expect(selectMusicTrack("PLAYER_TURN", 20, false)).toBe("music_boss");
    expect(selectMusicTrack("PLAYER_TURN", 80, true)).toBe("music_boss");
    expect(selectMusicTrack("BOSS_TURN", 80, false)).toBe("music_boss");
  });

  it("uses result-screen music", () => {
    expect(selectMusicTrack("VICTORY", 80, false)).toBe("music_victory");
    expect(selectMusicTrack("DEFEAT", 80, false)).toBe("music_defeat");
  });
});
