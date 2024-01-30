import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';
import { ClassConstructor } from 'class-transformer';

import { ResponseTemplate } from '@/dto/response';
import { APIConfig } from '@/types';

// declare fetcher ------------------------------------------
export type BuildRequestProps<TParamDto = unknown> = {
  apiConfig: APIConfig;
  params?: {
    query?: TParamDto;
    body?: TParamDto;
  };
  axios: AxiosInstance;
};

export type FetcherProps<TResData = unknown, TParamDto = unknown> = BuildRequestProps<TParamDto> & {
  dataResDto?: ClassConstructor<TResData>;
};

//-----------------------------------------------------------
// optional axios
export type OptionQuery<TResData, TParamDto> = Omit<FetcherProps<TResData, TParamDto>, 'axios'> & {
  axios?: AxiosInstance;
};

export type QueryRootProps<TResData, TParamDto> = OptionQuery<TResData, TParamDto> &
  Omit<UseQueryOptions<ResponseTemplate<TResData>>, 'queryKey' | 'onSettled'> & {
    onFinally?: (data: ResponseTemplate<TResData> | undefined, error: ResponseTemplate<TResData> | null) => void;
  };

export type MutationRootProps<TResData, TParamDto> = OptionQuery<TResData, TParamDto> &
  Omit<UseMutationOptions<ResponseTemplate<TResData>, ResponseTemplate<TResData>, TParamDto>, 'onSettled'> & {
    onFinally?: (
      data: ResponseTemplate<TResData> | undefined,
      error: ResponseTemplate<TResData> | null,
      variables: TParamDto | undefined
    ) => Promise<unknown> | unknown;
  };

//-----------------------------------------------------------

// Error code handle toast message

export const errorCommonHandler = ['USER_NOT_FOUND', 'POST_NOT_FOUND'];
