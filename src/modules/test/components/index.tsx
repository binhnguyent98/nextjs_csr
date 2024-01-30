import { useState } from 'react';

import { CustomForm } from '@/components';
import { Element } from '@/components/custom';
import { NotificationType } from '@/constants';
import { withModal } from '@/hocs/withModal';
import { useForm } from '@/hooks/useForm';
import { useNotification } from '@/hooks/useNotification';
import { convertToOptionData } from '@/utilities/helper';

type Props = ComponentWithModal;

const Component = (props: Props) => {
  const { openModal } = props;

  const [type, setType] = useState<NotificationType>('success');
  const { control } = useForm();
  const { notification } = useNotification();

  const handleOpenModal = () => {
    openModal &&
      openModal({
        title: 'Test Abc',
      });
  };

  const typeNotification = [
    {
      label: 'success',
      value: 'success',
    },
    {
      label: 'info',
      value: 'info',
    },
    {
      label: 'warning',
      value: 'warning',
    },
    {
      label: 'error',
      value: 'error',
    },
  ];

  const optionSelect = [
    {
      id: 1,
      text: 'Test 001',
    },
    {
      id: 1,
      text: 'Test 002',
    },
  ];

  return (
    <div className="w-full mt-10 flex flex-col space-y-4">
      <div className="flex items-center justify-center space-x-4 w-full">
        <Element.Button type="primary">{'Button'}</Element.Button>
        <Element.Button type="outlined">{'Button'}</Element.Button>
        <Element.Button type="danger">{'Button'}</Element.Button>
      </div>
      <div className="w-[500px] mx-auto">
        <CustomForm.Control name="" label="Test" control={control} render={() => <Element.Input />} />
        <CustomForm.Control
          name=""
          label="Test"
          control={control}
          render={() => <Element.Select blankOption options={convertToOptionData(optionSelect, { label: 'text', value: 'id' })} />}
        />
      </div>
      <div className="flex items-center justify-center space-x-4 w-full">
        <Element.Select
          options={typeNotification}
          value={type}
          onChange={(e: NotificationType) => {
            setType(e);
          }}
        />
        <Element.Button type="primary" onClick={() => notification({ title: 'Test', type })}>
          {'Show notification'}
        </Element.Button>
      </div>
      <div className="flex items-center justify-center space-x-4 w-full">
        <Element.Button type="primary" onClick={handleOpenModal}>
          {'Show modal'}
        </Element.Button>
      </div>
    </div>
  );
};

export const Index = withModal<Props>(Component);
