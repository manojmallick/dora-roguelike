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
    id: "music_gameplay_calm",
    type: "music",
    src: "/audio/music_gameplay_calm.mp3",
    volume: 0.15,
    loop: true
  },
  {
    id: "music_gameplay_tense",
    type: "music",
    src: "/audio/music_gameplay_tense.mp3",
    volume: 0.15,
    loop: true
  },
  {
    id: "music_boss",
    type: "music",
    src: "/audio/music_boss.mp3",
    volume: 0.15,
    loop: true
  },
  {
    id: "music_victory",
    type: "music",
    src: "/audio/music_victory.mp3",
    volume: 0.15
  },
  {
    id: "music_defeat",
    type: "music",
    src: "/audio/music_defeat.mp3",
    volume: 0.15
  },
  {
    id: "sfx_card_play",
    type: "sfx",
    src: "/audio/sfx_card_play.mp3",
    volume: 0.6
  },
  {
    id: "sfx_card_block",
    type: "sfx",
    src: "/audio/sfx_card_block.mp3",
    volume: 0.6
  },
  {
    id: "sfx_damage",
    type: "sfx",
    src: "/audio/sfx_damage.mp3",
    volume: 0.6
  },
  {
    id: "sfx_critical_damage",
    type: "sfx",
    src: "/audio/sfx_critical_damage.mp3",
    volume: 0.7
  },
  {
    id: "sfx_boss_entrance",
    type: "sfx",
    src: "/audio/sfx_boss_entrance.mp3",
    volume: 0.7
  }
];

export const getAudioManifest = (): AudioAsset[] => AUDIO_MANIFEST;
