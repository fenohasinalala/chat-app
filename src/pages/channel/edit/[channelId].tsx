import ChannelEditForm from '@/features/channel/components/ChannelEditForm';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

type Props = {};

const EditChannel = (props: Props) => {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  useEffect(() => {
    if (typeof router.query.channelId === 'string') {
      setId(Number(router.query.channelId));
    }
  }, [router.query.channelId]);

  return <>{id ? <ChannelEditForm id={id} /> : null}</>;
};

export default EditChannel;
