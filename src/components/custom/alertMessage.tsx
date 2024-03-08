import { Alert, AlertProps } from 'antd';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import style from '@/styles/components/element/alert-message.module.scss';

export type AlertMessageProps = AlertProps;

export const AlertMessage = (props: AlertMessageProps) => {
  const { className, type } = props;

  return (
    <AnimatePresence mode="wait">
      {!!props?.message && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.2 }}>
          <Alert {...props} type={type ?? 'success'} className={clsx(style['alert-message'], className)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
