import { ParamFnProps, ResultParamFnProps } from '.';

const validateRequired = (props: ParamFnProps): ResultParamFnProps => {
  const { t, field } = props;

  return {
    message: t ? t('validate:form.required_obj', { field }) : '',
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

export const objRules: Record<string, (props: ParamFnProps) => ResultParamFnProps> = {
  isRequired: validateRequired,
  isHalfSize: validateHalfSize,
};
