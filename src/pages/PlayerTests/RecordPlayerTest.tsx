import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SiVlcmediaplayer } from 'react-icons/si';
import { SessionTest, TestMetricsPayload } from './interface';
import { IoCloseOutline } from 'react-icons/io5';
import { Autocomplete } from '@mantine/core';
import { useGetAllPlayersBySiteQuery } from '../Players/redux/api';
import { Test } from '../tests/interface copy';
import { useCreatePlayerTestMutation } from './redux/api';

export default function RecordPlayerTest(props: {
  isOpen: boolean;
  onSuccess: () => void;
  siteId: string | null;
  sessionTest: SessionTest | null;
  onBack: () => void;
}) {
  const { isOpen, onSuccess, siteId, sessionTest, onBack } = props;
  const [filterValue, setfilterValue] = useState<string>('');
  const [isPlayerWrong, setisPlayerWrong] = useState<boolean>(false);
  const [selectedPlayerId, setselectedPlayerId] = useState<string | null>(null);
  const [onSubmit, { isLoading, isSuccess: SuccessAdd, reset: resetMutation }] =
    useCreatePlayerTestMutation();
  const {
    data: playersData,
    error: playersError,
    isLoading: isPlayersLoading,
    refetch: refetchPlayersBySite,
  } = useGetAllPlayersBySiteQuery(
    { siteId: siteId },
    { skip: !siteId }, // Skip fetching if no site is selected
  );

  const {
    register,
    handleSubmit,
    // setValue,
    // trigger,
    reset,
    formState: { errors },
  } = useForm();

  async function handleFormSubmit(data: any) {
    const selectedPlayer = playersData?.result.data.find(
      (player) => `${player.firstName} ${player.lastName}` === filterValue,
    );
    if (!selectedPlayer) {
      setisPlayerWrong(true);
      return;
    }
    setisPlayerWrong(false);
    const selectedPlayerId = selectedPlayer.id;
    if (selectedPlayerId && !isPlayerWrong) {
      await onSubmit({
        siteId: siteId || '',
        testId: sessionTest?.test.id || '',
        playerId: selectedPlayerId || '',
        TestMetricsPayload: data,
      });
    }
  }

  useEffect(() => {
    if (SuccessAdd) {
      setfilterValue('');
      reset();
      resetMutation();
    }
  }, [SuccessAdd, reset, resetMutation]);
  return (
    <div>
      <div className="relative p-4 w-full max-w-4xl max-h-full mx-auto">
        {/* <!-- Modal content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* <!-- Modal header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-theme-light dark:text-white">
              Record Player Test
            </h3>
            <p className="capitalize font-medium flex items-center gap-1 text-gray-500">
              <SiVlcmediaplayer />
              <span>{sessionTest?.test.name}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div className="col-span-2">
                <Autocomplete
                  placeholder="Select player"
                  value={filterValue}
                  error={isPlayerWrong}
                  onChange={setfilterValue}
                  data={playersData?.result.data.map(
                    (player) => `${player.firstName} ${player.lastName}`,
                  )}
                  styles={{
                    input: { width: '100%', padding: '20px' },
                    dropdown: { maxHeight: 200, overflowY: 'auto' },
                  }}
                  classNames={{
                    input:
                      'bg-white dark:bg-gray-800 text-black dark:text-theme-light', // Changes based on the mode
                    dropdown:
                      'text-black dark:text-theme-light dark:hover:text-blue-500',
                  }}
                />
              </div>
              {sessionTest?.test.requiredMetrics.map((metric, idx) => (
                <div key={idx}>
                  <label
                    htmlFor={metric}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                  >
                    {metric}
                  </label>
                  {metric === 'foot' ? (
                    <select
                      className="w-full rounded-lg border border-stroke bg-transparent p-2.5 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue=""
                      {...register(metric, {
                        required: {
                          value: true,
                          message: `${metric} is required`,
                        },
                      })}
                    >
                      <option value="" disabled defaultValue={''}>
                        Select Foot
                      </option>
                      <option value="LEFT">Left</option>
                      <option value="RIGHT">Right</option>
                    </select>
                  ) : (
                    <input
                      type="number"
                      id={metric}
                      {...register(metric, {
                        required: {
                          value: true,
                          message: `${metric} is required`,
                        },
                        setValueAs: (value) => Number(value),
                      })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  )}

                  {errors[metric] && (
                    <div className="text-red-500 text-sm capitalize">
                      {errors[metric]
                        ? `${errors[metric].message}`
                        : 'This field is required'}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-4">
              <button
                type="button"
                className="text-theme-light inline-flex items-center border border-theme-light hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-500 dark:text-white dark:hover:bg-theme-secondary"
                onClick={onBack}
              >
                Back
              </button>
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add
                {/* {isLoading ? 'Adding...' : 'Add'} */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
