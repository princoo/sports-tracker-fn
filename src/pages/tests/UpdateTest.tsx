// import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Test, TestMetrics, TestPayload } from './interface copy';
import { useUpdateTestMutation } from './redux/api copy';
import Modal from '../../components/Modal';
import { MultiSelect } from '@mantine/core';

export default function UpdateTest(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  test: Test | null;
}) {
  const { isOpen, onClose, onSuccess, test } = props;
  const [onSubmit, { isLoading, isSuccess: SuccessAdd, reset: resetMutation }] =
    useUpdateTestMutation();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const metricsOptions = Object.values(TestMetrics);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<TestPayload>();

  useEffect(() => {
    if (test) {
      setSelectedValues(test.requiredMetrics);
      reset({
        name: test.name,
        description: test.description,
        requiredMetrics: test.requiredMetrics,
      });
    }
  }, [test, reset]);

  async function handleFormSubmit(data: TestPayload) {
    await onSubmit({testId: test!.id, TestPayload:data});
  }
  useEffect(() => {
    if (SuccessAdd) {
      onSuccess();
      onClose();
      resetMutation();
    }
  }, [SuccessAdd, onClose, onSuccess]);

  function handleClose() {
    onClose();
  }
  const handleMetricsChange = (values: string[]) => {
    setSelectedValues(values);
    setValue('requiredMetrics', values as TestMetrics[]); // Set the value in the form
    trigger('requiredMetrics'); // Trigger the validation manually
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="relative">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white dark:bg-gray-800 p-2">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-theme-light
               dark:text-white">
                Update Test
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
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Test name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', {
                      required: {
                        value: true,
                        message: 'Test name is required',
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Test name"
                  />
                  {errors.name && (
                    <div className="text-red-500">{errors.name.message}</div>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description{' '}
                  </label>
                  <input
                    type="text"
                    id="desc"
                    {...register('description', {
                      required: {
                        value: true,
                        message: 'Description is required',
                      },
                    })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    // placeholder="Test name"
                  />
                  {errors.description && (
                    <div className="text-red-500">
                      {errors.description.message}
                    </div>
                  )}
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="foot"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Metric(s)
                  </label>
                  <div className="relative">
                    <MultiSelect
                      placeholder="Pick Metrics"
                      data={metricsOptions}
                      value={selectedValues} // Bind the selected values to the state
                      onChange={(values) => handleMetricsChange(values)} // Update state and trigger validation
                      hidePickedOptions
                      searchable
                      classNames={{
                        input:
                          'bg-white dark:bg-gray-800 text-black dark:text-white', // Changes based on the mode
                        dropdown:
                          'text-black dark:text-white dark:hover:text-blue-500',
                      }}
                    />
                  </div>
                  {errors.requiredMetrics && (
                    <div className="text-red-500">
                      {errors.requiredMetrics.message}
                    </div>
                  )}
                  <input
                    type="hidden"
                    {...register('requiredMetrics', {
                      validate: (value) =>
                        (value && value.length > 0) ||
                        'You must select at least one Metric',
                    })}
                  />
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
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
