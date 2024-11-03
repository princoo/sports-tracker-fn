import { useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { FaUserTie } from 'react-icons/fa';
import { IoMdSearch, IoMdTrash } from 'react-icons/io';
import { MdFilterAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
// import { DecodedUser, decodeToken, isLoggedIn } from '../../utils/authUtils';
import { useDeleteSiteMutation, useGetSitesQuery } from './redux/api';
// import Paginator from '../../components/Pagination/Paginator';
import UpdateSite from './UpdaterSite';
import { Menu } from '@mantine/core';
import { Site, SiteCoach } from './interface';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModel';
import toast from 'react-hot-toast';
import AddSite from './AddSite';
import SiteCoaches from './SiteCoaches';
import { ImFileEmpty } from 'react-icons/im';
import TableLoader from '../../common/Loader/TableLoader';
import { ErrorBoundary } from 'react-error-boundary';
import ServerError from '../../components/errors/ServerError';
import { useErrorBoundary } from 'react-error-boundary';

export default function Tests() {
  const {
    data: sites,
    isLoading: isSitesLoading,
    error: sitesError,
    refetch,
  } = useGetSitesQuery();
  const [onSubmit] = useDeleteSiteMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isCoacherModalOpen, setisCoacherModalOpen] = useState(false);
  const [siteCoaches, setsiteCoaches] = useState<SiteCoach[]>([]);
  const [siteToAct, setsiteToAct] = useState<Site | null>(null);
  const { showBoundary } = useErrorBoundary();

  const handleUpdateOpen = (site: Site) => {
    setIsUpdateModalOpen(true);
    setsiteToAct(site);
  };
  const handleDeleteOpen = async (site: Site) => {
    setisDeleteModalOpen(true);
    setsiteToAct(site);
  };
  const handleSiteDelete = async () => {
    setisDeleteModalOpen(false);
    toast.promise(
      onSubmit({ siteId: siteToAct!.id })
        .unwrap()
        .then(() => {
          setsiteToAct(null);
          refetch();
        }),
      {
        loading: 'Deleting site...',
        success: 'Site deleted successfully!',
        error: (error) =>
          error.data.message || 'Failed to delete site. Please try again.',
      },
    );
  };

  if (sitesError) {
    throw new Error('An error occurred while fetching sites');
    // throw  sitesError;
    // showBoundary(sitesError);
  }

  const menus = [
    {
      label: 'Edit',
      icon: <IoPencil />,
      action: (site: Site) => {
        handleUpdateOpen(site);
      },
    },
    {
      label: 'Delete',
      icon: <IoMdTrash />,
      action: (site: Site) => {
        handleDeleteOpen(site);
      },
    },
    {
      label: 'Coachs',
      icon: <FaUserTie />,
      action: (site: Site) => {
        setisCoacherModalOpen(true);
        setsiteCoaches(site.coaches);
        setsiteToAct(site);
      },
    },
  ];
  const columns = [
    { Header: 'Site name', accessor: (row: Site) => row.name },
    { Header: 'District', accessor: (row: Site) => row.district },
    { Header: 'Province', accessor: (row: Site) => row.province.toUpperCase() },
    {
      Header: 'Added on',
      accessor: (row: Site) => {
        const date = new Date(row.createdAt);
        const formattedDate = date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        return formattedDate;
      },
    },
    { Header: 'Coaches', accessor: (row: Site) => row.coaches.length },
  ];

  return (
    <>
        {/* <!-- Start block --> */}
        <section className="p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-xl">
            {/* <!-- Start coding here --> */}
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IoMdSearch />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <button
                    type="button"
                    id="createProductModalButton"
                    data-modal-target="createProductModal"
                    data-modal-toggle="createProductModal"
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <FaPlus />
                    Add Site
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      type="button"
                    >
                      <MdFilterAlt />
                      Filter
                      <svg
                        className="-mr-1 ml-1.5 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http:www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      {columns.map((column, idx) => (
                        <th key={idx} scope="col" className="px-4 py-4">
                          {column.Header}
                        </th>
                      ))}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isSitesLoading ? (
                      sites?.result?.data?.length !== 0 ? (
                        sites?.result.data.map(
                          (row: Site, rowIndex: number) => (
                            <tr
                              key={rowIndex}
                              className="border-b dark:border-gray-700"
                            >
                              {columns.map((column, idx) => (
                                <td
                                  key={idx}
                                  className="px-4 py-3  items-center"
                                >
                                  {column.accessor(row)}
                                </td>
                              ))}
                              <>
                                <Menu shadow="md" width={200}>
                                  <Menu.Target>
                                    <td>
                                      <button
                                        id="apple-imac-27-dropdown-button"
                                        className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        type="button"
                                      >
                                        <BsThreeDots />
                                      </button>
                                    </td>
                                  </Menu.Target>

                                  <Menu.Dropdown>
                                    {menus.map((menu, idx) => (
                                      <Menu.Item
                                        key={idx}
                                        leftSection={menu.icon}
                                        onClick={() => menu.action(row)}
                                      >
                                        {menu.label}
                                      </Menu.Item>
                                    ))}
                                  </Menu.Dropdown>
                                </Menu>
                              </>
                            </tr>
                          ),
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={7}
                            className="items-center font-semibold"
                          >
                            <div className="flex flex-col justify-center items-center py-2 ">
                              <ImFileEmpty className="text-2xl flex items-center" />
                              <p>No data</p>
                            </div>
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan={6} className="items-center font-semibold">
                          <div className="flex flex-col justify-center items-center py-3">
                            <TableLoader />
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* pagination */}
              {/* <Paginator /> */}
            </div>
          </div>
        </section>
        {/* <!-- Update model --> */}
        {isUpdateModalOpen && (
          <UpdateSite
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            site={siteToAct}
            onSuccess={refetch}
          />
        )}
        {/* <!-- COaches model --> */}
        <SiteCoaches
          isOpen={isCoacherModalOpen}
          onClose={() => setisCoacherModalOpen(false)}
          coaches={siteCoaches}
          onSuccess={refetch}
          siteId={siteToAct?.id || ''}
        />
        {/* {isUpdateModalOpen && ( */}
        <AddSite
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          // site={siteToAct}
          onSuccess={refetch}
        />
        {/* <!-- Delete model --> */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setisDeleteModalOpen(false)}
          action="Delete"
          asset="Site"
          onConfirm={handleSiteDelete}
        />
    </>
  );
}
