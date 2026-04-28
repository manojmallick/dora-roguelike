import type { Locale } from "../config";
import type { Indicator } from "./ComplianceBoard";

export type RegulatorVoice = "standard" | "grand";

export interface Attack {
  round: number;
  lineId: string;
  lineIdNl: string;
  text: string;
  textNl: string;
  voice: RegulatorVoice;
  targets: Indicator[];
  damage: number;
  type: Indicator | "security" | "any";
}

const ATTACKS: Attack[] = [
  {
    round: 1,
    lineId: "dialogue_01_ictrisk",
    lineIdNl: "nl_dialogue_01_ictrisk",
    text: "Your ICT Risk Management Framework lacks evidence of annual review. Article 5.",
    textNl: "Uw ICT-risicobeheerraamwerk bevat geen bewijs van jaarlijkse beoordeling. Artikel 5.",
    voice: "standard",
    targets: ["ictrisk"],
    damage: 18,
    type: "ictrisk"
  },
  {
    round: 2,
    lineId: "dialogue_02_incidents",
    lineIdNl: "nl_dialogue_02_incidents",
    text: "The incident classification matrix is absent. Article 17 requires this.",
    textNl: "De incidentclassificatiematrix ontbreekt. Artikel 17 vereist dit.",
    voice: "standard",
    targets: ["incidents"],
    damage: 18,
    type: "incidents"
  },
  {
    round: 3,
    lineId: "dialogue_03_testing",
    lineIdNl: "nl_dialogue_03_testing",
    text: "No documented Business Continuity testing in the past 12 months. Article 11.",
    textNl: "Geen gedocumenteerde bedrijfscontinuiteitstest in de afgelopen 12 maanden. Artikel 11.",
    voice: "standard",
    targets: ["testing"],
    damage: 20,
    type: "testing"
  },
  {
    round: 4,
    lineId: "dialogue_04_thirdparty",
    lineIdNl: "nl_dialogue_04_thirdparty",
    text: "Your third-party register lists 47 vendors. 23 show no contract review date.",
    textNl: "Uw register van derde partijen bevat 47 leveranciers. Bij 23 ontbreekt een contractbeoordelingsdatum.",
    voice: "standard",
    targets: ["thirdparty"],
    damage: 20,
    type: "thirdparty"
  },
  {
    round: 5,
    lineId: "dialogue_05_security",
    lineIdNl: "nl_dialogue_05_security",
    text: "Multi-factor authentication is not enforced on 3 systems marked critical.",
    textNl: "Multi-factor authenticatie wordt niet afgedwongen op 3 systemen die als kritiek zijn gemarkeerd.",
    voice: "standard",
    targets: ["ictrisk"],
    damage: 22,
    type: "security"
  },
  {
    round: 6,
    lineId: "dialogue_11_threat_intel",
    lineIdNl: "nl_dialogue_11_threat_intel",
    text: "This finding is CRITICAL. No documented cyber threat intelligence process.",
    textNl: "Deze bevinding is KRITIEK. Er is geen gedocumenteerd proces voor cyberdreigingsinformatie.",
    voice: "standard",
    targets: ["incidents"],
    damage: 26,
    type: "incidents"
  },
  {
    round: 7,
    lineId: "dialogue_12_testing_inadequate",
    lineIdNl: "nl_dialogue_12_testing_inadequate",
    text: "I am noting in the record that your testing program is thoroughly inadequate.",
    textNl: "Ik noteer in het dossier dat uw testprogramma grondig ontoereikend is.",
    voice: "standard",
    targets: ["testing"],
    damage: 28,
    type: "testing"
  },
  {
    round: 8,
    lineId: "dialogue_13_rto_rpo",
    lineIdNl: "nl_dialogue_13_rto_rpo",
    text: "Your recovery time objectives exist. Your recovery point objectives do not.",
    textNl: "Uw recovery time objectives bestaan. Uw recovery point objectives niet.",
    voice: "standard",
    targets: ["testing"],
    damage: 28,
    type: "testing"
  },
  {
    round: 9,
    lineId: "dialogue_16_article_28",
    lineIdNl: "nl_dialogue_16_article_28",
    text: "Your ICT third-party risk register is INCOMPLETE. Article 28. Paragraph 3.",
    textNl: "Uw ICT-risicoregister voor derde partijen is ONVOLLEDIG. Artikel 28. Lid 3.",
    voice: "standard",
    targets: ["thirdparty"],
    damage: 30,
    type: "thirdparty"
  },
  {
    round: 10,
    lineId: "dialogue_18_reporting",
    lineIdNl: "nl_dialogue_18_reporting",
    text: "Your incident reporting timeline is 96 hours. The requirement is 4. Hours.",
    textNl: "Uw tijdlijn voor incidentmelding is 96 uur. De vereiste is 4. Uur.",
    voice: "standard",
    targets: ["reporting"],
    damage: 30,
    type: "reporting"
  },
  {
    round: 11,
    lineId: "boss_01_disappointed",
    lineIdNl: "nl_boss_01_disappointed",
    text: "I have reviewed your compliance program in its entirety. I am... disappointed.",
    textNl: "Ik heb uw complianceprogramma in zijn geheel beoordeeld. Ik ben... teleurgesteld.",
    voice: "grand",
    targets: ["ictrisk", "thirdparty"],
    damage: 24,
    type: "any"
  },
  {
    round: 12,
    lineId: "boss_02_article_28",
    lineIdNl: "nl_boss_02_article_28",
    text: "Article 28, paragraph 3. Your critical vendors. Where is the risk assessment?",
    textNl: "Artikel 28, lid 3. Uw kritieke leveranciers. Waar is de risicobeoordeling?",
    voice: "grand",
    targets: ["thirdparty", "reporting"],
    damage: 26,
    type: "thirdparty"
  },
  {
    round: 13,
    lineId: "boss_04_simultaneous",
    lineIdNl: "nl_boss_04_simultaneous",
    text: "I have flagged 5 simultaneous deficiencies. This is unprecedented in my career.",
    textNl: "Ik heb 5 gelijktijdige tekortkomingen gemarkeerd. Dit is ongekend in mijn loopbaan.",
    voice: "grand",
    targets: ["incidents", "testing", "reporting"],
    damage: 22,
    type: "any"
  },
  {
    round: 14,
    lineId: "boss_05_fine",
    lineIdNl: "nl_boss_05_fine",
    text: "The fine calculation is underway. The appeal process is lengthy. And costly.",
    textNl: "De boeteberekening is gestart. De beroepsprocedure is langdurig. En kostbaar.",
    voice: "grand",
    targets: ["ictrisk", "incidents", "thirdparty"],
    damage: 24,
    type: "any"
  },
  {
    round: 15,
    lineId: "boss_09_ten_million",
    lineIdNl: "nl_boss_09_ten_million",
    text: "Ten million euros is the preliminary figure. Subject to adjustment. Upward.",
    textNl: "Tien miljoen euro is het voorlopige bedrag. Onder voorbehoud van aanpassing. Naar boven.",
    voice: "grand",
    targets: ["ictrisk", "incidents", "thirdparty", "testing", "reporting"],
    damage: 18,
    type: "any"
  }
];

export class RegulatorAI {
  getAttack(round: number): Attack {
    const attack = ATTACKS.find((candidate) => candidate.round === round);

    if (!attack) {
      throw new Error(`No regulator attack configured for round ${round}`);
    }

    return attack;
  }

  isBossRound(round: number): boolean {
    return round >= 11;
  }

  getTotalRounds(): number {
    return ATTACKS.length;
  }

  getAttacks(): Attack[] {
    return [...ATTACKS];
  }

  getLineId(attack: Attack, locale: Locale): string {
    return locale === "nl" ? attack.lineIdNl : attack.lineId;
  }

  getText(attack: Attack, locale: Locale): string {
    return locale === "nl" ? attack.textNl : attack.text;
  }

  getReaction(blocked: boolean): string {
    return blocked ? "...Adequate. For now." : "As I suspected.";
  }
}
