export type GameMode = "solo" | "coop";
export type CoopRole = "combined" | "cards" | "board";

export interface CoopView {
  mode: GameMode;
  role: CoopRole;
}

export const parseCoopView = (search: string): CoopView => {
  const params = new URLSearchParams(search);
  const mode: GameMode = params.get("mode") === "coop" ? "coop" : "solo";

  if (mode === "solo") {
    return { mode, role: "combined" };
  }

  const role = params.get("role");

  if (role === "cards" || role === "board") {
    return { mode, role };
  }

  return { mode, role: "combined" };
};

export const shouldShowCards = (view: CoopView): boolean => {
  return view.role !== "board";
};

export const shouldShowAuditIntel = (view: CoopView): boolean => {
  return view.role !== "cards";
};

export const getCoopRoleLabel = (view: CoopView): string => {
  if (view.mode === "solo") {
    return "";
  }

  if (view.role === "cards") {
    return "CO-OP PLAYER 1: CARD HAND";
  }

  if (view.role === "board") {
    return "CO-OP PLAYER 2: BOARD + REGULATOR INTENT";
  }

  return "CO-OP COMBINED VIEW";
};
