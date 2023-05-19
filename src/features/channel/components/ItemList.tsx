import React from 'react';
import Item from './Item';
import { ChannelApi } from '../types';
import { User } from '@/features/user/types';

interface Props {
  Items: ChannelApi[] | (User | null)[];
}

const ItemList = (props: Props) => {
  const { Items } = props;

  console.log(Items);
  if (Items === null) {
    return <h1>null</h1>;
  }
  const show = Items.map((e) => {
    return <Item key={e?.id} element={e} />;
  });
  return <>{Items ? show : null}</>;
};

export default ItemList;
