import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const API_BASE = "https://api.elevenlabs.io/v1";
const OUTPUT_FORMAT = "mp3_44100_128";

const STANDARD_VOICE_SETTINGS = {
  stability: 0.85,
  similarity_boost: 0.9,
  style: 0.1,
  use_speaker_boost: true
};

const GRAND_VOICE_SETTINGS = {
  stability: 0.92,
  similarity_boost: 0.85,
  style: 0.03,
  use_speaker_boost: true
};

const LAWYER_VOICE_SETTINGS = {
  stability: 0.6,
  similarity_boost: 0.75,
  style: 0.4,
  use_speaker_boost: true
};

const dialogueJobs = [
  {
    id: "dialogue_test",
    file: "dialogue_test.mp3",
    voice: "standard",
    text: "Your ICT third-party risk register is incomplete. Article 28. Paragraph 3."
  },
  {
    id: "dialogue_01_ictrisk",
    file: "dialogue_01_ictrisk.mp3",
    voice: "standard",
    text: "Your ICT Risk Management Framework lacks evidence of annual review. Article 5."
  },
  {
    id: "dialogue_02_incidents",
    file: "dialogue_02_incidents.mp3",
    voice: "standard",
    text: "The incident classification matrix is absent. Article 17 requires this."
  },
  {
    id: "dialogue_03_testing",
    file: "dialogue_03_testing.mp3",
    voice: "standard",
    text: "No documented Business Continuity testing in the past 12 months. Article 11."
  },
  {
    id: "dialogue_04_thirdparty",
    file: "dialogue_04_thirdparty.mp3",
    voice: "standard",
    text: "Your third-party register lists 47 vendors. 23 show no contract review date."
  },
  {
    id: "dialogue_05_security",
    file: "dialogue_05_security.mp3",
    voice: "standard",
    text: "Multi-factor authentication is not enforced on 3 systems marked critical."
  },
  {
    id: "dialogue_11_threat_intel",
    file: "dialogue_11_threat_intel.mp3",
    voice: "standard",
    text: "This finding is CRITICAL. No documented cyber threat intelligence process."
  },
  {
    id: "dialogue_12_testing_inadequate",
    file: "dialogue_12_testing_inadequate.mp3",
    voice: "standard",
    text: "I am noting in the record that your testing program is thoroughly inadequate."
  },
  {
    id: "dialogue_13_rto_rpo",
    file: "dialogue_13_rto_rpo.mp3",
    voice: "standard",
    text: "Your recovery time objectives exist. Your recovery point objectives do not."
  },
  {
    id: "dialogue_16_article_28",
    file: "dialogue_16_article_28.mp3",
    voice: "standard",
    text: "Your ICT third-party risk register is INCOMPLETE. Article 28. Paragraph 3."
  },
  {
    id: "dialogue_18_reporting",
    file: "dialogue_18_reporting.mp3",
    voice: "standard",
    text: "Your incident reporting timeline is 96 hours. The requirement is 4. Hours."
  },
  {
    id: "boss_01_disappointed",
    file: "boss_01_disappointed.mp3",
    voice: "grand",
    text: "I have reviewed your compliance program in its entirety. I am... disappointed."
  },
  {
    id: "boss_02_article_28",
    file: "boss_02_article_28.mp3",
    voice: "grand",
    text: "Article 28, paragraph 3. Your critical vendors. Where is the risk assessment?"
  },
  {
    id: "boss_04_simultaneous",
    file: "boss_04_simultaneous.mp3",
    voice: "grand",
    text: "I have flagged 5 simultaneous deficiencies. This is unprecedented in my career."
  },
  {
    id: "boss_05_fine",
    file: "boss_05_fine.mp3",
    voice: "grand",
    text: "The fine calculation is underway. The appeal process is lengthy. And costly."
  },
  {
    id: "boss_09_ten_million",
    file: "boss_09_ten_million.mp3",
    voice: "grand",
    text: "Ten million euros is the preliminary figure. Subject to adjustment. Upward."
  },
  {
    id: "lawyer_counsel",
    file: "lawyer_counsel.mp3",
    voice: "lawyer",
    text: "I'll handle this. Article 28 requirements are substantially met under the treatment exception. We'll proceed."
  }
];

const dutchDialogueJobs = [
  {
    id: "nl_dialogue_01_ictrisk",
    file: "nl_dialogue_01_ictrisk.mp3",
    voice: "standard",
    text: "Uw ICT-risicobeheerraamwerk bevat geen bewijs van jaarlijkse beoordeling. Artikel 5."
  },
  {
    id: "nl_dialogue_02_incidents",
    file: "nl_dialogue_02_incidents.mp3",
    voice: "standard",
    text: "De incidentclassificatiematrix ontbreekt. Artikel 17 vereist dit."
  },
  {
    id: "nl_dialogue_03_testing",
    file: "nl_dialogue_03_testing.mp3",
    voice: "standard",
    text: "Geen gedocumenteerde bedrijfscontinuiteitstest in de afgelopen 12 maanden. Artikel 11."
  },
  {
    id: "nl_dialogue_04_thirdparty",
    file: "nl_dialogue_04_thirdparty.mp3",
    voice: "standard",
    text: "Uw register van derde partijen bevat 47 leveranciers. Bij 23 ontbreekt een contractbeoordelingsdatum."
  },
  {
    id: "nl_dialogue_05_security",
    file: "nl_dialogue_05_security.mp3",
    voice: "standard",
    text: "Multi-factor authenticatie wordt niet afgedwongen op 3 systemen die als kritiek zijn gemarkeerd."
  },
  {
    id: "nl_dialogue_11_threat_intel",
    file: "nl_dialogue_11_threat_intel.mp3",
    voice: "standard",
    text: "Deze bevinding is kritiek. Er is geen gedocumenteerd proces voor cyberdreigingsinformatie."
  },
  {
    id: "nl_dialogue_12_testing_inadequate",
    file: "nl_dialogue_12_testing_inadequate.mp3",
    voice: "standard",
    text: "Ik noteer in het dossier dat uw testprogramma grondig ontoereikend is."
  },
  {
    id: "nl_dialogue_13_rto_rpo",
    file: "nl_dialogue_13_rto_rpo.mp3",
    voice: "standard",
    text: "Uw recovery time objectives bestaan. Uw recovery point objectives niet."
  },
  {
    id: "nl_dialogue_16_article_28",
    file: "nl_dialogue_16_article_28.mp3",
    voice: "standard",
    text: "Uw ICT-risicoregister voor derde partijen is onvolledig. Artikel 28. Lid 3."
  },
  {
    id: "nl_dialogue_18_reporting",
    file: "nl_dialogue_18_reporting.mp3",
    voice: "standard",
    text: "Uw tijdlijn voor incidentmelding is 96 uur. De vereiste is 4. Uur."
  },
  {
    id: "nl_boss_01_disappointed",
    file: "nl_boss_01_disappointed.mp3",
    voice: "grand",
    text: "Ik heb uw complianceprogramma in zijn geheel beoordeeld. Ik ben... teleurgesteld."
  },
  {
    id: "nl_boss_02_article_28",
    file: "nl_boss_02_article_28.mp3",
    voice: "grand",
    text: "Artikel 28, lid 3. Uw kritieke leveranciers. Waar is de risicobeoordeling?"
  },
  {
    id: "nl_boss_04_simultaneous",
    file: "nl_boss_04_simultaneous.mp3",
    voice: "grand",
    text: "Ik heb 5 gelijktijdige tekortkomingen gemarkeerd. Dit is ongekend in mijn loopbaan."
  },
  {
    id: "nl_boss_05_fine",
    file: "nl_boss_05_fine.mp3",
    voice: "grand",
    text: "De boeteberekening is gestart. De beroepsprocedure is langdurig. En kostbaar."
  },
  {
    id: "nl_boss_09_ten_million",
    file: "nl_boss_09_ten_million.mp3",
    voice: "grand",
    text: "Tien miljoen euro is het voorlopige bedrag. Onder voorbehoud van aanpassing. Naar boven."
  },
  {
    id: "nl_lawyer_counsel",
    file: "nl_lawyer_counsel.mp3",
    voice: "lawyer",
    text: "Ik regel dit. Aan de vereisten van artikel 28 is substantieel voldaan onder de behandelingsuitzondering. We gaan door."
  }
];

const gdprBossJobs = [
  {
    id: "gdpr_boss_01_transparency",
    file: "gdpr_boss_01_transparency.mp3",
    voice: "grand",
    text: "The Data Protection Authority has joined this audit. Your privacy notice fails Article 13 transparency requirements."
  },
  {
    id: "gdpr_boss_02_erasure",
    file: "gdpr_boss_02_erasure.mp3",
    voice: "grand",
    text: "Article 17. A data subject requested erasure. Your processor chain cannot prove completion."
  },
  {
    id: "gdpr_boss_03_breach",
    file: "gdpr_boss_03_breach.mp3",
    voice: "grand",
    text: "Article 33 requires breach notification within 72 hours. Your incident clock started yesterday."
  },
  {
    id: "gdpr_boss_04_consent",
    file: "gdpr_boss_04_consent.mp3",
    voice: "grand",
    text: "Your consent records are ambiguous. Ambiguity is not a lawful basis under pressure."
  },
  {
    id: "gdpr_boss_05_article_83",
    file: "gdpr_boss_05_article_83.mp3",
    voice: "grand",
    text: "Article 83 administrative fines are now under consideration. Four percent of global turnover has a certain elegance."
  }
];

const dutchGdprBossJobs = [
  {
    id: "nl_gdpr_boss_01_transparency",
    file: "nl_gdpr_boss_01_transparency.mp3",
    voice: "grand",
    text: "De Autoriteit Persoonsgegevens neemt deel aan deze audit. Uw privacyverklaring voldoet niet aan de transparantievereisten van artikel 13."
  },
  {
    id: "nl_gdpr_boss_02_erasure",
    file: "nl_gdpr_boss_02_erasure.mp3",
    voice: "grand",
    text: "Artikel 17. Een betrokkene verzocht om verwijdering. Uw verwerkersketen kan voltooiing niet aantonen."
  },
  {
    id: "nl_gdpr_boss_03_breach",
    file: "nl_gdpr_boss_03_breach.mp3",
    voice: "grand",
    text: "Artikel 33 vereist melding van een datalek binnen 72 uur. Uw incidentklok is gisteren gestart."
  },
  {
    id: "nl_gdpr_boss_04_consent",
    file: "nl_gdpr_boss_04_consent.mp3",
    voice: "grand",
    text: "Uw toestemmingsregistraties zijn dubbelzinnig. Dubbelzinnigheid is geen rechtsgrond onder druk."
  },
  {
    id: "nl_gdpr_boss_05_article_83",
    file: "nl_gdpr_boss_05_article_83.mp3",
    voice: "grand",
    text: "Administratieve boetes onder artikel 83 worden nu overwogen. Vier procent van de wereldwijde omzet heeft een zekere elegantie."
  }
];

const musicJobs = [
  {
    id: "music_menu",
    file: "music_menu.mp3",
    durationMs: 30000,
    prompt: "Instrumental corporate bureaucratic march, ominous strings, 80 bpm, orchestral, loopable menu music for a dark compliance card game."
  },
  {
    id: "music_gameplay_calm",
    file: "music_gameplay_calm.mp3",
    durationMs: 30000,
    prompt: "Instrumental tense ambient underscore, low drones, subtle unease, 70 bpm, cinematic, loopable gameplay music."
  },
  {
    id: "music_gameplay_tense",
    file: "music_gameplay_tense.mp3",
    durationMs: 30000,
    prompt: "Instrumental urgent strings, building pressure, 90 bpm, cinematic thriller, loopable high pressure card game music."
  },
  {
    id: "music_boss",
    file: "music_boss.mp3",
    durationMs: 30000,
    prompt: "Instrumental dramatic orchestral boss music, massive brass, inevitable institutional dread, 105 bpm, loopable."
  },
  {
    id: "music_victory",
    file: "music_victory.mp3",
    durationMs: 12000,
    prompt: "Instrumental understated triumph, relief, light strings, 85 bpm, bittersweet victory sting for surviving an audit."
  },
  {
    id: "music_defeat",
    file: "music_defeat.mp3",
    durationMs: 12000,
    prompt: "Instrumental solemn brass, weight of consequence, slow 55 bpm, bureaucratic defeat sting for a regulatory fine."
  }
];

const sfxJobs = [
  {
    id: "sfx_card_play",
    file: "sfx_card_play.mp3",
    durationSeconds: 1.5,
    text: "Paper rustle followed by a crisp official document stamp."
  },
  {
    id: "sfx_card_block",
    file: "sfx_card_block.mp3",
    durationSeconds: 1.5,
    text: "Rubber stamp approval, firm satisfying thump."
  },
  {
    id: "sfx_damage",
    file: "sfx_damage.mp3",
    durationSeconds: 1.5,
    text: "Distant alarm bell, paper crumple, error notification."
  },
  {
    id: "sfx_critical_damage",
    file: "sfx_critical_damage.mp3",
    durationSeconds: 2,
    text: "Loud urgent alarm and system failure warning."
  },
  {
    id: "sfx_regulator_enter",
    file: "sfx_regulator_enter.mp3",
    durationSeconds: 2.5,
    text: "Heavy office door opens, footsteps, briefcase placed on a table."
  },
  {
    id: "sfx_boss_entrance",
    file: "sfx_boss_entrance.mp3",
    durationSeconds: 3,
    text: "Dramatic orchestral sting, thunder-like, institutional dread."
  }
];

const parseEnvFile = (path) => {
  if (!existsSync(path)) {
    return {};
  }

  const normalizeValue = (value) => {
    const trimmed = value.trim().replace(/^['"]|['"]$/g, "");
    const commentIndex = trimmed.indexOf(" #");

    return (commentIndex >= 0 ? trimmed.slice(0, commentIndex) : trimmed).trim();
  };

  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index), normalizeValue(line.slice(index + 1))];
      })
  );
};

const args = new Set(process.argv.slice(2));
const getArgValue = (name, fallback) => {
  const prefix = `${name}=`;
  const entry = [...args].find((arg) => arg.startsWith(prefix));
  return entry ? entry.slice(prefix.length) : fallback;
};

const env = { ...parseEnvFile(resolve(".env")), ...process.env };
const apiKey = env.ELEVENLABS_API_KEY;
const outputDir = resolve("public/audio");
const kind = getArgValue("--kind", "all");
const dryRun = args.has("--dry-run");
const force = args.has("--force");
const ttsModelId = env.ELEVENLABS_TTS_MODEL_ID || "eleven_multilingual_v2";

const voiceIds = {
  standard: env.REGULATOR_VOICE_ID || "pNInz6obpgDQGcFmaJgB",
  grand: env.GRAND_REGULATOR_VOICE_ID || "VR6AewLTigWG4xSOukaG",
  lawyer: env.LAWYER_VOICE_ID || "21m00Tcm4TlvDq8ikWAM"
};

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

const selectedJobs = () => {
  if (kind === "tts") {
    return dialogueJobs.map((job) => ({ ...job, type: "tts" }));
  }

  if (kind === "tts-nl") {
    return dutchDialogueJobs.map((job) => ({ ...job, type: "tts" }));
  }

  if (kind === "tts-gdpr") {
    return [
      ...gdprBossJobs.map((job) => ({ ...job, type: "tts" })),
      ...dutchGdprBossJobs.map((job) => ({ ...job, type: "tts" }))
    ];
  }

  if (kind === "music") {
    return musicJobs.map((job) => ({ ...job, type: "music" }));
  }

  if (kind === "sfx") {
    return sfxJobs.map((job) => ({ ...job, type: "sfx" }));
  }

  if (kind === "all") {
    return [
      ...dialogueJobs.map((job) => ({ ...job, type: "tts" })),
      ...dutchDialogueJobs.map((job) => ({ ...job, type: "tts" })),
      ...gdprBossJobs.map((job) => ({ ...job, type: "tts" })),
      ...dutchGdprBossJobs.map((job) => ({ ...job, type: "tts" })),
      ...sfxJobs.map((job) => ({ ...job, type: "sfx" })),
      ...musicJobs.map((job) => ({ ...job, type: "music" }))
    ];
  }

  throw new Error(`Unsupported --kind=${kind}. Use all, tts, tts-nl, tts-gdpr, sfx, or music.`);
};

const requestAudio = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`ElevenLabs request failed (${response.status}): ${detail}`);
  }

  return Buffer.from(await response.arrayBuffer());
};

const generateTts = (job) => {
  const voiceSettings = job.voice === "grand"
    ? GRAND_VOICE_SETTINGS
    : job.voice === "lawyer"
      ? LAWYER_VOICE_SETTINGS
      : STANDARD_VOICE_SETTINGS;

  return requestAudio(
    `${API_BASE}/text-to-speech/${voiceIds[job.voice]}?output_format=${OUTPUT_FORMAT}`,
    {
      text: job.text,
      model_id: ttsModelId,
      voice_settings: voiceSettings
    }
  );
};

const generateSfx = (job) => requestAudio(
  `${API_BASE}/sound-generation?output_format=${OUTPUT_FORMAT}`,
  {
    text: job.text,
    duration_seconds: job.durationSeconds,
    prompt_influence: 0.35,
    model_id: "eleven_text_to_sound_v2"
  }
);

const generateMusic = (job) => requestAudio(
  `${API_BASE}/music?output_format=${OUTPUT_FORMAT}`,
  {
    prompt: job.prompt,
    music_length_ms: job.durationMs,
    model_id: "music_v1",
    force_instrumental: true
  }
);

const generate = async (job) => {
  if (job.type === "tts") {
    return generateTts(job);
  }

  if (job.type === "sfx") {
    return generateSfx(job);
  }

  return generateMusic(job);
};

if (!dryRun && !apiKey) {
  throw new Error("ELEVENLABS_API_KEY is missing. Add it to .env before generating audio.");
}

mkdirSync(outputDir, { recursive: true });
const jobs = selectedJobs();

console.log(`Audio generation mode: ${kind}`);
console.log(`Jobs selected: ${jobs.length}`);
console.log(`Output directory: ${outputDir}`);

for (const [index, job] of jobs.entries()) {
  const outputPath = resolve(outputDir, job.file);
  const label = `${index + 1}/${jobs.length} ${job.type} ${job.id}`;

  if (existsSync(outputPath) && !force) {
    console.log(`skip ${label} -> ${job.file}`);
    continue;
  }

  if (dryRun) {
    console.log(`dry-run ${label} -> ${job.file}`);
    continue;
  }

  console.log(`generate ${label} -> ${job.file}`);
  const audio = await generate(job);
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, audio);

  await sleep(150);
}

console.log("Audio generation complete.");
