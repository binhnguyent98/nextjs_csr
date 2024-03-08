import { yupResolver } from '@hookform/resolvers/yup';
import { FieldPath, FieldValues, RegisterOptions, useForm as useFormRoot, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

const createValidateSchema = (schema?: Yup.AnyObjectSchema) => {
  if (!schema) {
    return undefined;
  }

  return yupResolver(schema);
};

export const useForm = <TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues> & {
    schema?: Yup.ObjectSchema<FieldValues>;
    clearError?: () => void;
  }
): UseFormReturn<TFieldValues> => {
  const schema = props?.schema;
  const clearError = props?.clearError;

  const form = useFormRoot({
    ...props,
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: createValidateSchema(schema),
  });

  const { control, ...rest } = form;

  const register = <TFieldName extends FieldPath<TFieldValues>>(name: TFieldName, options?: RegisterOptions<TFieldValues, TFieldName>) => {
    const { onChange: onChangeCustom, ...rest } = control.register(name, options as RegisterOptions);

    return {
      ...rest,
      onChange: (event: { target: any; type?: any }) => {
        clearError && clearError();

        return onChangeCustom(event);
      },
    };
  };

  return { ...rest, control: { ...control, register } };
};
