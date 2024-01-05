import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { METHOD_API } from '@/constants';
import { convertDtoToTemplateDto, ResponseTemplate } from '@/dto/response';

import { BuildRequestProps, FetcherProps } from './declare';

export async function fetcher<TResData = unknown, TParamDto = unknown>(
  props: FetcherProps<TResData, TParamDto>
): Promise<ResponseTemplate<TResData>> {
  const { apiConfig, params, axios, dataResDto } = props;

  const fetch = await new Promise<ResponseTemplate>(async (resolve) => {
    if (apiConfig?.factoryData) {
      const factory = apiConfig?.factoryData as ResponseTemplate<TResData>;

      return setTimeout(() => {
        resolve(factory);
      }, 2000);
    }

    const request = buildRequest<TParamDto>({ apiConfig, axios, params });

    try {
      const response = await request();
      const { status, data } = response.data;

      resolve({ status, data });
    } catch (error) {
      const catchError = error as AxiosError<ResponseTemplate>;
      const errorRes = catchError.response;

      const result: ResponseTemplate = {
        status: false,
        error: errorRes?.data?.error,
      };

      resolve(result);
    }
  });

  return plainToInstance(convertDtoToTemplateDto<TResData>(dataResDto), fetch);
}

const buildRequest = <TParamDto = unknown>(
  props: BuildRequestProps<TParamDto> & { axios: AxiosInstance }
): (() => Promise<AxiosResponse<ResponseTemplate>>) => {
  const { axios, apiConfig, params } = props;
  const { method, url } = apiConfig;
  const idempotentMethod = [METHOD_API.POST, METHOD_API.PUT];

  const paramData = instanceToPlain(idempotentMethod.includes(method) ? params?.body : params?.query, { exposeDefaultValues: true });
  const formatParam = idempotentMethod.includes(method) ? paramData : { params, paramData };

  return () => axios[method](url, formatParam);
};
