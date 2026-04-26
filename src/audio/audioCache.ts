import type { AudioAsset } from "./elevenlabs";

type ProgressHandler = (loaded: number, total: number) => void;

interface AudioCacheOptions {
  skipAudio?: boolean;
}

type BrowserWindowWithWebkitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export class AudioCache {
  private readonly assets: AudioAsset[];
  private readonly skipAudio: boolean;
  private readonly elements = new Map<string, HTMLAudioElement>();
  private readonly loadedIds = new Set<string>();
  private unlocked = false;
  private audioContext?: AudioContext;

  constructor(assets: AudioAsset[], options: AudioCacheOptions = {}) {
    this.assets = assets;
    this.skipAudio = options.skipAudio ?? false;
  }

  async load(onProgress?: ProgressHandler): Promise<void> {
    const total = this.assets.length;

    if (total === 0) {
      onProgress?.(1, 1);
      return;
    }

    let loaded = 0;
    const markLoaded = (id: string): void => {
      this.loadedIds.add(id);
      loaded += 1;
      onProgress?.(loaded, total);
    };

    for (const asset of this.assets) {
      if (this.skipAudio) {
        markLoaded(asset.id);
        continue;
      }

      await this.loadElement(asset);
      markLoaded(asset.id);
    }
  }

  async unlock(): Promise<void> {
    if (this.unlocked) {
      return;
    }

    const audioWindow = window as BrowserWindowWithWebkitAudio;
    const AudioContextConstructor = window.AudioContext ?? audioWindow.webkitAudioContext;

    if (AudioContextConstructor) {
      this.audioContext = new AudioContextConstructor();
      await this.audioContext.resume();

      const buffer = this.audioContext.createBuffer(1, 1, 22050);
      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    }

    this.unlocked = true;
  }

  isUnlocked(): boolean {
    return this.unlocked;
  }

  getProgress(): number {
    if (this.assets.length === 0) {
      return 1;
    }

    return this.loadedIds.size / this.assets.length;
  }

  play(id: string): boolean {
    if (!this.unlocked || !this.loadedIds.has(id)) {
      return false;
    }

    if (this.skipAudio) {
      return true;
    }

    const element = this.elements.get(id);
    if (!element) {
      return false;
    }

    element.currentTime = 0;
    void element.play();
    return true;
  }

  stop(id: string): void {
    const element = this.elements.get(id);

    if (!element) {
      return;
    }

    element.pause();
    element.currentTime = 0;
  }

  crossfade(fromId: string, toId: string, durationMs: number): boolean {
    const from = this.elements.get(fromId);
    const to = this.elements.get(toId);

    if (this.skipAudio) {
      return this.play(toId);
    }

    if (!from || !to || !this.unlocked) {
      return false;
    }

    const targetVolume = to.volume;
    const startedAt = performance.now();
    to.volume = 0;
    void to.play();

    const step = (now: number): void => {
      const progress = Math.min(1, (now - startedAt) / Math.max(1, durationMs));
      from.volume = from.volume * (1 - progress);
      to.volume = targetVolume * progress;

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      from.pause();
      from.currentTime = 0;
    };

    requestAnimationFrame(step);
    return true;
  }

  private loadElement(asset: AudioAsset): Promise<void> {
    return new Promise((resolve, reject) => {
      const element = new Audio(asset.src);
      element.preload = "auto";
      element.volume = asset.volume;
      element.loop = asset.loop ?? false;

      element.addEventListener("canplaythrough", () => {
        this.elements.set(asset.id, element);
        resolve();
      }, { once: true });

      element.addEventListener("error", () => {
        reject(new Error(`Failed to load audio asset: ${asset.id}`));
      }, { once: true });

      element.load();
    });
  }
}
