const basePath: string = "data.data.items";
const alternativeBasePath: string = "data.data";
const memoizedPaths: Record<string, string[]> = {};

/**
 * Retrieves the value at the specified path within an object.
 *
 * @param obj - The object to search within.
 * @param path - The path to the desired value, represented as a dot-separated string.
 * @returns The value at the specified path, or null if the path is invalid or the value does not exist.
 */
const getValueByPath = (obj: Record<string, any>, path: string): any => {
  if (!memoizedPaths[path]) {
    memoizedPaths[path] = path.split(".");
  }
  const parts: string[] = memoizedPaths[path];
  let value: any = obj;
  for (const part of parts) {
    value = value ? value[part] : null;
  }
  return value;
};

/**
 * Transforms the response data based on the provided schema.
 *
 * @param responseData - The response data to be transformed.
 * @param schema - The schema defining the transformation rules.
 * @throws {Error} If the base value is not an array.
 * @returns The transformed data as an array of objects.
 */
const transformData = (
  responseData: Record<string, any>,
  schema: { fields: { [key: string]: string } },
): Array<Record<string, any>> => {
  const { fields } = schema;

  // Attempt to get the base value using basePath
  let baseValue = getValueByPath(responseData, basePath);

  // If baseValue is null or undefined, try the alternativeBasePath
  if (!baseValue) {
    baseValue = getValueByPath(responseData, alternativeBasePath);
  }

  if (!baseValue) {
    throw new Error(
      `Base value is not found at paths: ${basePath} or ${alternativeBasePath}`,
    );
  }

  // If baseValue is not an array, wrap it in an array
  const items = Array.isArray(baseValue) ? baseValue : [baseValue];

  // Map over each item in the array and transform it using the schema
  const transformedData = items.map((item: Record<string, any>) => {
    const result: Record<string, any> = {};
    for (const key in fields) {
      result[key] = getValueByPath(item, fields[key]);
    }
    return result;
  });

  return transformedData;
};

export default transformData;
