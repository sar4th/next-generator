import { dummySchema } from "../schemas/dummy-schema";
type SchemaRegistry = {
  dummyApi: typeof dummySchema;
};
type SchemaRegistryKey = keyof SchemaRegistry;
const schemaRegistry: SchemaRegistry = {
  dummyApi: dummySchema,
};

export const getSchema = (apiName: SchemaRegistryKey) =>
  schemaRegistry[apiName];
