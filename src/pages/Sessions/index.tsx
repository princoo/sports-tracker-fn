import { useState } from 'react';
import { IoPencil } from 'react-icons/io5';
import { FaPlus, FaUserTie } from 'react-icons/fa';
import { IoMdSearch, IoMdTrash, IoIosCheckmark } from 'react-icons/io';
import { CiClock2 } from 'react-icons/ci';
import { MdFilterAlt } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { FaClockRotateLeft } from 'react-icons/fa6';
import moment from 'moment';
// import { DecodedUser, decodeToken, isLoggedIn } from '../../utils/authUtils';
import { useDeleteSessionMutation, useGetSessionsQuery } from './redux/api';
// import Paginator from '../../components/Pagination/Paginator';
// import UpdateSite from './UpdaterSite';
import { Menu } from '@mantine/core';
import { Session } from './interface';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModel';
import toast from 'react-hot-toast';
import { ImFileEmpty } from 'react-icons/im';
import TableLoader from '../../common/Loader/TableLoader';
import { ErrorBoundary } from 'react-error-boundary';
import ServerError from '../../components/errors/ServerError';
import { useErrorBoundary } from 'react-error-boundary';
import Paginator from '../../components/Pagination/Paginator';
import { TbTimelineEvent } from 'react-icons/tb';
import { PiRadioactive } from 'react-icons/pi';
import { Test } from '../tests/interface copy';
import AddSession from './AddSession';

export default function SessionsList() {
  const {
    data: sessions,
    isLoading: isSessionsLoading,
    error: sessionsError,
    refetch,
  } = useGetSessionsQuery();
  const [onSubmit] = useDeleteSessionMutation();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setisDeleteModalOpen] = useState(false);
  const [sessionToAct, setsessionToAct] = useState<Session | null>(null);

  const handleUpdateOpen = (site: Session) => {
    setIsUpdateModalOpen(true);
    setsessionToAct(site);
  };
  const handleDeleteOpen = async (site: Session) => {
    setisDeleteModalOpen(true);
    setsessionToAct(site);
  };
  const handleSessionDelete = async () => {
    setisDeleteModalOpen(false);
    toast.promise(
      onSubmit({ sessionId: sessionToAct!.id })
        .unwrap()
        .then(() => {
          setsessionToAct(null);
          refetch();
        }),
      {
        loading: 'Deleting session...',
        success: 'Session deleted successfully!',
        error: (error) =>
          error.data.message || 'Failed to delete session. Please try again.',
      },
    );
  };

  if (sessionsError) {
    throw new Error('An error occurred while fetching sessions');
    // throw  sessionsError;
    // showBoundary(sessionsError);
  }

  const menus = [
    {
      label: 'Edit',
      icon: <IoPencil />,
      action: (site: Session) => {
        handleUpdateOpen(site);
      },
    },
    {
      label: 'Delete',
      icon: <IoMdTrash />,
      action: (site: Session) => {
        handleDeleteOpen(site);
      },
    },
  ];

  return (
    <>
      {/* <!-- Start block --> */}
      <section className=" antialiased dark:bg-gray-900">
        <div className="max-w-screen-xl">
          <div className="mx-5 md:ml-30 max-w-3xl space-y-6 sm:space-y-5">
            <h2 className="font-medium text-theme-light dark:text-white sm:text-2xl">
              Training Sessions
            </h2>

            <div className="items-center gap-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex">
              <span className="mb-4 flex aspect-square h-14 w-14 shrink-0 items-center sm:mb-0">
                <TbTimelineEvent className="text-6xl text-gray-400" />
              </span>
              <p className="min-w-0 flex-1  text-gray-800 dark:text-white">
                <span>
                  View and manage your training sessions. you can also schedule
                  new sessions from the calender.
                </span>
                <button
                  type="button"
                  id="createProductModalButton"
                  data-modal-target="createProductModal"
                  data-modal-toggle="createProductModal"
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-3 w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-white focus:outline-none bg-theme-light rounded-lg hover:bg-theme-secondary hover:text-primary-700 focus:z-10  dark:bg-theme-dark dark:text-white dark:hover:text-white dark:hover:bg-theme-secondary"
                >
                  {/* <FaPlus /> */}
                  Schedule Session
                </button>
              </p>
            </div>

            <ol className=" relative border-s border-gray-400 dark:border-gray-700 ">
              {!isSessionsLoading ? (
                sessions?.result.data.length !== 0 ? (
                  sessions?.result.data.map((session: Session, idx: number) => (
                    <li key={idx} className="mb-10 ms-6">
                      <span
                        className={`absolute -start-2.5 flex h-5 w-5 items-center justify-center rounded-full ${
                          session.status === 'ACTIVE'
                            ? 'bg-green-500'
                            : session.status === 'SCHEDULED'
                            ? 'bg-gray-400'
                            : 'bg-theme-light'
                        } ring-8 ring-white dark:bg-primary-900 dark:ring-gray-900`}
                      >
                        {session.status === 'ACTIVE' ? (
                          <PiRadioactive className="text-white" />
                        ) : session.status === 'SCHEDULED' ? (
                          <CiClock2 className="text-white" />
                        ) : (
                          <IoIosCheckmark className="text-white" />
                        )}
                      </span>
                      <span
                        className={`inline-flex items-center rounded ${
                          session.isActive ? 'bg-green-500' : ''
                        } px-2.5 py-0.5 text-xs  text-primary-800 dark:text-white`}
                      >
                        {moment(session.date).local().format('MMM D, YYYY')}
                      </span>
                      <p className=" font-medium text-gray-800 dark:text-gray-300">
                        Session is {session.status.toLowerCase()}
                      </p>
                      <p className="text-sm text-gray-800">
                        The training team will conduct {session.tests.length}{' '}
                        test(s) associated with this session.
                      </p>
                    </li>
                  ))
                ) : (
                  <p></p>
                )
              ) : (
                <p>Loading...</p>
              )}
            </ol>
          </div>
        </div>
      </section>
      {/* <!-- Update model --> */}
      {/* {isUpdateModalOpen && (
        <UpdateSite
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          site={sessionToAct}
          onSuccess={refetch}
        />
      )} */}
      {/* {isUpdateModalOpen && ( */}
      <AddSession
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={refetch}
      />
      {/* <!-- Delete model --> */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setisDeleteModalOpen(false)}
        action="Delete"
        asset="Session"
        onConfirm={handleSessionDelete}
      />
    </>
  );
}
