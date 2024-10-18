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

export default function UsersList() {
  const { data: users, refetch } = useGetUsersQuery();
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
                  className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  <FaPlus />
                  Add User
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
                  {users?.result.data.map((row: any, rowIndex: number) => (
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
                  ))}
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
