import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm as useFormRoot, UseFormProps, UseFormReturn } from 'react-hook-form';
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
  }
): UseFormReturn<TFieldValues> => {
  const schema = props?.schema;

  const form = useFormRoot({
    ...props,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: createValidateSchema(schema),
  });

  return form;
};
