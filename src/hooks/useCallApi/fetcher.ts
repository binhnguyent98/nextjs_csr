import { AxiosError, AxiosResponse } from 'axios';
import { instanceToPlain, plainToInstance } from 'class-transformer';

import { METHOD_API } from '@/constants';
import { convertDtoToTemplateDto, ResponseTemplate } from '@/dto/response';

import { RequestProps } from './declare';

export async function fetcher<TParamDto = unknown, TResDto = unknown>(props: RequestProps<TParamDto, TResDto>): Promise<ResponseTemplate<TResDto>> {
  const { apiConfig } = props;

  const fetch = await new Promise<ResponseTemplate>(async (resolve) => {
    if (apiConfig?.factoryData) {
      const factory = apiConfig?.factoryData as ResponseTemplate<TResDto>;

      return setTimeout(() => {
        resolve(factory);
      }, 2000);
    }

    const request = buildRequest<TParamDto>(props);

    try {
      const response = await request;
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

  return plainToInstance(convertDtoToTemplateDto<TResDto>(apiConfig?.dataResDto), fetch);
}

const buildRequest = <TParamDto = unknown, TResDto = unknown>(props: RequestProps<TParamDto, TResDto>): Promise<AxiosResponse<ResponseTemplate>> => {
  const { axios, apiConfig, param } = props;
  const { method, url } = apiConfig;
  const idempotentMethod = [METHOD_API.POST, METHOD_API.PUT];

  const paramData = instanceToPlain(param, { exposeDefaultValues: true });
  const formatParam = idempotentMethod.includes(method) ? paramData : { params: paramData };

  return axios[method](url, formatParam);
};
