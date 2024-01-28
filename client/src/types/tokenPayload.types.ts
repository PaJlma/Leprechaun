export type TTokenPayload<T> = T & {
  iat: number;
  exp: number;
}
