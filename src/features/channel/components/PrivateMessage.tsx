import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createMessageSchema } from '../utils/schema';
import { Message, sendMessageToPM } from '../types';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { getPrivateMessage, sendMessageAPI } from '../api';
import { useEffect, useState } from 'react';
import { useChannelStore } from '@/pages/store';
import { useGetPrivateMessage } from '../hooks/useMessage';
import { getAllUsersAPI } from '@/features/user/api';
import { User } from '@/features/user/types';

interface Props {
  id: number;
}
export default function PrivateMessage(props: Props) {
  const { id } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const { user, authenticated } = useAuth();
  const [receiver, setReceiver] = useState<User | null>(null);
  useGetPrivateMessage(id);

  const setCurrentMessages = useChannelStore(
    (store) => store.setCurrentPrivateMessages
  );

  const currentMessages = useChannelStore(
    (store) => store.currentPrivateMessages
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createMessageSchema) });

  useEffect(() => {
    setTimeout(() => {
      setMessages(currentMessages);
    });
  }, [currentMessages]);

  if (!user) {
    return <div></div>;
  }
  console.log(receiver);

  return (
    <>
      <div>private message, with user id:{id}</div>

      <div>
        {messages.length > 0
          ? messages.map((e) => {
              return (
                <div key={e.id}>
                  <div>sender: {e.sender.name}</div>
                  <div>date: {String(e.createdAt)}</div>
                  <div>{e.content}</div>
                </div>
              );
            })
          : null}
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          const messageToSend: sendMessageToPM = {
            content: data.message,
            recipientId: id,
          };
          sendMessageAPI(messageToSend);
          getPrivateMessage(id).then((res) => setCurrentMessages(res));
        })}
      >
        <textarea
          {...register('message')}
          name="message"
          placeholder="send message here"
        ></textarea>
        <button type="submit" className="sendMessageButton">
          Send Message
        </button>
      </form>
    </>
  );
}
