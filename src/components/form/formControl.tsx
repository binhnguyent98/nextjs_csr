import { Form, FormItemProps } from 'antd';
import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

import { FormControlItem } from './components/formControlItem';
import { LayoutForm } from './components/layoutForm';

export enum LAYOUT_TYPE {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

type Classes = {
  classes?: {
    label?: string;
    item?: string;
  };
};

type ControlProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = ControllerProps<
  TFieldValues,
  TName
> &
  Pick<FormItemProps, 'colon' | 'required'> &
  Classes & {
    layout?: LAYOUT_TYPE;
    label?: React.ReactNode;
    children?: React.ReactElement;
    trim?: boolean;
  };

export const FormControl = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: ControlProps<TFieldValues, TName>
) => {
  const { label, required, classes, render, trim = true, ...rest } = props;
  const layout = props.layout ?? LAYOUT_TYPE.HORIZONTAL;
  const colon = props.colon ?? true;

  return (
    <Form.Item required={false} label={false} colon={false} className="mb-1">
      <LayoutForm label={label} layout={layout} colon={colon} required={required} className={classes?.label}>
        <Controller
          {...rest}
          render={({ field, fieldState, formState }) => {
            if (trim && typeof field.value === 'string') {
              field.onBlur = () => field.onChange(field.value.trim());
            }

            return <FormControlItem error={fieldState.error?.message}>{render({ field, fieldState, formState })}</FormControlItem>;
          }}
        />
      </LayoutForm>
    </Form.Item>
  );
};
