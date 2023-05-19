import { User } from '@/features/user/types';
import React from 'react';

type Props = {
  element: User;
};

const UserItem = (props: Props) => {
  const { element } = props;

  return <div>{element.name}</div>;
};

export default UserItem;
