import { AxiosInstance } from 'axios';

import { ResponseTemplate } from '@/dto/response';
import { EndPointConfig } from '@/types';

//-----------------------------------------------------------

type ResultType = 'error' | 'success';
export type CallBackProps<TResDto = unknown, TParamDto = unknown> = {
  type: ResultType;
  data?: ResponseTemplate<TResDto>;
  param?: TParamDto;
};

// Error code handle toast message

export const errorCommonHandler = ['USER_NOT_FOUND', 'POST_NOT_FOUND'];

// Fetcher
export type RequestProps<TParamDto = unknown, TResDto = unknown> = {
  apiConfig: EndPointConfig<TResDto>;
  param?: TParamDto;
  axios: AxiosInstance;
};

//Extend RequestProps - optional axios
export type OptionQueryRequestProps<TParamDto = unknown, TResDto = unknown> = Omit<RequestProps<TParamDto, TResDto>, 'axios'> & {
  axios?: AxiosInstance;
};

//
type OptionProps<TResDto = unknown, TParamDto = unknown> = {
  enabled?: boolean;
  onFinally?: (props: CallBackProps<TResDto, TParamDto>) => void;
};

//UseQueryProps
export type UseQueryProps<TResDto, TParamDto = unknown> = OptionQueryRequestProps<TParamDto, TResDto> & OptionProps<TResDto, TParamDto>;

//UseActionProps
export type UseActionProps<TParamDto = unknown, TResDto = unknown> = OptionQueryRequestProps<TParamDto, TResDto> & OptionProps<TResDto, TParamDto>;
