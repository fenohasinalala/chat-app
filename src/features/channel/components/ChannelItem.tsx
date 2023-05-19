import React from 'react';

import { ChannelApi } from '../types';
type Props = {
  element: ChannelApi;
};

const ChannelItem = (props: Props) => {
  const { element } = props;

  return <div>{element.name}</div>;
};

export default ChannelItem;
