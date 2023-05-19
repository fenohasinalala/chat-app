import React from 'react';
import ChannelItem from './ChannelItem';
import { ChannelApi } from '../types';

interface Props {
  Items: ChannelApi[];
}

const ChannelItemList = (props: Props) => {
  const { Items } = props;

  if (Items === null) {
    return <h1>null</h1>;
  }
  const show = Items.map((e) => <ChannelItem key={e?.id} element={e} />);
  return (
    <>
      <p>channels list</p>
      <button>add +</button>
      {Items ? show : null}
    </>
  );
};

export default ChannelItemList;
