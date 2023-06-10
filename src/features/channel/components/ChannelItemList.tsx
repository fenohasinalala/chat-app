import React from 'react';
import ChannelItem from './ChannelItem';
import { ChannelApi } from '../types';
import { useRouter } from 'next/router';
import { APP_ROUTES } from '@/constants';

interface Props {
  Items: ChannelApi[];
}

const ChannelItemList = (props: Props) => {
  const { Items } = props;
  const router = useRouter();
  if (Items === null) {
    return <h1>null</h1>;
  }
  const show = Items.map((e) => <ChannelItem key={e?.id} element={e} />);
  return (
    <>
      <p>channels list</p>
      <button
        onClick={() => {
          router.push(APP_ROUTES.CREATE_CHANNEL);
        }}
      >
        add +
      </button>
      {Items ? show : null}
    </>
  );
};

export default ChannelItemList;
