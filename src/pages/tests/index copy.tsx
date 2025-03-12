import { useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { IoMdSearch, IoMdTrash } from 'react-icons/io';
import { MdFilterAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

// import { DecodedUser, decodeToken, isLoggedIn } from '../../utils/authUtils';
import { useDeleteTestMutation, useGetTestsQuery } from './redux/api copy';
// import Paginator from '../../components/Pagination/Paginator';
import { Menu } from '@mantine/core';
import { Test } from './interface copy';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModel';
import toast from 'react-hot-toast';
import { ImFileEmpty } from 'react-icons/im';
import TableLoader from '../../common/Loader/TableLoader';
import AddTest from './AddTest';
import { useDisclosure } from '@mantine/hooks';
import PopOver from '../../components/PopOver';
import UpdateTest from './UpdateTest';
import SearchBox from '../../components/SearchBox';

export default function Tests() {
  const {
    data: sites,
    isLoading: isTestsLoading,
    error: TestsError,
    refetch,
  } = useGetTestsQuery();
  const [onSubmit] = useDeleteTestMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  // const [isCoacherModalOpen, setisCoacherModalOpen] = useState(false);
  // const [siteCoaches, setsiteCoaches] = useState<SiteCoach[]>([]);
  const [testToAct, settestToAct] = useState<Test | null>(null);

  const handleUpdateOpen = (test: Test) => {
    setIsUpdateModalOpen(true);
    settestToAct(test);
  };
  const handleDeleteOpen = async (test: Test) => {
    setisDeleteModalOpen(true);
    settestToAct(test);
  };
  const handleSiteDelete = async () => {
    setisDeleteModalOpen(false);
    toast.promise(
      onSubmit({ testId: testToAct!.id })
        .unwrap()
        .then(() => {
          settestToAct(null);
          refetch();
        }),
      {
        loading: 'Deleting Test...',
        success: 'Test deleted successfully!',
        error: (error) =>
          error.data.message || 'Failed to delete Test. Please try again.',
      },
    );
  };

  if (TestsError) {
    // throw new Error('An error occurred while fetching sites');
    // throw  TestsError;
    // showBoundary(TestsError);
  }

  const menus = [
    {
      label: 'Edit',
      icon: <IoPencil />,
      action: (test: Test) => {
        handleUpdateOpen(test);
      },
    },
    {
      label: 'Delete',
      icon: <IoMdTrash />,
      action: (test: Test) => {
        handleDeleteOpen(test);
      },
    },
  ];
  const columns = [
    { Header: 'Test name', accessor: (row: Test) => row.name },
    { Header: 'Description', accessor: (row: Test) => row.description },
    // { Header: 'Required metrics', accessor: (row: Test) => row.requiredMetrics.length },
  ];

  return (
    <>
      {/* <!-- Start block --> */}
      <section className="p-3 sm:p-5 antialiased ">
        <div className="mx-auto max-w-screen-xl">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <SearchBox />
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <button
                  type="button"
                  id="createProductModalButton"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                  onClick={() => setIsAddModalOpen(true)}
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white focus:outline-none bg-theme-light rounded-lg hover:bg-theme-secondary hover:text-primary-700 focus:z-10  dark:bg-theme-dark dark:text-white dark:hover:text-white dark:hover:bg-theme-secondary"
                >
                  <FaPlus />
                  Add Test
                </button>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <button
                      id="filterDropdownButton"
                      data-dropdown-toggle="filterDropdown"
                      className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-theme-light  bg-white rounded-lg border-2  border-theme-light hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
                    <th>Required metrics</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!isTestsLoading ? (
                    sites?.result?.data?.length !== 0 ? (
                      sites?.result.data.map((row: Test, rowIndex: number) => (
                        <tr
                          key={rowIndex}
                          className="border-b dark:border-gray-700"
                        >
                          {columns.map((column, idx) => (
                            <td key={idx} className="px-4 py-3  items-center">
                              {column.accessor(row)}
                            </td>
                          ))}
                          <>
                            <PopOver row={row} />
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="items-center font-semibold">
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
        <UpdateTest
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          test={testToAct}
          onSuccess={refetch}
        />
      )}
      {/* <!-- COaches model --> */}
      {/* <SiteCoaches
          isOpen={isCoacherModalOpen}
          onClose={() => setisCoacherModalOpen(false)}
          coaches={siteCoaches}
          onSuccess={refetch}
          siteId={siteToAct?.id || ''}
        /> */}
      {/* {isUpdateModalOpen && ( */}
      <AddTest
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
        asset="Test"
        onConfirm={handleSiteDelete}
      />
    </>
  );
}
