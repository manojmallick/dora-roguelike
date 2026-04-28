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
  private readonly assetsById = new Map<string, AudioAsset>();
  private readonly elements = new Map<string, HTMLAudioElement>();
  private readonly loadedIds = new Set<string>();
  private activeDialogueId?: string;
  private activeMusicId?: string;
  private activeSfxId?: string;
  private crossfadeId = 0;
  private unlocked = false;
  private audioContext?: AudioContext;

  constructor(assets: AudioAsset[], options: AudioCacheOptions = {}) {
    this.assets = assets;
    this.skipAudio = options.skipAudio ?? false;
    this.assets.forEach((asset) => this.assetsById.set(asset.id, asset));
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

    const asset = this.assetsById.get(id);
    if (!asset) {
      return false;
    }

    if (this.skipAudio) {
      this.markActive(asset);
      return true;
    }

    const element = this.elements.get(id);
    if (!element) {
      return false;
    }

    this.stopActiveForType(asset);
    element.currentTime = 0;
    element.volume = asset.volume;
    void element.play();
    this.markActive(asset);
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
    const fromAsset = this.assetsById.get(fromId);
    const toAsset = this.assetsById.get(toId);

    if (this.skipAudio) {
      return this.play(toId);
    }

    if (!from || !to || !fromAsset || !toAsset || !this.unlocked) {
      return false;
    }

    this.crossfadeId += 1;
    const activeCrossfadeId = this.crossfadeId;
    this.stopOtherMusic(fromId, toId);
    const targetVolume = to.volume;
    const startedAt = performance.now();
    to.volume = 0;
    to.currentTime = 0;
    void to.play();
    this.activeMusicId = toId;

    const step = (now: number): void => {
      if (activeCrossfadeId !== this.crossfadeId) {
        return;
      }

      const progress = Math.min(1, (now - startedAt) / Math.max(1, durationMs));
      from.volume = from.volume * (1 - progress);
      to.volume = targetVolume * progress;

      if (progress < 1) {
        requestAnimationFrame(step);
        return;
      }

      from.pause();
      from.currentTime = 0;
      from.volume = fromAsset.volume;
      to.volume = toAsset.volume;
    };

    requestAnimationFrame(step);
    return true;
  }

  private markActive(asset: AudioAsset): void {
    if (asset.type === "dialogue") {
      this.activeDialogueId = asset.id;
    }

    if (asset.type === "music") {
      this.activeMusicId = asset.id;
    }

    if (asset.type === "sfx") {
      this.activeSfxId = asset.id;
    }
  }

  private stopActiveForType(asset: AudioAsset): void {
    if (asset.type === "dialogue") {
      this.stopIfDifferent(this.activeDialogueId, asset.id);
      return;
    }

    if (asset.type === "music") {
      this.crossfadeId += 1;
      this.stopIfDifferent(this.activeMusicId, asset.id);
      return;
    }

    this.stopIfDifferent(this.activeSfxId, asset.id);
  }

  private stopIfDifferent(activeId: string | undefined, nextId: string): void {
    if (activeId && activeId !== nextId) {
      this.stop(activeId);
    }
  }

  private stopOtherMusic(fromId: string, toId: string): void {
    for (const asset of this.assets) {
      if (asset.type === "music" && asset.id !== fromId && asset.id !== toId) {
        this.stop(asset.id);
      }
    }
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
