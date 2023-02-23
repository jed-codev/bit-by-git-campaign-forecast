import { ObjectSchema } from "joi";
import { loadFiles } from "@graphql-tools/load-files";
import { DocumentNode } from "graphql";
import customResponse, { ICustomErrorCodes } from "./responses";

export const validateArgs = (validationSchema: ObjectSchema, payload) => {
  const validationResult = validationSchema.validate(payload, {
    abortEarly: false,
  });
  if (validationResult.error) {
    throw customResponse(
      ICustomErrorCodes.BAD_REQUEST,
      400,
      validationResult.error.message
    );
  }
};

export const loadTypeDefs = async () =>
  (await loadFiles("src/schema/*.schema.graphql")) as DocumentNode[];
