import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';
import { createChannelsAPI } from '../api';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { useChannelStore, useUserStore } from '@/pages/store';
import Select from 'react-select';
import { CreateChannel } from '../types';
import { useAllUsers } from '@/features/user/hooks/useAllUser';
import { useChannelFetchSelected } from '../hooks/useChannel';
import { createChannelSchema } from '../utils/schema';
type Props = {
  id?: number | null;
};
interface UserSelect {
  value: number;
  label: string;
}
const ChannelForm = (props: Props) => {
  const { id } = props;
  useChannelFetchSelected(id);
  const currentChannel = useChannelStore((store) => store.currentChannel);
  //console.log(currentChannel);

  useAllUsers();
  const allUsers = useUserStore((store) => store.allUsers);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, authenticated } = useAuth();
  const [usersSelect, setUserSelect] = useState<UserSelect[]>([]);
  useEffect(() => {
    const userSelectTemp: UserSelect[] = [];
    allUsers.forEach((e) => {
      userSelectTemp.push({ value: e.id, label: e.name });
    });
    setUserSelect(userSelectTemp);
  }, [allUsers]);

  const {
    reset,
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createChannelSchema),
  });

  useEffect(() => {
    let defaultUserList: UserSelect[];

    reset({
      channelName: id ? currentChannel?.name : '',
      type: id ? currentChannel?.type : 'public',
      members: [],
    });
  }, [reset]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>Create new channel</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form
            name="createChannelForm"
            onSubmit={handleSubmit((data) => {
              let IdList: number[] = [];
              data.members.length > 0 &&
                data.members.forEach((e) => {
                  IdList.push(e.value);
                });
              const newChannel: CreateChannel = {
                id: id ? id : null,
                name: data.channelName,
                type: data.type,
                members: IdList,
              };
              createChannelsAPI(newChannel);

              router.push(APP_ROUTES.PROFILE);
            })}
          >
            <label>name</label>
            <input
              {...register('channelName')}
              type="text"
              name="channelName"
            />
            {errors.channelName && <p>{errors.channelName.message}</p>}
            <label>type</label>
            <select {...register('type')} name="type">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}
            <Controller
              name={'members'} // for the gender field
              control={control} // obtained from the useForm hook
              render={({ field }) => {
                return (
                  <Select
                    isMulti
                    {...field}
                    options={...usersSelect}
                    placeholder="Add Members"
                  />
                );
              }}
            />
            <button type="submit" className="createChannelButton">
              Create Channel
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ChannelForm;
