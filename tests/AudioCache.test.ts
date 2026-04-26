import { afterEach, describe, expect, it, vi } from "vitest";
import { AudioCache } from "../src/audio/audioCache";
import type { AudioAsset } from "../src/audio/elevenlabs";

const assets: AudioAsset[] = [
  { id: "dialogue_test", type: "dialogue", src: "/audio/dialogue_test.mp3", volume: 1 },
  { id: "music_menu", type: "music", src: "/audio/music_menu.mp3", volume: 0.15, loop: true },
  { id: "sfx_card_play", type: "sfx", src: "/audio/sfx_card_play.mp3", volume: 0.6 }
];

describe("AudioCache", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("reports progress while loading in skip-audio mode", async () => {
    const cache = new AudioCache(assets, { skipAudio: true });
    const progress: number[] = [];

    await cache.load((loaded, total) => {
      progress.push(loaded / total);
    });

    expect(cache.getProgress()).toBe(1);
    expect(progress).toEqual([1 / 3, 2 / 3, 1]);
  });

  it("will not play before browser audio is unlocked", async () => {
    const cache = new AudioCache(assets, { skipAudio: true });

    await cache.load();

    expect(cache.play("music_menu")).toBe(false);
  });

  it("plays loaded assets after audio is unlocked", async () => {
    class FakeAudioContext {
      destination = {};

      async resume(): Promise<void> {
        return Promise.resolve();
      }

      createBuffer(): AudioBuffer {
        return {} as AudioBuffer;
      }

      createBufferSource(): AudioBufferSourceNode {
        return {
          buffer: null,
          connect: vi.fn(),
          start: vi.fn()
        } as unknown as AudioBufferSourceNode;
      }
    }

    vi.stubGlobal("window", { AudioContext: FakeAudioContext });
    const cache = new AudioCache(assets, { skipAudio: true });

    await cache.load();
    await cache.unlock();

    expect(cache.isUnlocked()).toBe(true);
    expect(cache.play("music_menu")).toBe(true);
  });

  it("treats an empty manifest as fully loaded", async () => {
    const cache = new AudioCache([], { skipAudio: true });

    await cache.load();

    expect(cache.getProgress()).toBe(1);
  });
});
