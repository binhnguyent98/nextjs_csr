import { Translate } from 'next-translate';

import { PATTERN_REGEX_EMAIL } from '@/constants/regex';

import { ParamFnProps, ResultParamFnProps } from '.';

const validateRequired = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.required_str', { field }) : '',
    callBack: (value) => !!value,
  };
};

const validateHalfSize = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.is_half_size', { field }) : '',
    callBack: (value) => !!value,
  };
};

const validateEmail = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.is_email', { field }) : '',
    callBack: (value) => PATTERN_REGEX_EMAIL.test(String(value)),
  };
};

export const strRules: Record<string, (props: ParamFnProps) => ResultParamFnProps> = {
  isRequired: validateRequired,
  isHalfSize: validateHalfSize,
  isEmailCustom: validateEmail,
};

declare module 'yup' {
  interface StringSchema {
    isHalfSize(props?: ParamFnProps & { t: Translate }): this;
    isRequired(props?: ParamFnProps & { t: Translate }): this;
    isEmailCustom(props?: ParamFnProps & { t: Translate }): this;
  }
}
