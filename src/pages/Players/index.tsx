import { useEffect, useState } from 'react';
import { IoPencil, IoEyeSharp } from 'react-icons/io5';
import { IoMdSearch, IoMdTrash } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
// import { MdFilterAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { ImFileEmpty } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa6';
// import { DecodedUser, decodeToken, isLoggedIn } from '../../utils/authUtils';
import {
  useDeletePlayerMutation,
  useGetAllPlayersBySiteQuery,
  useGetAllPlayersQuery,
} from './redux/api';
// import Paginator from '../../components/Pagination/Paginator';
import UpdateSite from './UpdaterPlayer';
import { Autocomplete, Menu, useMantineTheme } from '@mantine/core';
import { Player } from './interface';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModel';
import toast from 'react-hot-toast';
import AddSite from './AddPlayer';
// import SelectSite from './SelectSite';
import { useGetSitesQuery } from '../Sites/redux/api';
import { set } from 'lodash';
import AddPlayer from './AddPlayer';
import SinglePlayer from './SinglePlayer';
import Loader from '../../common/Loader';
import TableLoader from '../../common/Loader/TableLoader';
import SearchBox from "../../components/SearchBox";

export default function PlayersList() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  // const { data: players, refetchPlayers } = useGetAllPlayersQuery();
  const {
    data: playersData,
    error: playersError,
    isLoading: isPlayersLoading,
    refetch: refetchPlayersBySite,
  } = useGetAllPlayersBySiteQuery(
    { siteId: selectedSiteId },
    { skip: !selectedSiteId }, // Skip fetching if no site is selected
  );
  const {
    data: sites,
    isLoading: isLoadingSites,
    isError: isErrorSites,
    refetch: refetchSites,
  } = useGetSitesQuery();

  const [onSubmit] = useDeletePlayerMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [isPlayerModalOpen, setisPlayerModalOpen] = useState(false);
  const [playerToAct, setplayerToAct] = useState<Player | null>(null);
  const [filterValue, setfilterValue] = useState<string>('');
  const [isSiteWrong, setisSiteWrong] = useState<boolean>(false);

  useEffect(() => {
    if (sites && sites?.result?.data.length > 0 && !selectedSiteId) {
      setSelectedSiteId(sites.result.data[0].id);
      setfilterValue(sites.result.data[0].name);
    }
  }, [sites, selectedSiteId]);

  const handleUpdateOpen = (player: Player) => {
    setIsUpdateModalOpen(true);
    setplayerToAct(player);
  };
  const handleDeleteOpen = async (player: Player) => {
    setisDeleteModalOpen(true);
    setplayerToAct(player);
  };
  const handleSelect = async () => {
    setisSiteWrong(false);
    const selectedSite = sites?.result.data.find(
      (site) => `${site.name}` === filterValue,
    );
    if (selectedSite) {
      setSelectedSiteId(selectedSite.id);
    } else {
      setisSiteWrong(true);
    }
  };
  const handlePlayerDelete = async () => {
    setisDeleteModalOpen(false);
    toast.promise(
      onSubmit({ playerId: playerToAct!.id })
        .unwrap()
        .then(() => {
          setplayerToAct(null);
          refetchPlayersBySite();
        }),
      {
        loading: 'Deleting player...',
        success: 'Player deleted successfully!',
        error: (error) =>
          error.data.message || 'Failed to delete player. Please try again.',
      },
    );
  };

  const menus = [
    {
      label: 'Edit',
      icon: <IoPencil />,
      action: (player: Player) => {
        handleUpdateOpen(player);
      },
    },
    {
      label: 'Delete',
      icon: <IoMdTrash />,
      action: (player: Player) => {
        handleDeleteOpen(player);
      },
    },
    {
      label: 'View',
      icon: <IoEyeSharp />,
      action: (player: Player) => {
        setisPlayerModalOpen(true);
        setplayerToAct(player);
      },
    },
  ];
  const columns = [
    { Header: 'First name', accessor: (row: Player) => row.firstName },
    { Header: 'Last name', accessor: (row: Player) => row.lastName },
    { Header: 'Age', accessor: (row: Player) => row.age },
    { Header: 'Nationality', accessor: (row: Player) => row.nationality },
    { Header: 'Position', accessor: (row: Player) => row.positions.join(', ') },
    { Header: 'Foot', accessor: (row: Player) => row.foot },
  ];

  return (
    <>
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
                    onClick={() => setIsAddModalOpen(true)}
                    className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white focus:outline-none bg-theme-light rounded-lg hover:bg-theme-secondary hover:text-primary-700 focus:z-10  dark:bg-theme-dark dark:text-white dark:hover:text-white dark:hover:bg-theme-secondary"
                  >
                    <FaPlus />
                    Add Player
                  </button>
                  <div className="flex items-center space-x-3 w-full md:w-auto">
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
                      className=" self-center w-full md:w-auto flex items-center justify-center py-2 px-2 text-sm font-medium text-theme-light 00 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-theme-dark "
                      type="button"
                      onClick={handleSelect}
                    >
                      <FaFilter />
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
                    {!isPlayersLoading ? (
                      playersData?.result.data.length !== 0 ? (
                        playersData?.result.data.map(
                          (row: Player, rowIndex: number) => (
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
                        <td colSpan={7} className="items-center font-semibold">
                          <div className="flex flex-col justify-center items-center py-2 ">
                            <ImFileEmpty className="text-2xl flex items-center" />
                            <p>No data</p>
                          </div>
                        </td>
                      )
                    ) : (
                      <td colSpan={7} className="items-center font-semibold">
                        <div className="flex flex-col justify-center items-center py-3">
                          <TableLoader />
                        </div>
                      </td>
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
            player={playerToAct}
            onSuccess={refetchPlayersBySite}
          />
        )}
        {/* {isUpdateModalOpen && ( */}
        <AddPlayer
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          siteId={selectedSiteId || ''}
          onSuccess={refetchPlayersBySite}
        />
        {/* <!-- Delete model --> */}
        <ConfirmDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setisDeleteModalOpen(false)}
          action="Delete"
          asset="Player"
          onConfirm={handlePlayerDelete}
        />
        {/* <!-- SinglePlayer model --> */}
        <SinglePlayer
          isOpen={isPlayerModalOpen}
          onClose={() => setisPlayerModalOpen(false)}
          player={playerToAct}
          onSuccess={refetchPlayersBySite}
        />
      </>
    </>
  );
}
