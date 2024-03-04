import { Translate } from 'next-translate';

import { ParamFnProps, ResultParamFnProps } from '.';

const validateRequired = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.required_number', { field }) : '',
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

export const numberRules: Record<string, (props: ParamFnProps) => ResultParamFnProps> = {
  isRequired: validateRequired,
  isHalfSize: validateHalfSize,
};

declare module 'yup' {
  interface NumberSchema {
    isHalfSize(props?: ParamFnProps & { t: Translate }): this;
    isRequired(props?: ParamFnProps & { t: Translate }): this;
  }
}
