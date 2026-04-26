export type DebugAction = "next-round" | "force-boss" | "force-victory" | "force-defeat";

const KEY_ACTIONS: Record<string, DebugAction> = {
  n: "next-round",
  b: "force-boss",
  v: "force-victory",
  f: "force-defeat"
};

export const getDebugActionForKey = (key: string): DebugAction | undefined => {
  return KEY_ACTIONS[key.toLowerCase()];
};
