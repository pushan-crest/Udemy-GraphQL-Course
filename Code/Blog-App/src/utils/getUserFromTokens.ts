import { JWT_Signature } from "../resolvers/mutations/key";
import JWT from "jsonwebtoken";

export const getUserFromToken = (token: string) => {
  try {
    return JWT.verify(token, JWT_Signature) as {
      userId: number;
    };
  } catch (error) {
    return null;
  }
};
