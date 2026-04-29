export type AuthProviderPlan = "directus_users" | "authjs" | "undecided";

export interface AuthPlanConfig {
  provider: AuthProviderPlan;
  studentAuthEnabled: boolean;
  notes: string;
}

export const authPlanConfig: AuthPlanConfig = {
  provider: "undecided",
  studentAuthEnabled: false,
  notes: "MVP placeholder only. Final decision in later phase.",
};
