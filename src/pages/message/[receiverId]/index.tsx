import PrivateMessage from '@/features/channel/components/PrivateMessage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Props {}
export default function PrivateMessagePage(props: Props) {
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof router.query.receiverId === 'string') {
      setId(Number(router.query.receiverId));
    }
  }, [router.query.receiverId]);

  return <>{id ? <PrivateMessage id={id} /> : null}</>;
}
