import React from 'react';

import { ChannelApi } from '../types';
import { useChannelStore } from '@/pages/store';
import { APP_ROUTES } from '@/constants';
import { useRouter } from 'next/router';
type Props = {
  element: ChannelApi;
};

const ChannelItem = (props: Props) => {
  const { element } = props;
  const setCurrentChannel = useChannelStore((store) => store.setCurrentChannel);
  const currentChannel = useChannelStore((store) => store.currentChannel);
  const router = useRouter();

  const selectChannel = () => {
    setCurrentChannel(element);
    router.push(APP_ROUTES.EDIT_CHANNEL + element.id);
  };
  return (
    <>
      <div></div>
      {element.name}
      <span>
        {' '}
        <button
          onClick={() => {
            selectChannel();
          }}
        >
          +
        </button>{' '}
      </span>
    </>
  );
};

export default ChannelItem;
