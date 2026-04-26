export type AudioAssetType = "dialogue" | "music" | "sfx";

export interface AudioAsset {
  id: string;
  type: AudioAssetType;
  src: string;
  volume: number;
  loop?: boolean;
}

export const AUDIO_MANIFEST: AudioAsset[] = [
  {
    id: "dialogue_test",
    type: "dialogue",
    src: "/audio/dialogue_test.mp3",
    volume: 1
  },
  {
    id: "music_menu",
    type: "music",
    src: "/audio/music_menu.mp3",
    volume: 0.15,
    loop: true
  },
  {
    id: "sfx_card_play",
    type: "sfx",
    src: "/audio/sfx_card_play.mp3",
    volume: 0.6
  }
];

export const getAudioManifest = (): AudioAsset[] => AUDIO_MANIFEST;
