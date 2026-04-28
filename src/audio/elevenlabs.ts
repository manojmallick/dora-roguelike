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
    id: "dialogue_01_ictrisk",
    type: "dialogue",
    src: "/audio/dialogue_01_ictrisk.mp3",
    volume: 1
  },
  {
    id: "dialogue_02_incidents",
    type: "dialogue",
    src: "/audio/dialogue_02_incidents.mp3",
    volume: 1
  },
  {
    id: "dialogue_03_testing",
    type: "dialogue",
    src: "/audio/dialogue_03_testing.mp3",
    volume: 1
  },
  {
    id: "dialogue_04_thirdparty",
    type: "dialogue",
    src: "/audio/dialogue_04_thirdparty.mp3",
    volume: 1
  },
  {
    id: "dialogue_05_security",
    type: "dialogue",
    src: "/audio/dialogue_05_security.mp3",
    volume: 1
  },
  {
    id: "dialogue_11_threat_intel",
    type: "dialogue",
    src: "/audio/dialogue_11_threat_intel.mp3",
    volume: 1
  },
  {
    id: "dialogue_12_testing_inadequate",
    type: "dialogue",
    src: "/audio/dialogue_12_testing_inadequate.mp3",
    volume: 1
  },
  {
    id: "dialogue_13_rto_rpo",
    type: "dialogue",
    src: "/audio/dialogue_13_rto_rpo.mp3",
    volume: 1
  },
  {
    id: "dialogue_16_article_28",
    type: "dialogue",
    src: "/audio/dialogue_16_article_28.mp3",
    volume: 1
  },
  {
    id: "dialogue_18_reporting",
    type: "dialogue",
    src: "/audio/dialogue_18_reporting.mp3",
    volume: 1
  },
  {
    id: "boss_01_disappointed",
    type: "dialogue",
    src: "/audio/boss_01_disappointed.mp3",
    volume: 1
  },
  {
    id: "boss_02_article_28",
    type: "dialogue",
    src: "/audio/boss_02_article_28.mp3",
    volume: 1
  },
  {
    id: "boss_04_simultaneous",
    type: "dialogue",
    src: "/audio/boss_04_simultaneous.mp3",
    volume: 1
  },
  {
    id: "boss_05_fine",
    type: "dialogue",
    src: "/audio/boss_05_fine.mp3",
    volume: 1
  },
  {
    id: "boss_09_ten_million",
    type: "dialogue",
    src: "/audio/boss_09_ten_million.mp3",
    volume: 1
  },
  {
    id: "lawyer_counsel",
    type: "dialogue",
    src: "/audio/lawyer_counsel.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_01_ictrisk",
    type: "dialogue",
    src: "/audio/nl_dialogue_01_ictrisk.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_02_incidents",
    type: "dialogue",
    src: "/audio/nl_dialogue_02_incidents.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_03_testing",
    type: "dialogue",
    src: "/audio/nl_dialogue_03_testing.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_04_thirdparty",
    type: "dialogue",
    src: "/audio/nl_dialogue_04_thirdparty.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_05_security",
    type: "dialogue",
    src: "/audio/nl_dialogue_05_security.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_11_threat_intel",
    type: "dialogue",
    src: "/audio/nl_dialogue_11_threat_intel.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_12_testing_inadequate",
    type: "dialogue",
    src: "/audio/nl_dialogue_12_testing_inadequate.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_13_rto_rpo",
    type: "dialogue",
    src: "/audio/nl_dialogue_13_rto_rpo.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_16_article_28",
    type: "dialogue",
    src: "/audio/nl_dialogue_16_article_28.mp3",
    volume: 1
  },
  {
    id: "nl_dialogue_18_reporting",
    type: "dialogue",
    src: "/audio/nl_dialogue_18_reporting.mp3",
    volume: 1
  },
  {
    id: "nl_boss_01_disappointed",
    type: "dialogue",
    src: "/audio/nl_boss_01_disappointed.mp3",
    volume: 1
  },
  {
    id: "nl_boss_02_article_28",
    type: "dialogue",
    src: "/audio/nl_boss_02_article_28.mp3",
    volume: 1
  },
  {
    id: "nl_boss_04_simultaneous",
    type: "dialogue",
    src: "/audio/nl_boss_04_simultaneous.mp3",
    volume: 1
  },
  {
    id: "nl_boss_05_fine",
    type: "dialogue",
    src: "/audio/nl_boss_05_fine.mp3",
    volume: 1
  },
  {
    id: "nl_boss_09_ten_million",
    type: "dialogue",
    src: "/audio/nl_boss_09_ten_million.mp3",
    volume: 1
  },
  {
    id: "nl_lawyer_counsel",
    type: "dialogue",
    src: "/audio/nl_lawyer_counsel.mp3",
    volume: 1
  },
  {
    id: "gdpr_boss_01_transparency",
    type: "dialogue",
    src: "/audio/gdpr_boss_01_transparency.mp3",
    volume: 1
  },
  {
    id: "gdpr_boss_02_erasure",
    type: "dialogue",
    src: "/audio/gdpr_boss_02_erasure.mp3",
    volume: 1
  },
  {
    id: "gdpr_boss_03_breach",
    type: "dialogue",
    src: "/audio/gdpr_boss_03_breach.mp3",
    volume: 1
  },
  {
    id: "gdpr_boss_04_consent",
    type: "dialogue",
    src: "/audio/gdpr_boss_04_consent.mp3",
    volume: 1
  },
  {
    id: "gdpr_boss_05_article_83",
    type: "dialogue",
    src: "/audio/gdpr_boss_05_article_83.mp3",
    volume: 1
  },
  {
    id: "nl_gdpr_boss_01_transparency",
    type: "dialogue",
    src: "/audio/nl_gdpr_boss_01_transparency.mp3",
    volume: 1
  },
  {
    id: "nl_gdpr_boss_02_erasure",
    type: "dialogue",
    src: "/audio/nl_gdpr_boss_02_erasure.mp3",
    volume: 1
  },
  {
    id: "nl_gdpr_boss_03_breach",
    type: "dialogue",
    src: "/audio/nl_gdpr_boss_03_breach.mp3",
    volume: 1
  },
  {
    id: "nl_gdpr_boss_04_consent",
    type: "dialogue",
    src: "/audio/nl_gdpr_boss_04_consent.mp3",
    volume: 1
  },
  {
    id: "nl_gdpr_boss_05_article_83",
    type: "dialogue",
    src: "/audio/nl_gdpr_boss_05_article_83.mp3",
    volume: 1
  },
  {
    id: "systemic_16_concentration",
    type: "dialogue",
    src: "/audio/systemic_16_concentration.mp3",
    volume: 1
  },
  {
    id: "systemic_17_board",
    type: "dialogue",
    src: "/audio/systemic_17_board.mp3",
    volume: 1
  },
  {
    id: "systemic_18_scenario",
    type: "dialogue",
    src: "/audio/systemic_18_scenario.mp3",
    volume: 1
  },
  {
    id: "systemic_19_cross_border",
    type: "dialogue",
    src: "/audio/systemic_19_cross_border.mp3",
    volume: 1
  },
  {
    id: "systemic_20_final",
    type: "dialogue",
    src: "/audio/systemic_20_final.mp3",
    volume: 1
  },
  {
    id: "nl_systemic_16_concentration",
    type: "dialogue",
    src: "/audio/nl_systemic_16_concentration.mp3",
    volume: 1
  },
  {
    id: "nl_systemic_17_board",
    type: "dialogue",
    src: "/audio/nl_systemic_17_board.mp3",
    volume: 1
  },
  {
    id: "nl_systemic_18_scenario",
    type: "dialogue",
    src: "/audio/nl_systemic_18_scenario.mp3",
    volume: 1
  },
  {
    id: "nl_systemic_19_cross_border",
    type: "dialogue",
    src: "/audio/nl_systemic_19_cross_border.mp3",
    volume: 1
  },
  {
    id: "nl_systemic_20_final",
    type: "dialogue",
    src: "/audio/nl_systemic_20_final.mp3",
    volume: 1
  },
  {
    id: "music_menu",
    type: "music",
    src: "/audio/music_menu.mp3",
    volume: 0.24,
    loop: true
  },
  {
    id: "music_gameplay_calm",
    type: "music",
    src: "/audio/music_gameplay_calm.mp3",
    volume: 0.2,
    loop: true
  },
  {
    id: "music_gameplay_tense",
    type: "music",
    src: "/audio/music_gameplay_tense.mp3",
    volume: 0.22,
    loop: true
  },
  {
    id: "music_boss",
    type: "music",
    src: "/audio/music_boss.mp3",
    volume: 0.24,
    loop: true
  },
  {
    id: "music_victory",
    type: "music",
    src: "/audio/music_victory.mp3",
    volume: 0.24
  },
  {
    id: "music_defeat",
    type: "music",
    src: "/audio/music_defeat.mp3",
    volume: 0.26
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
  },
  {
    id: "sfx_regulator_enter",
    type: "sfx",
    src: "/audio/sfx_regulator_enter.mp3",
    volume: 0.7
  }
];

export const getAudioManifest = (): AudioAsset[] => AUDIO_MANIFEST;
