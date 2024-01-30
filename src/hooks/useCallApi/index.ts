/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, UseMutationResult, useQuery as useQueryRoot, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ResponseTemplate } from '@/dto/response';
import { useAxios } from '@/providers/axios';

import { FetcherProps, MutationRootProps, QueryRootProps } from './declare';
import { fetcher } from './fetcher';

export const buildQueryFn = <TResData = unknown, TParamDto = unknown>(
  props: FetcherProps<TResData, TParamDto>
): Promise<ResponseTemplate<TResData>> => {
  return fetcher<TResData, TParamDto>({ ...props });
};

export const useQuery = <TResData, TParamDto>(props: QueryRootProps<TResData, TParamDto>): UseQueryResult<ResponseTemplate<TResData>> => {
  const { apiConfig, params, axios, dataResDto, onError, onFinally, ...rest } = props;
  const axiosClient = axios ?? useAxios();

  const queryKey = useMemo(() => {
    return [...(apiConfig.key || []), JSON.stringify(params)] as unknown[];
  }, [apiConfig, params]);

  const queryResult = useQueryRoot<ResponseTemplate<TResData>>({
    queryKey,
    queryFn: () => buildQueryFn<TResData, TParamDto>({ apiConfig, params, axios: axiosClient, dataResDto }),
    refetchOnWindowFocus: false,
    ...rest,
  });

  const { data } = queryResult;

  if (!data?.status) {
    onError && onError(data);
  }

  data && onFinally && onFinally(data, data);

  return queryResult;
};

export const useAction = <TParamDto, TResData = unknown>(
  props: MutationRootProps<TResData, TParamDto>
): UseMutationResult<ResponseTemplate<TResData>, ResponseTemplate<TResData>, TParamDto> => {
  const { apiConfig, axios, dataResDto, onError, onFinally, ...rest } = props;
  const axiosClient = axios ?? useAxios();

  const action = useMutation<ResponseTemplate<TResData>, ResponseTemplate<TResData>, TParamDto>({
    mutationFn: (data: TParamDto) => {
      return buildQueryFn<TResData, TParamDto>({ apiConfig, params: { body: data }, axios: axiosClient, dataResDto });
    },
    ...rest,
  });

  const { data, variables } = action;

  if (data && !data?.status) {
    onError && onError(data, variables as TParamDto, undefined);
  }

  data && onFinally && onFinally(data, data, variables);

  return action;
};
