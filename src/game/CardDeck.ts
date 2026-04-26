import type { Indicator } from "./ComplianceBoard";

export type CardType = "shield" | "restore" | "utility";
export type CardTarget = Indicator | "all" | "incidents-testing" | "none";
export type CardEffectKind = "block" | "restore" | "reduce-damage" | "draw" | "skip-attack";

export interface CardEffect {
  kind: CardEffectKind;
  amount?: number;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  target: CardTarget;
  effect: CardEffect;
  citation?: string;
  description: string;
  flavour: string;
}

export interface AttackLike {
  type: Indicator | "security" | "any";
  targets: Indicator[];
}

const createCards = (): Card[] => [
  {
    id: "dora-art5-shield",
    name: "DORA Art.5 Shield",
    type: "shield",
    target: "ictrisk",
    effect: { kind: "block" },
    citation: "DORA Article 5",
    description: "Block one ICT Risk attack.",
    flavour: "Board oversight, but make it laminated."
  },
  {
    id: "dora-art9-patch",
    name: "DORA Art.9 Patch",
    type: "restore",
    target: "ictrisk",
    effect: { kind: "restore", amount: 30 },
    citation: "DORA Article 9",
    description: "Restore ICT Risk by 30%.",
    flavour: "Access controls: now with fewer mysterious exceptions."
  },
  {
    id: "nis2-art21-barrier",
    name: "NIS2 Art.21 Barrier",
    type: "shield",
    target: "incidents-testing",
    effect: { kind: "block" },
    citation: "NIS2 Article 21",
    description: "Block Incident or Testing attacks.",
    flavour: "A security measure with actual measures in it."
  },
  {
    id: "incident-response-plan",
    name: "Incident Response Plan",
    type: "restore",
    target: "incidents",
    effect: { kind: "restore", amount: 80 },
    citation: "DORA Article 17",
    description: "Restore Incidents by 80%.",
    flavour: "The incident bridge has snacks and consequences."
  },
  {
    id: "third-party-register",
    name: "Third-Party Register",
    type: "restore",
    target: "thirdparty",
    effect: { kind: "restore", amount: 100 },
    citation: "DORA Article 28",
    description: "Restore Third-Party by 100%.",
    flavour: "Every vendor, every appendix, every haunted renewal date."
  },
  {
    id: "gdpr-art30-records",
    name: "GDPR Art.30 Records",
    type: "shield",
    target: "all",
    effect: { kind: "reduce-damage", amount: 20 },
    citation: "GDPR Article 30",
    description: "Reduce any attack damage by 20%.",
    flavour: "A spreadsheet so complete it becomes a legal argument."
  },
  {
    id: "emergency-patch",
    name: "Emergency Patch",
    type: "restore",
    target: "all",
    effect: { kind: "restore", amount: 50 },
    citation: "DORA Article 9",
    description: "Restore any indicator by 50%.",
    flavour: "Tested in production, documented in hindsight."
  },
  {
    id: "legal-counsel",
    name: "Legal Counsel",
    type: "utility",
    target: "all",
    effect: { kind: "skip-attack" },
    citation: "DORA Article 28",
    description: "Skip one attack entirely.",
    flavour: "A calm voice enters the room. Everyone sits up straighter."
  },
  {
    id: "coffee-break",
    name: "Coffee Break",
    type: "utility",
    target: "none",
    effect: { kind: "draw", amount: 2 },
    description: "Draw 2 cards.",
    flavour: "Sometimes you just need a moment."
  },
  {
    id: "bcp-drill",
    name: "BCP Drill",
    type: "restore",
    target: "testing",
    effect: { kind: "restore", amount: 40 },
    citation: "DORA Article 11",
    description: "Restore Testing by 40%.",
    flavour: "The tabletop exercise finally leaves the table."
  },
  {
    id: "backup-evidence",
    name: "Backup Evidence",
    type: "shield",
    target: "testing",
    effect: { kind: "block" },
    citation: "DORA Article 12",
    description: "Block a Testing attack.",
    flavour: "Screenshots, timestamps, and the sacred restore log."
  },
  {
    id: "board-minutes",
    name: "Board Minutes",
    type: "shield",
    target: "ictrisk",
    effect: { kind: "block" },
    citation: "DORA Article 5",
    description: "Block ICT Risk governance findings.",
    flavour: "Someone wrote it down. A miracle of governance."
  },
  {
    id: "four-hour-report",
    name: "4-Hour Report",
    type: "restore",
    target: "reporting",
    effect: { kind: "restore", amount: 45 },
    citation: "DORA Article 19",
    description: "Restore Reporting by 45%.",
    flavour: "Regulatory time moves differently during an outage."
  },
  {
    id: "classification-matrix",
    name: "Classification Matrix",
    type: "shield",
    target: "incidents",
    effect: { kind: "block" },
    citation: "DORA Article 18",
    description: "Block an Incident Response attack.",
    flavour: "Severity labels: now less vibes-based."
  },
  {
    id: "vendor-exit-plan",
    name: "Vendor Exit Plan",
    type: "shield",
    target: "thirdparty",
    effect: { kind: "block" },
    citation: "DORA Article 28",
    description: "Block a Third-Party attack.",
    flavour: "Breaking up is hard. Regulated breaking up is harder."
  },
  {
    id: "threat-intel-briefing",
    name: "Threat Intel Briefing",
    type: "shield",
    target: "incidents",
    effect: { kind: "block" },
    citation: "DORA Article 13",
    description: "Block a cyber threat finding.",
    flavour: "The threat actors also had a quarterly roadmap."
  },
  {
    id: "rto-rpo-map",
    name: "RTO/RPO Map",
    type: "restore",
    target: "testing",
    effect: { kind: "restore", amount: 35 },
    citation: "DORA Article 11",
    description: "Restore Testing by 35%.",
    flavour: "Two acronyms, one survivable weekend."
  },
  {
    id: "concentration-review",
    name: "Concentration Review",
    type: "restore",
    target: "thirdparty",
    effect: { kind: "restore", amount: 50 },
    citation: "DORA Article 29",
    description: "Restore Third-Party by 50%.",
    flavour: "It turns out all roads lead to the same cloud invoice."
  },
  {
    id: "awareness-training",
    name: "Awareness Training",
    type: "restore",
    target: "incidents",
    effect: { kind: "restore", amount: 30 },
    citation: "DORA Article 13",
    description: "Restore Incidents by 30%.",
    flavour: "Phishing simulations: because trust needed metrics."
  },
  {
    id: "management-report",
    name: "Management Report",
    type: "restore",
    target: "reporting",
    effect: { kind: "restore", amount: 35 },
    citation: "DORA Article 6",
    description: "Restore Reporting by 35%.",
    flavour: "A dashboard that says both less and more than anyone hoped."
  }
];

export class CardDeck {
  private readonly random: () => number;
  private drawPile: Card[];
  private discardPile: Card[] = [];
  private hand: Card[] = [];

  constructor(random: () => number = Math.random) {
    this.random = random;
    this.drawPile = this.shuffle(createCards());
  }

  getHand(): Card[] {
    return [...this.hand];
  }

  getDrawPileCount(): number {
    return this.drawPile.length;
  }

  getDiscardPileCount(): number {
    return this.discardPile.length;
  }

  draw(count: number): Card[] {
    const drawn: Card[] = [];

    for (let index = 0; index < count; index += 1) {
      this.reshuffleIfEmpty();
      const card = this.drawPile.shift();

      if (!card) {
        break;
      }

      this.hand.push(card);
      drawn.push(card);
    }

    return drawn;
  }

  play(cardId: string): Card | undefined {
    const index = this.hand.findIndex((card) => card.id === cardId);

    if (index < 0) {
      return undefined;
    }

    const [card] = this.hand.splice(index, 1);
    this.discardPile.push(card);

    if (card.effect.kind === "draw") {
      this.draw(card.effect.amount ?? 0);
    }

    return card;
  }

  discard(card: Card): void {
    this.discardPile.push(card);
  }

  reshuffleIfEmpty(): void {
    if (this.drawPile.length > 0 || this.discardPile.length === 0) {
      return;
    }

    this.drawPile = this.shuffle(this.discardPile);
    this.discardPile = [];
  }

  doesCardCounter(card: Card, attack: AttackLike): boolean {
    if (card.effect.kind === "skip-attack") {
      return true;
    }

    if (card.target === "all") {
      return true;
    }

    if (card.target === "incidents-testing") {
      return attack.targets.includes("incidents") || attack.targets.includes("testing");
    }

    if (card.target === "none") {
      return false;
    }

    return attack.targets.includes(card.target);
  }

  private shuffle(cards: Card[]): Card[] {
    const copy = [...cards];

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(this.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }

    return copy;
  }
}
