import { METHOD_API } from '@/constants';
import { VerifyAccountReqDto } from '@/dto/request/verifyAccount';
import { AuthResDto, RenewTokenResDto } from '@/dto/response';
import { EndPointConfig } from '@/types';

export const login: EndPointConfig<AuthResDto> = {
  method: METHOD_API.POST,
  dataResDto: AuthResDto,
  url: '/auth/login',
  key: ['auth-login'],
};

export const register: EndPointConfig<AuthResDto> = {
  method: METHOD_API.POST,
  url: '/auth/register',
  key: ['auth-register'],
};

export const renewToken: EndPointConfig<RenewTokenResDto> = {
  method: METHOD_API.POST,
  dataResDto: RenewTokenResDto,
  url: '/auth/renewToken',
  key: ['auth-renewToken'],
};

export const verifyAccount: EndPointConfig<VerifyAccountReqDto> = {
  method: METHOD_API.POST,
  dataResDto: VerifyAccountReqDto,
  url: '/auth/verify',
  key: ['auth-verify'],
};
