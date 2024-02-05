/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, UseMutationResult, useQuery as useQueryRoot, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ResponseTemplate } from '@/dto/response';
import { useAxios } from '@/providers/axios';

import { UseActionProps, UseQueryProps } from './declare';
import { fetcher } from './fetcher';

export const useQuery = <TResDto, TParamDto = unknown>(props: UseQueryProps<TResDto, TParamDto>): UseQueryResult<ResponseTemplate<TResDto>> => {
  const { apiConfig, param, axios, onFinally, ...rest } = props;
  const axiosClient = axios ?? useAxios();

  const queryKey = useMemo(() => {
    return [...(apiConfig.key || []), JSON.stringify(param)] as unknown[];
  }, [apiConfig, param]);

  const queryResult = useQueryRoot<ResponseTemplate<TResDto>>({
    queryKey,
    queryFn: () => fetcher<TParamDto, TResDto>({ apiConfig, param, axios: axiosClient }),
    refetchOnWindowFocus: false,
    onSettled(data) {
      if (onFinally) {
        onFinally({ type: data?.status ? 'success' : 'error', data, param });
      }
    },
    ...rest,
  });

  return queryResult;
};

export const useAction = <TParamDto = unknown, TResDto = unknown>(
  props: UseActionProps<TParamDto, TResDto>
): UseMutationResult<ResponseTemplate<TResDto>, ResponseTemplate<TResDto>, TParamDto> => {
  const { apiConfig, axios, onFinally, ...rest } = props;
  const axiosClient = axios ?? useAxios();

  const action = useMutation<ResponseTemplate<TResDto>, ResponseTemplate<TResDto>, TParamDto>({
    mutationFn: (data: TParamDto) => {
      return fetcher<TParamDto, TResDto>({ apiConfig, param: data, axios: axiosClient });
    },
    ...rest,
    onSettled(data, error, variables) {
      if (onFinally) {
        onFinally({ type: data?.status ? 'success' : 'error', data: data as ResponseTemplate<TResDto>, param: variables });
      }
    },
  });

  return action;
};
