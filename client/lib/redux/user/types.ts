import { UserStatus } from "../../../generated/graphql";

export interface UserState {
  isLoggedIn: boolean;
  discordId?: string;
  nickname?: string;
  tag?: string;
  avatar?: string;
  rating?: number;
  status?: UserStatus;
  money?: number;
  frozenMoney?: number;
}
