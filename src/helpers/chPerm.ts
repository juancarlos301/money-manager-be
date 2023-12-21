import { UserType } from '../types';

type ChPermParamsType = (profile: string[], currentUser: UserType, strict?: boolean) => boolean;

export const chPerm: ChPermParamsType = (profile, currentUser, strict = false) => {
  if (currentUser && currentUser.role) {
    return profile.includes(currentUser.role)
      ? true
      : currentUser.role.includes('superadmin') && !strict;
  }
  return false;
};
