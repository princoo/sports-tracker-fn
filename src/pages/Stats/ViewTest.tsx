import Modal from '../../components/Modal';
import { PlayerStat, SessionStat } from './interface';
import { IoPencil } from 'react-icons/io5';
import { TfiStatsUp } from 'react-icons/tfi';

const members = [
  {
    avatar: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
    name: 'John lorin',
    email: 'john@example.com',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
    name: 'Chris bondi',
    email: 'chridbondi@example.com',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
    name: 'yasmine',
    email: 'yasmine@example.com',
  },
  {
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f',
    name: 'Joseph',
    email: 'joseph@example.com',
  },
];

export default function ViewTest(props: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  sessionTest: SessionStat | null;
  player: {
    firstName: string;
    lastName: string;
  } | null;
}) {
  const { isOpen, onClose, onSuccess, sessionTest, player } = props;
  console.log(player);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex gap-5 items-start justify-between">
          <div>
            <h4 className="text-gray-800 text-xl font-semibold dark:text-white">
              {player?.firstName} {player?.lastName}
            </h4>
          </div>
        </div>
        <div className="flex justify-between sm:flex-row">
          <p className="mt-10 text-gray-600 dark:text-gray-300 font-medium capitalize">
            {sessionTest?.testName} test
          </p>
          <button
            type="button"
            className="self-end flex items-center gap-2 justify-center py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-theme-light hover:bg-theme-secondary rounded-lg sm:mt-0"
          >
            <IoPencil />
            <span>Update</span>
          </button>
        </div>
        {sessionTest && (
          <ul className="divide-y">
            {Object.entries(sessionTest!.metrics).map(
              ([key, item]) =>
                key !== 'createdAt' &&
                key !== 'updatedAt' && (
                  <li
                    key={key}
                    className="py-5 flex items-start justify-between"
                  >
                    <div className="flex gap-3">
                      <div className="bg-gray-200 rounded-lg p-3 text-center dark:bg-gray-500">
                        <TfiStatsUp className="text-gray-800 dark:text-white text-xl" />
                      </div>
                      <div>
                        <span className="block text-medium text-gray-700 font-semibold capitalize">
                          {key}
                        </span>
                        <span className="block text-sm text-gray-600">
                          {key}:&nbsp;{item}
                          {key === 'foot' ? '' : '/10'}
                        </span>
                      </div>
                    </div>
                    <h4 className="text-gray-700 text-sm font-medium">
                      {item}
                      {key === 'foot' ? '' : '/10'}
                    </h4>
                  </li>
                ),
            )}
          </ul>
        )}
      </div>
    </Modal>
  );
}
