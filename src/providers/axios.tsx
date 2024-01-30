import axios, { AxiosInstance } from 'axios';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { useSelector } from '@/store';
import { instanceToCamelCase } from '@/utilities/instance';

const AxiosContext = createContext<AxiosInstance>(undefined as any);

export const AxiosProvider = ({ children }: PropsWithChildren) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = useSelector((state) => state.auth.accessToken);

  if (!baseURL) {
    throw new Error('Api url not found');
  }

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    instance.interceptors.request.use((config) => {
      const newConfig = { ...config };

      if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
      }

      return newConfig;
    });

    instance.interceptors.response.use((response) => {
      return { ...response, data: instanceToCamelCase(response.data) };
    });

    return instance;
  }, [token]);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
