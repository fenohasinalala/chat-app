import ChannelForm from '@/features/channel/components/ChannelForm';
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

  console.log(`id: ${id}`);

  return <>{id ? <ChannelForm id={id} /> : null}</>;
};

export default EditChannel;
