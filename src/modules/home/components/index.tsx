import { ColumnsType } from 'antd/es/table';
import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { Element } from '@/components/custom';
import { PostResDto } from '@/dto/response';
import { useAuthenticate } from '@/hooks';
import { useDispatch } from '@/store';
import { authenticationAction } from '@/store/action';

import { Props } from '../declare';

const Component = (props: Props) => {
  const { t } = useTranslation();
  const { post } = props;
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');
  const { onLogout } = useAuthenticate();

  const handleSetToken = () => {
    token && dispatch(authenticationAction.setAuthentication({ accessToken: token }));
  };

  const columns: ColumnsType<PostResDto> = [
    {
      title: t('home:table.title'),
      dataIndex: 'title',
    },
    {
      title: t('home:table.category'),
      dataIndex: 'category',
    },
    {
      title: t('home:table.description'),
      dataIndex: 'description',
    },
  ];

  return (
    <div className="max-w-[500px] mx-auto mt-10">
      <Element.Button onClick={onLogout}>{'Logout'}</Element.Button>
      <div className="mt-10 flex space-x-4">
        <Element.Input value={token} onChange={(e) => setToken(e.target.value)} />
        <Element.Button onClick={handleSetToken}>{'Set token'}</Element.Button>
      </div>
      <div className="mt-10">
        <Element.Button onClick={() => post.onSearch()} className="mb-10">
          {'Get Post'}
        </Element.Button>
        <Element.Table columns={columns} dataSource={post?.data?.items || []} loading={post.isLoading} />
      </div>
    </div>
  );
};

export const Index = Component;
