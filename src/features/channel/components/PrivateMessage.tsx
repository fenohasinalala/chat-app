import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { createMessageSchema } from '../utils/schema';
import { sendMessageToPM } from '../types';

interface Props {
  id: number;
}
export default function PrivateMessage(props: Props) {
  const { id } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(createMessageSchema) });
  console.log(id);
  return (
    <>
      <div>private message, id:{id}</div>
      <form
        onSubmit={handleSubmit((data) => {
          const messageToSend: sendMessageToPM = {
            content: data.message,
            recipientId: id,
          };
          console.log(messageToSend);
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
