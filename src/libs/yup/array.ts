import { ParamFnProps, ResultParamFnProps } from '.';

const validateRequired = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.required_ar', { field }) : '',
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

export const arRules: Record<string, (props: ParamFnProps) => ResultParamFnProps> = {
  isRequired: validateRequired,
  isHalfSize: validateHalfSize,
};
