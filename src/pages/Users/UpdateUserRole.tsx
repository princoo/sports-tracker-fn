import { Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { useChangeUserRoleMutation, useGetRolesQuery } from './redux/api';

interface FormData {
  roleId: string;
}
export default function UpdateUserRole(props: {
  isOpen: boolean;
  userId: string | null;
  onClose: () => void;
  onSuccess: () => void
}) {
  const { isOpen, userId, onClose, onSuccess } = props;
  const [onSubmit, { isLoading: updateLoading }] =
    useChangeUserRoleMutation();
  const { data: roles } = useGetRolesQuery();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  async function handleFormSubmit(data: FormData) {
    await onSubmit({ userId, roleId: data.roleId });
    onSuccess()
    onClose()
  }
  return (
    <>
      <Modal opened={isOpen} onClose={onClose} title="Edit Role" centered>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <label className="mb-2.5 block font-medium text-black">
              Roles
            </label>
            <div className="relative">
              <select
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:focus:border-primary"
                defaultValue=""
                {...register('roleId', {
                  required: {
                    value: true,
                    message: 'role is required',
                  },
                })}
              >
                {roles?.result.data.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.roleName}
                  </option>
                ))}
              </select>
            </div>
            {errors.roleId && (
              <div className="text-red-500">{errors.roleId.message}</div>
            )}
          </div>
          <div className="my-5 flex justify-end gap-4">
          <button type="button" className=" bg-gray-200 px-5 rounded-lg" onClick={onClose}>Cancel</button>
            <input
              type="submit"
              value={updateLoading ? 'Loading...' : 'Change'}
              className="px-6 cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
              disabled={updateLoading}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}
