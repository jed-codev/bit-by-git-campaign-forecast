import { GraphQLError } from "graphql";

export enum ICustomErrorCodes {
  UNAUTHORIZED = "UNAUTHORIZED",
  BAD_REQUEST = "BAD_REQUEST",
}

export default (
  code: ICustomErrorCodes,
  status: number,
  message: string,
  metadata?: object
): GraphQLError => {
  return new GraphQLError(message, {
    extensions: {
      code,
      http: { status },
      metadata,
    },
  });
};
