import axios from 'axios';

import { instanceToCamelCase } from '@/utilities/instance';

export const axiosCustom = (baseURL?: string) => {
  const baseURLPath = process.env.NEXT_PUBLIC_API_URL ?? baseURL;

  const axiosClient = axios.create({
    baseURL: baseURLPath,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosClient.interceptors.response.use((response) => {
    return { ...response, data: instanceToCamelCase(response.data) };
  });

  return axiosClient;
};
