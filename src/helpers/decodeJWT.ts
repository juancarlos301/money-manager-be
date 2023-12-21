import { jwtDecode } from 'jwt-decode';
import { Request } from 'express';

import { UserType } from '../types';

export const decodeJWT = (req: Request) => {
  let decoded: UserType = {} as UserType;
  try {
    const { authorization } = req.headers;
    if (authorization) decoded = jwtDecode<UserType>(authorization);
  } catch {}

  return decoded;
};
