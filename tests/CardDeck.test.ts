import { describe, expect, it } from "vitest";
import { CardDeck, getCardDefinitions } from "../src/game/CardDeck";

const predictableRandom = (): number => 0;

describe("CardDeck", () => {
  it("contains a 30-card deck and draws an opening hand of 5", () => {
    const deck = new CardDeck(predictableRandom);

    const hand = deck.draw(5);

    expect(hand).toHaveLength(5);
    expect(deck.getHand()).toHaveLength(5);
    expect(deck.getDrawPileCount()).toBe(25);
  });

  it("plays a card from hand into discard", () => {
    const deck = new CardDeck(predictableRandom);
    const [card] = deck.draw(1);

    const played = deck.play(card.id);

    expect(played?.id).toBe(card.id);
    expect(deck.getHand()).toHaveLength(0);
    expect(deck.getDiscardPileCount()).toBe(1);
  });

  it("Coffee Break draws exactly 2 extra cards", () => {
    const deck = new CardDeck(() => 0.99);
    deck.draw(9);
    const coffee = deck.getHand().find((card) => card.id === "coffee-break");

    expect(coffee).toBeDefined();

    const handSizeBefore = deck.getHand().length;
    deck.play(coffee!.id);

    expect(deck.getHand()).toHaveLength(handSizeBefore + 1);
  });

  it("Legal Counsel counters any attack", () => {
    const deck = new CardDeck(predictableRandom);
    deck.draw(30);
    const counsel = deck.getHand().find((card) => card.id === "legal-counsel");

    expect(counsel).toBeDefined();
    expect(deck.doesCardCounter(counsel!, {
      type: "any",
      targets: ["ictrisk", "thirdparty", "reporting"]
    })).toBe(true);
  });

  it("Coffee Break does not counter attacks", () => {
    const deck = new CardDeck(predictableRandom);
    deck.draw(30);
    const coffee = deck.getHand().find((card) => card.id === "coffee-break");

    expect(coffee).toBeDefined();
    expect(deck.doesCardCounter(coffee!, {
      type: "any",
      targets: ["ictrisk"]
    })).toBe(false);
  });

  it("adds one NIS2 Article 21 card for each mandatory control family", () => {
    const nis2Cards = getCardDefinitions().filter((card) => card.id.startsWith("nis2-"));

    expect(nis2Cards).toHaveLength(11);
    expect(nis2Cards.map((card) => card.citation)).toEqual(expect.arrayContaining([
      "NIS2 Article 21",
      "NIS2 Article 21(2)(a)",
      "NIS2 Article 21(2)(b)",
      "NIS2 Article 21(2)(c)",
      "NIS2 Article 21(2)(d)",
      "NIS2 Article 21(2)(e)",
      "NIS2 Article 21(2)(f)",
      "NIS2 Article 21(2)(g)",
      "NIS2 Article 21(2)(h)",
      "NIS2 Article 21(2)(i)",
      "NIS2 Article 21(2)(j)"
    ]));
  });

  it("NIS2 MFA and secure communications card counters incident or testing attacks", () => {
    const mfaCard = getCardDefinitions().find((card) => card.id === "nis2-mfa-secure-comms");
    const deck = new CardDeck(predictableRandom);

    expect(mfaCard).toBeDefined();
    expect(deck.doesCardCounter(mfaCard!, {
      type: "security",
      targets: ["testing"]
    })).toBe(true);
  });
});
