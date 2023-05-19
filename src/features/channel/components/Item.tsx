import React from 'react';

import { ChannelApi } from '../types';
type Props = {
  element: any;
};

const Item = (props: Props) => {
  const { element } = props;

  console.log('element');
  return <div>{element.name}</div>;
};

export default Item;
