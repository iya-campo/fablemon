import { TYPE_CHART } from "@/constants/typeConstants"

export function getEffectiveness(
  attackType: string,
  defenseType: string
): number {
  return TYPE_CHART[attackType]?.[defenseType] ?? 1;
}

export function getDualTypeEffectiveness(
  attackType: string,
  defenseTypes: string[]
) {
  return defenseTypes.reduce(
    (multiplier, type) =>
      multiplier * getEffectiveness(type, attackType),
    1
  );
}

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}