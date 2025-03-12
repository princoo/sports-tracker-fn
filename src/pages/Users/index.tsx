import { useEffect, useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { IoMdSearch } from 'react-icons/io';
import { MdFilterAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';
import { DecodedUser, decodeToken, isLoggedIn } from '../../utils/authUtils';
import { useGetUsersQuery } from './redux/api';
// import Paginator from '../../components/Pagination/Paginator';
import { Menu } from '@mantine/core';
import UpdateUserRole from './UpdateUserRole';
import { User } from './interface';
import { ImFileEmpty } from 'react-icons/im';
import TableLoader from '../../common/Loader/TableLoader';
import SearchBox from '../../components/SearchBox';

export default function UsersList() {
  const {
    data: users,
    isLoading: isUsersLoading,
    refetch,
  } = useGetUsersQuery();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [userToUpdate, setuserToUpdate] = useState<string | null>(null);
  const [decodedUser, setdecodedUser] = useState<DecodedUser | null>(null);

  useEffect(() => {
    if (isLoggedIn()) {
      const user = decodeToken();
      setdecodedUser(user!);
    }
  }, []);

  const handleUpdateOpen = (id: string) => {
    setIsUpdateModalOpen(true);
    setuserToUpdate(id);
  };
  const handleRoleUpdateSuccess = () => {
    refetch(); // Trigger a refetch of the users when the update is successful
  };

  const menus = [
    {
      label: 'Edit Role',
      icon: <IoPencil />,
    },
  ];
  const columns = [
    { Header: 'First name', accessor: (row: User) => row.profile.firstName },
    { Header: 'Last name', accessor: (row: User) => row.profile.lastName },
    { Header: 'Email', accessor: (row: User) => row.email },
    { Header: 'Phone', accessor: (row: User) => row.profile.phone },
    { Header: 'Role', accessor: (row: User) => row.role.roleName },
    { Header: 'Nationality', accessor: (row: User) => row.profile.nationality },
  ];

  return (
    <>
      {/* <!-- Start block --> */}
      <section className="p-3 sm:p-5 antialiased">
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
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white focus:outline-none bg-theme-light rounded-lg hover:bg-theme-secondary hover:text-primary-700 focus:z-10  dark:bg-theme-dark dark:text-white dark:hover:text-white dark:hover:bg-theme-secondary"
                >
                  <FaPlus />
                  Add User
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!isUsersLoading ? (
                    users?.result.data.length !== 0 ? (
                      users?.result.data.map((row: any, rowIndex: number) => (
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
                            <Menu shadow="md" width={200}>
                              <td>
                                <Menu.Target>
                                  <button
                                    id="apple-imac-27-dropdown-button"
                                    className="inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                    type="button"
                                  >
                                    <BsThreeDots />
                                  </button>
                                </Menu.Target>
                              </td>

                              <Menu.Dropdown>
                                {menus.map((menu, idx) => (
                                  <Menu.Item
                                    key={idx}
                                    leftSection={menu.icon}
                                    onClick={() => handleUpdateOpen(row.id)}
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
                      <td colSpan={7} className="items-center font-semibold">
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
      {/* <!-- End block --> */}

      {/* update */}
      <UpdateUserRole
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        userId={userToUpdate}
        onSuccess={handleRoleUpdateSuccess}
      />
    </>
  );
}
