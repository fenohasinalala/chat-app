import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';
import { addMembersChannelsAPI, createChannelsAPI } from '../api';
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
const ChannelEditForm = (props: Props) => {
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
      <h1>Add user to channel</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form
            name="editChannelForm"
            onSubmit={handleSubmit((data) => {
              let IdList: number[] = [];
              data.members.length > 0 &&
                data.members.forEach((e) => {
                  IdList.push(e.value);
                });

              if (id) {
                addMembersChannelsAPI(id, { members: IdList });
                router.push(APP_ROUTES.PROFILE);
              }
            })}
          >
            <label>name</label>
            <input
              {...register('channelName')}
              type="text"
              name="channelName"
              disabled={true}
            />
            {errors.channelName && <p>{errors.channelName.message}</p>}
            <label>type</label>
            <select {...register('type')} name="type" disabled={true}>
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
            <button type="submit" className="editChannelButton">
              Edit Channel
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default ChannelEditForm;
