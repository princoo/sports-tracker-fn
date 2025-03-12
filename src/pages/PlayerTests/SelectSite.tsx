import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SelectSitePayload } from './interface';
import Modal from '../../components/Modal';
import countryList from 'react-select-country-list';
import { Autocomplete } from '@mantine/core';
import { useGetSitesQuery } from '../Sites/redux/api';

export default function SelectSite(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  selecteSite: (siteId: string) => void;
}) {
  const { isOpen, onClose, onSuccess, selecteSite } = props;

  const [filterValue, setfilterValue] = useState<string>('');
  const [isSiteWrong, setisSiteWrong] = useState<boolean>(false);
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const {
    data: sites,
    isLoading: isLoadingSites,
    isError: isErrorSites,
    refetch: refetchSites,
  } = useGetSitesQuery();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<SelectSitePayload>();

  async function handleFormSubmit(data: SelectSitePayload) {
    // await onSubmit({ siteId, PlayerPayload: data });

  }


  const handleSelect = async () => {
    setisSiteWrong(false);
    const selectedSite = sites?.result.data.find(
      (site) => `${site.name}` === filterValue,
    );
    if (selectedSite) {
      setSelectedSiteId(selectedSite.id);
      selecteSite(selectedSite.id);
      onSuccess();
      onClose();
    } else {
      setisSiteWrong(true);
    }
  };
  function handleClose() {
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* <!-- Modal header --> */}
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Select Site
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
              <div className="flex flex-col gap-3 w-full">
                {/* <div className=""> */}
                  <div>
                    <Autocomplete
                      placeholder="Filter with site"
                      value={filterValue}
                      error={isSiteWrong}
                      onChange={setfilterValue}
                      data={sites?.result.data.map((site) => `${site.name}`)}
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

                  <button
                    id="filterDropdownButton"
                    data-dropdown-toggle="filterDropdown"
                    className="bg-theme-light dark:bg-theme-dark  w-full md:w-auto flex items-center justify-center py-2 px-2 text-sm font-medium text-white  focus:outline-none rounded-lg border border-gray-200 hover:bg-theme-secondary dark:hover:bg-theme-secondary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:border-gray-600 "
                    type="button"
                    onClick={handleSelect}
                  >
                    Continue
                  </button>
                </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
