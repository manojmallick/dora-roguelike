import { describe, expect, it } from "vitest";
import { CardDeck } from "../src/game/CardDeck";

const predictableRandom = (): number => 0;

describe("CardDeck", () => {
  it("contains a 20-card deck and draws an opening hand of 5", () => {
    const deck = new CardDeck(predictableRandom);

    const hand = deck.draw(5);

    expect(hand).toHaveLength(5);
    expect(deck.getHand()).toHaveLength(5);
    expect(deck.getDrawPileCount()).toBe(15);
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
    deck.draw(20);
    const counsel = deck.getHand().find((card) => card.id === "legal-counsel");

    expect(counsel).toBeDefined();
    expect(deck.doesCardCounter(counsel!, {
      type: "any",
      targets: ["ictrisk", "thirdparty", "reporting"]
    })).toBe(true);
  });

  it("Coffee Break does not counter attacks", () => {
    const deck = new CardDeck(predictableRandom);
    deck.draw(20);
    const coffee = deck.getHand().find((card) => card.id === "coffee-break");

    expect(coffee).toBeDefined();
    expect(deck.doesCardCounter(coffee!, {
      type: "any",
      targets: ["ictrisk"]
    })).toBe(false);
  });
});
