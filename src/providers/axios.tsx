import axios, { AxiosInstance, HttpStatusCode } from 'axios';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

import { useAuthenticate } from '@/hooks';
import { useSelector } from '@/store';
import { instanceToCamelCase } from '@/utilities/instance';

const AxiosContext = createContext<AxiosInstance>(undefined as any);

export const AxiosProvider = ({ children }: PropsWithChildren) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const token = useSelector((state) => state.auth.accessToken);
  const { onLogout, onRenewToken } = useAuthenticate();

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

    instance.interceptors.response.use(
      (response) => {
        return { ...response, data: instanceToCamelCase(response.data) };
      },
      async (error) => {
        const statusCode = error.response.status;

        if (statusCode === HttpStatusCode.Forbidden) {
          const accessToken = await onRenewToken();

          try {
            if (!!accessToken) {
              const originRequest = error;

              originRequest.config.headers.Authorization = `Bearer ${accessToken}`;

              return axios.request(originRequest.config);
            } else {
              throw new Error();
            }
          } catch (error) {
            onLogout();
          }
        }

        throw error;
      }
    );

    return instance;
  }, [token]);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
