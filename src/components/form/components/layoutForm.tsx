import clsx from 'clsx';

import { LAYOUT_TYPE } from '../formControl';

type LayoutFormProps = {
  label?: React.ReactNode;
  layout?: LAYOUT_TYPE;
  colon?: boolean;
  required?: boolean;
  children?: React.ReactElement;
  className?: string;
};

export const LayoutForm = (props: LayoutFormProps) => {
  const { label, layout, required, colon, children, className } = props;

  if (!label) {
    return children;
  }

  if (layout === LAYOUT_TYPE.HORIZONTAL) {
    return (
      <div className="flex">
        <LabelFormControl label={label} colon={colon} required={required} className={clsx('w-full max-w-20 pt-1', className)} />
        <div className="ml-2 w-full">{children}</div>
      </div>
    );
  }

  if (layout === LAYOUT_TYPE.VERTICAL) {
    return (
      <div className="flex flex-col">
        <LabelFormControl label={label} colon={false} required={required} className={clsx(className, '!max-w-full')} />
        <div className="mt-2 w-full">{children}</div>
      </div>
    );
  }
};

export const LabelFormControl = (props: LayoutFormProps & { className?: string }) => {
  const { label, colon, required, className } = props;

  return (
    <div className={clsx('flex justify-between break-all', className)}>
      <div className="flex">
        {label}
        {required && <span className="ml-1 text-error">{'*'}</span>}
      </div>
      {colon && <span className="ml-2">{':'}</span>}
    </div>
  );
};
