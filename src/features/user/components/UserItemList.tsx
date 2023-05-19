import React from 'react';
import UserItem from './UserItem';
import { User } from '@/features/user/types';

interface Props {
  Items: User[];
}

const UserItemList = (props: Props) => {
  const { Items } = props;

  if (Items === null) {
    return <h1>null</h1>;
  }
  const show = Items.map((e) => <UserItem key={e?.id} element={e} />);
  return <>{Items ? show : null}</>;
};

export default UserItemList;
