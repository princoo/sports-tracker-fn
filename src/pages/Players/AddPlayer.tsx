// import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EducationLevel, FootballPosition, PlayerPayload } from './interface';
import { useCreatePlayerMutation } from './redux/api';
import Modal from '../../components/Modal';
import countryList from 'react-select-country-list';
import { MultiSelect } from '@mantine/core';

export default function AddPlayer(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  siteId: string;
}) {
  const { isOpen, onClose, onSuccess, siteId } = props;
  const [onSubmit, { isLoading, isSuccess: SuccessAdd, reset: resetMutation }] =
    useCreatePlayerMutation();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const countryOptions = useMemo(() => countryList().getData(), []);
  const PositionOptions = Object.values(FootballPosition);
  const academicOptions = Object.values(EducationLevel);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<PlayerPayload>();

  async function handleFormSubmit(data: PlayerPayload) {
    await onSubmit({ siteId, PlayerPayload: data });
  }
  useEffect(() => {
    if (SuccessAdd) {
      onSuccess();
      onClose();
      resetMutation();
    }
  }, [SuccessAdd, onClose, onSuccess]);

  const footOptions = ['RIGHT', 'LEFT', 'BOTH'];

  function handleClose() {
    onClose();
  }
  const handlePositionChange = (values: string[]) => {
    setSelectedValues(values);
    setValue('positions', values as FootballPosition[]); // Set the value in the form
    trigger('positions'); // Trigger the validation manually
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div >
        <div className="relative">
          {/* <!-- Modal content --> */}
          <div className="relative sm:p-2 bg-white rounded-lg  dark:bg-gray-800">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-theme-light dark:text-white">
                Add Player
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="updateProductModal"
                onClick={handleClose}
              >
                <IoCloseOutline />
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('firstName', {
                      required: {
                        value: true,
                        message: 'First name is required',
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Site name"
                  />
                  {errors.firstName && (
                    <div className="text-red-500">
                      {errors.firstName.message}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last"
                    {...register('lastName', {
                      required: {
                        value: true,
                        message: 'Last name is required',
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Site name"
                  />
                  {errors.lastName && (
                    <div className="text-red-500">
                      {errors.lastName.message}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    {...register('age', {
                      required: {
                        value: true,
                        message: 'Age is required',
                      },
                      setValueAs: (value) => Number(value),
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Site name"
                  />
                  {errors.age && (
                    <div className="text-red-500">{errors.age.message}</div>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="dob"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Data of birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    {...register('dob', {
                      required: {
                        value: true,
                        message: 'Data of birth is required',
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Site name"
                  />
                  {errors.dob && (
                    <div className="text-red-500">{errors.dob.message}</div>
                  )}
                </div>
                <div className="">
                  <label
                    htmlFor="nationality"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nationality
                  </label>
                  <div className="relative ">
                    <select
                      className="w-full rounded-lg border border-stroke bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue=""
                      {...register('nationality', {
                        required: {
                          value: true,
                          message: 'Nationality is required',
                        },
                      })}
                    >
                      <option value="" disabled defaultValue={''} hidden>
                        Select Nationality
                      </option>
                      {countryOptions.map((country) => (
                        <option key={country.value} value={country.label}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.foot && (
                    <div className="text-red-500">{errors.foot.message}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="foot"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border border-stroke bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue=""
                      {...register('gender', {
                        required: {
                          value: true,
                          message: 'Gender is required',
                        },
                      })}
                    >
                      <option value="" disabled defaultValue={''} hidden>
                        Gender
                      </option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                  {errors.foot && (
                    <div className="text-red-500">{errors.foot.message}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Height
                  </label>
                  <input
                    type="number"
                    id="height"
                    {...register('height', {
                      required: {
                        value: true,
                        message: 'Height is required',
                      },
                      setValueAs: (value) => Number(value),
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                  {errors.height && (
                    <div className="text-red-500">{errors.height.message}</div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="Age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Weight
                  </label>
                  <input
                    type="number"
                    id="weight"
                    {...register('weight', {
                      required: {
                        value: true,
                        message: 'Weight is required',
                      },
                      setValueAs: (value) => Number(value),
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Site name"
                  />
                  {errors.weight && (
                    <div className="text-red-500">{errors.weight.message}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="foot"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Foot
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border border-stroke bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue=""
                      {...register('foot', {
                        required: {
                          value: true,
                          message: 'foot is required',
                        },
                      })}
                    >
                      <option value="" disabled defaultValue={''} hidden>
                        Select foot
                      </option>
                      {footOptions.map((province, idx) => (
                        <option key={idx} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.foot && (
                    <div className="text-red-500">{errors.foot.message}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="foot"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Position(s)
                  </label>
                  <div className="relative">
                    <MultiSelect
                      placeholder="Pick position"
                      data={PositionOptions}
                      value={selectedValues} // Bind the selected values to the state
                      onChange={(values) => handlePositionChange(values)} // Update state and trigger validation
                      hidePickedOptions
                      searchable
                      classNames={{
                        input:
                          'bg-gray-50 dark:bg-gray-800 text-black dark:text-white', // Changes based on the mode
                        dropdown:
                          'text-gray-900 dark:text-theme-light dark:hover:text-blue-500',
                      }}
                    />
                  </div>
                  {errors.positions && (
                    <div className="text-red-500">
                      {errors.positions.message}
                    </div>
                  )}
                  <input
                    type="hidden"
                    {...register('positions', {
                      validate: (value) =>
                        (value && value.length > 0) ||
                        'You must select at least one position',
                    })}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="acadStatus"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Academic status
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border border-stroke bg-gray-50 p-2.5 text-gray-900 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      defaultValue=""
                      {...register('acadStatus', {
                        required: {
                          value: true,
                          message: 'Status is required',
                        },
                      })}
                    >
                      <option value="" disabled defaultValue={''} hidden>
                        Select Status
                      </option>
                      {academicOptions.map((province, idx) => (
                        <option key={idx} value={province}>
                          {province}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.acadStatus && (
                    <div className="text-red-500">
                      {errors.acadStatus.message}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end space-x-4">
                <button
                  type="button"
                  className="text-red-600 inline-flex items-center hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
