// import React, { useState } from 'react';
import { PlayerStat } from './interface';
import TableLoader from '../../common/Loader/TableLoader';
import { ImFileEmpty } from 'react-icons/im';
import { IoMdSearch } from 'react-icons/io';
import { useGetSessionPlayersStatsQuery } from './redux/api';
import TestsDonePopOver from './TestsDonePopOver';
import MissingTestsPopover from './MissingTestsPopover';
// import { useGetSessionsQuery } from '../Sessions/redux/api';
import { MdFilterAlt } from 'react-icons/md';

export default function Stats() {
  // const {
  //   data: sessions,
  //   isLoading: isSessionsLoading,
  //   error: sessionsError,
  //   refetch,
  // } = useGetSessionsQuery();

  const {
    data: playersData,
    // error: playersError,
    isLoading: isPlayersLoading,
    // refetch: refetchPlayersStats,
  } = useGetSessionPlayersStatsQuery(
    { sessionId: 'cd63ce40-8d0f-4eeb-b30a-a7cc2246a40a' },
    // { skip: !selectedSiteId }, // Skip fetching if no site is selected
  );
  const columns = [
    {
      Header: 'Full name',
      accessor: (row: PlayerStat) =>
        `${row.player.firstName} ${row.player.lastName}`,
    },
    {
      Header: 'Recent Test',
      accessor: (row: PlayerStat) => row.tests[0].testName,
    },
    {
      Header: 'Session Tests',
      accessor: (row: PlayerStat) => row.sessionTests.length,
    },
    // { Header: 'Tests Done', accessor: (row: PlayerStat) => row.tests.length },
    // {
    //   Header: 'Missing Tests',
    //   accessor: (row: PlayerStat) => {
    //     return row.sessionTests.filter(
    //       (test) => !row.tests.some((t) => t.testId === test.test.id),
    //     ).length;
    //   },
    // },
  ];
  return (
    <div>
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
                    <th>Tests Done</th>
                    <th>Missing Tests</th>
                  </tr>
                </thead>
                <tbody>
                  {!isPlayersLoading ? (
                    playersData?.result.data.length !== 0 ? (
                      playersData?.result.data.map(
                        (row: PlayerStat, rowIndex: number) => (
                          <tr
                            key={rowIndex}
                            className="border-b dark:border-gray-700"
                          >
                            {columns.map((column, idx) => (
                              <td key={idx} className="px-4 py-3  items-center">
                                {column.accessor(row)}
                              </td>
                            ))}
                            <td>
                              <TestsDonePopOver row={row} />
                            </td>
                            <td>
                              <MissingTestsPopover row={row} />
                            </td>
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
    </div>
  );
}
