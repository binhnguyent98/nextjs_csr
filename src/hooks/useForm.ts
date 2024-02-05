import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm as useFormRoot, UseFormProps, UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

export const useForm = <TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues> & {
    schema: Yup.ObjectSchema<object, Partial<Record<keyof TFieldValues, Yup.AnySchema>>, object, ''>;
  }
): UseFormReturn<TFieldValues> => {
  const schema = props?.schema;
  const resolver: any = schema ? yupResolver(schema) : undefined;

  const form = useFormRoot({
    ...props,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: resolver,
  });

  return form;
};
