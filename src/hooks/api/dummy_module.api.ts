import { ServiceEndPoints } from "@/config/app/service-endpoints";
import apiConfig from "@/config/services/api-config";
import transformData from "@/lib/api/adapters/dataTransformLayer";
import { getSchema } from "@/lib/api/adapters/schemaRegistry";
import { Api } from "@/lib/api/clients/http";
import { useQuery } from "@tanstack/react-query";
const dummyQueryKeys = {
  dummyApiKey: "dummyApiKey",
};
export const useGetDummyApi = (applicationID?: unknown, options?: any) => {
  const queryFn = async () => {
    const response = await Api.get(
      `${apiConfig.API_VERSION}/${ServiceEndPoints.dummyEndPoint}`,
    );
    const schema = getSchema("dummyApi");
    return transformData(response, schema);
  };

  return useQuery({
    queryKey: [dummyQueryKeys.dummyApiKey],
    queryFn,
    refetchOnWindowFocus: false,
  });
};
