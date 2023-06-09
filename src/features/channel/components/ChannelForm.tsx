import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';
import { createChannelSchema } from '@/features/user/utils/schemas';
import { createChannelsAPI } from '../api';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { useChannelStore, useUserStore } from '@/pages/store';
import Select from 'react-select';
import { CreateChannel } from '../types';
import { useAllUsers } from '@/features/user/hooks/useAllUser';
import { useChannelFetchSelected } from '../hooks/useChannel';
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
  console.log(currentChannel);

  useAllUsers();
  const allUsers = useUserStore((store) => store.allUsers);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, authenticated } = useAuth();
  const [usersSelect, setUserSelect] = useState<UserSelect[]>([]);
  useEffect(() => {
    const txt: string = 'fdfd';
    const userSelectTemp: UserSelect[] = [];
    allUsers.forEach((e) => {
      userSelectTemp.push({ value: e.id, label: e.name });
    });
    setUserSelect(userSelectTemp);
  }, [allUsers]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: id ? {} : {},
    resolver: yupResolver(createChannelSchema),
  });

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
                name: data.channelName,
                type: data.type,
                members: IdList,
              };
              console.log(newChannel);

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
                    placeholder="users to add"
                  />
                );
              }}
            />
            <button type="submit">Create</button>
          </form>
        </>
      )}
    </>
  );
};

export default ChannelForm;
