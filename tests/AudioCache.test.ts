import { afterEach, describe, expect, it, vi } from "vitest";
import { AudioCache } from "../src/audio/audioCache";
import type { AudioAsset } from "../src/audio/elevenlabs";

const assets: AudioAsset[] = [
  { id: "dialogue_test", type: "dialogue", src: "/audio/dialogue_test.mp3", volume: 1 },
  { id: "dialogue_second", type: "dialogue", src: "/audio/dialogue_second.mp3", volume: 1 },
  { id: "music_menu", type: "music", src: "/audio/music_menu.mp3", volume: 0.15, loop: true },
  { id: "music_boss", type: "music", src: "/audio/music_boss.mp3", volume: 0.2, loop: true },
  { id: "sfx_damage", type: "sfx", src: "/audio/sfx_damage.mp3", volume: 0.6 },
  { id: "sfx_card_play", type: "sfx", src: "/audio/sfx_card_play.mp3", volume: 0.6 }
];

class FakeAudioElement {
  static instances = new Map<string, FakeAudioElement>();

  currentTime = 0;
  loop = false;
  preload = "";
  volume = 1;
  play = vi.fn(() => Promise.resolve());
  pause = vi.fn();
  private listeners = new Map<string, () => void>();

  constructor(readonly src: string) {
    FakeAudioElement.instances.set(src, this);
  }

  addEventListener(event: string, listener: () => void): void {
    this.listeners.set(event, listener);
  }

  load(): void {
    this.listeners.get("canplaythrough")?.();
  }
}

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

const setupRealAudioCache = async (): Promise<AudioCache> => {
  FakeAudioElement.instances.clear();
  vi.stubGlobal("Audio", FakeAudioElement);
  vi.stubGlobal("window", { AudioContext: FakeAudioContext });

  const cache = new AudioCache(assets);
  await cache.load();
  await cache.unlock();

  return cache;
};

describe("AudioCache", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("reports progress while loading in skip-audio mode", async () => {
    const cache = new AudioCache(assets, { skipAudio: true });
    const progress: number[] = [];

    await cache.load((loaded, total) => {
      progress.push(loaded / total);
    });

    expect(cache.getProgress()).toBe(1);
    expect(progress).toHaveLength(assets.length);
    expect(progress.at(-1)).toBe(1);
  });

  it("will not play before browser audio is unlocked", async () => {
    const cache = new AudioCache(assets, { skipAudio: true });

    await cache.load();

    expect(cache.play("music_menu")).toBe(false);
  });

  it("plays loaded assets after audio is unlocked", async () => {
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

  it("stops previous dialogue before playing the next dialogue", async () => {
    const cache = await setupRealAudioCache();
    const first = FakeAudioElement.instances.get("/audio/dialogue_test.mp3");
    const second = FakeAudioElement.instances.get("/audio/dialogue_second.mp3");

    expect(cache.play("dialogue_test")).toBe(true);
    expect(cache.play("dialogue_second")).toBe(true);

    expect(first?.pause).toHaveBeenCalledTimes(1);
    expect(first?.currentTime).toBe(0);
    expect(second?.play).toHaveBeenCalledTimes(1);
  });

  it("stops previous sfx before playing the next sfx", async () => {
    const cache = await setupRealAudioCache();
    const first = FakeAudioElement.instances.get("/audio/sfx_card_play.mp3");
    const second = FakeAudioElement.instances.get("/audio/sfx_damage.mp3");

    expect(cache.play("sfx_card_play")).toBe(true);
    expect(cache.play("sfx_damage")).toBe(true);

    expect(first?.pause).toHaveBeenCalledTimes(1);
    expect(first?.currentTime).toBe(0);
    expect(second?.play).toHaveBeenCalledTimes(1);
  });

  it("keeps only one direct music track active at a time", async () => {
    const cache = await setupRealAudioCache();
    const first = FakeAudioElement.instances.get("/audio/music_menu.mp3");
    const second = FakeAudioElement.instances.get("/audio/music_boss.mp3");

    expect(cache.play("music_menu")).toBe(true);
    expect(cache.play("music_boss")).toBe(true);

    expect(first?.pause).toHaveBeenCalledTimes(1);
    expect(first?.currentTime).toBe(0);
    expect(second?.play).toHaveBeenCalledTimes(1);
  });
});
