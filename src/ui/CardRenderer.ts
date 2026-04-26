import { COLORS } from "../config";
import type { Card } from "../game/CardDeck";

export interface CardHitBox {
  cardId: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CardRenderOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  pointer?: { x: number; y: number };
}

export const getCardAt = (hitBoxes: CardHitBox[], x: number, y: number): string | undefined => {
  return hitBoxes.find((box) => (
    x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height
  ))?.cardId;
};

export const renderCards = (
  context: CanvasRenderingContext2D,
  cards: Card[],
  options: CardRenderOptions
): CardHitBox[] => {
  const gap = 10;
  const cardWidth = Math.max(76, Math.min(150, (options.width - gap * (cards.length - 1)) / Math.max(1, cards.length)));
  const cardHeight = options.height;
  const hitBoxes: CardHitBox[] = [];

  cards.forEach((card, index) => {
    const x = options.x + index * (cardWidth + gap);
    const isCoffee = card.id === "coffee-break";
    const hovered = options.pointer
      ? getCardAt([{ cardId: card.id, x, y: options.y, width: cardWidth, height: cardHeight }], options.pointer.x, options.pointer.y) === card.id
      : false;
    const y = hovered ? options.y - 8 : options.y;

    hitBoxes.push({ cardId: card.id, x, y, width: cardWidth, height: cardHeight });

    context.save();
    context.fillStyle = "#182033";
    context.strokeStyle = isCoffee ? "#8B4513" : COLORS.euBlue;
    context.lineWidth = isCoffee ? 3 : 1.5;
    context.fillRect(x, y, cardWidth, cardHeight);
    context.strokeRect(x, y, cardWidth, cardHeight);

    context.fillStyle = isCoffee ? "#c78b50" : COLORS.text;
    context.font = "700 12px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText(card.name, x + 8, y + 10, cardWidth - 16);

    context.fillStyle = COLORS.muted;
    context.font = "11px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.fillText(card.citation ?? "No citation. Just coffee.", x + 8, y + 34, cardWidth - 16);

    context.fillStyle = COLORS.text;
    context.font = "12px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
    context.fillText(card.description, x + 8, y + 58, cardWidth - 16);

    if (isCoffee) {
      context.font = "28px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI Emoji, sans-serif";
      context.textAlign = "center";
      context.fillText("☕", x + cardWidth / 2, y + cardHeight - 44);
    }

    context.restore();
  });

  return hitBoxes;
};
