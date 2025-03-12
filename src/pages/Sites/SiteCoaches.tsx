import { FaUserTie } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import Modal from '../../components/Modal';
import { SiteCoach } from './interface';
import { useEffect, useState } from 'react';
import countryList from 'react-select-country-list';
import { Autocomplete } from '@mantine/core';
import {
  useAddCoachOnSiteMutation,
  useGetFreeCoachesQuery,
  useRemoveCoachMutation,
} from './redux/api';
import toast from 'react-hot-toast';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModel';

export default function SiteCoaches(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  coaches: SiteCoach[];
  siteId: string;
}) {
  const {
    data: freeCoaches,
    isLoading,
    refetch: refetchFreeCoaches,
  } = useGetFreeCoachesQuery();
  const [onSubmit, { isSuccess: addCoachSuccess }] =
    useAddCoachOnSiteMutation();
  const [removeCoach] = useRemoveCoachMutation();
  const { isOpen, onClose, onSuccess, coaches, siteId } = props;
  const [siteCoaches, setsiteCoaches] = useState<SiteCoach[]>([]);
  const [isAddCoachOpen, setisAddCoachOpen] = useState<boolean>(false);
  const [isRemoveCoachOpen, setisRemoveCoachOpen] = useState<boolean>(false);
  const [coachId, setcoachId] = useState<string | null>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    setsiteCoaches(coaches);
  }, [coaches]);

  useEffect(() => {
    if (addCoachSuccess) {
      setisAddCoachOpen(false);
      setcoachId(null);
      setValue('');
      refetchFreeCoaches();
      onSuccess();
      onClose();
    }
  }, [addCoachSuccess]);

  const handleModalClose = () => {
    setisAddCoachOpen(false);
    setcoachId(null);
    setValue('');
    onClose();
  };

  const handleSelect = async () => {
    const selectedCoach = freeCoaches?.result.data.find(
      (coach) =>
        `${coach.profile.firstName} ${coach.profile.lastName}` === value,
    );
    if (selectedCoach) {
      setcoachId(selectedCoach.id);
      await onSubmit({
        siteId,
        userId: selectedCoach.id,
      });
    } else {
      toast.error('Please select the correct name of coach');
    }
  };
  const handleCoachRemove = async () => {
    setisRemoveCoachOpen(false);
    if (coachId) {
      toast.promise(
        removeCoach({ userId: coachId })
          .unwrap()
          .then(() => {
            setsiteCoaches((prevCoaches) =>
              prevCoaches.filter((coach) => coach.user.id !== coachId),
            );
            setcoachId(null);
            refetchFreeCoaches();
            onSuccess();
          }),
        {
          loading: 'Deleting site...',
          success: 'Coach removede',
          error: (error) =>
            error.data.message || 'Failed to remove coach. Please try again.',
        },
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      <div className=" bg-white p-2 dark:bg-gray-800">
        <div className="flex md:justify-between md:items-center justify-start mb-4 md:flex-row flex-col">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white flex items-center mb-5 md:mb-0 ">
            <FaUserTie />
            <span className="ml-1">Coaches</span>
          </h5>

          <button
            type="button"
            id="createProductModalButton"
            data-modal-target="createProductModal"
            data-modal-toggle="createProductModal"
            onClick={() => setisAddCoachOpen(true)}
            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-blue-500 focus:outline-none bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-700 dark:bg-blue-800 dark:text-white dark:border-blue-600 dark:hover:text-blue-400 dark:hover:bg-blue-700"
          >
            <FaPlus />
            Add coach
          </button>
        </div>
        <div className="flow-root">
          {isAddCoachOpen && (
            <div className="flex flex-col gap-2">
              <Autocomplete
                label="Select coach"
                placeholder="Coach name"
                value={value}
                onChange={setValue}
                data={freeCoaches?.result.data.map(
                  (coach) =>
                    `${coach.profile.firstName} ${coach.profile.lastName}`,
                )}
              />
              {freeCoaches?.result.data.length === 0 ? (
                <span className="text-red-500 text-xs">
                  No free coaches available
                </span>
              ) : (
                <button
                  type="submit"
                  className=" text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleSelect}
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              )}
            </div>
          )}
          {siteCoaches.length !== 0 ? (
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {siteCoaches.map((coach) => (
                <li key={coach.user.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaUserTie className="w-8 h-8 rounded-full bg-gray-300 p-1" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <span>
                          {coach.user.profile.firstName} &nbsp;
                          {coach.user.profile.lastName}
                        </span>
                        <span className="text-gray-500 font-semibold ml-1 text-xs">
                          {`${countryList().getValue(
                            coach.user.profile.nationality,
                          )}`}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {coach.user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setisRemoveCoachOpen(true);
                        setcoachId(coach.user.id);
                      }}
                      className="btn btn-danger py-1 px-3 text-red-500 rounded-lg hover:text-red-400 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white mt-5 ">
              No coaches to this site yet
            </p>
          )}
        </div>
      </div>
      {/* <!-- Delete model --> */}
      <ConfirmDeleteModal
        isOpen={isRemoveCoachOpen}
        onClose={() => setisRemoveCoachOpen(false)}
        action="Remove"
        asset="Coach"
        onConfirm={handleCoachRemove}
      />
    </Modal>
  );
}
