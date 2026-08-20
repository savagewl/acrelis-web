
export interface TeamMember {
  role: string;
  name: string;
  tint: string;
}

export const TEAM_TINTS = ["#ff050a", "#7ca5aa", "#1e2f35"] as const;

export const TEAM_ROW_1: TeamMember[] = Array.from({ length: 6 }, (_, i) => ({
  role: "Технический директор",
  name: "Амир",
  tint: TEAM_TINTS[i % TEAM_TINTS.length],
}));

export const TEAM_ROW_2: TeamMember[] = Array.from({ length: 6 }, (_, i) => ({
  role: "Технический директор",
  name: "Амир",
  tint: TEAM_TINTS[(i + 1) % TEAM_TINTS.length],
}));
