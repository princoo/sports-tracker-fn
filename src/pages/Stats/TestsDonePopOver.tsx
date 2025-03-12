import { Popover } from '@mantine/core';
import { useState } from 'react';
import { PlayerStat, SessionStat } from './interface';
import ViewTest from './ViewTest';

export default function TestsDonePopOver(props: { row: PlayerStat }) {
  const { row } = props;
  const [opened, setOpened] = useState(false);
  const [isViewTestOpen, setisViewTestOpen] = useState<boolean>(false);
  const [selectedStat, setselectedStat] = useState<SessionStat | null>(null);
  const [statPlayer, setstatPlayer] = useState<{
    firstName: string;
    lastName: string;
  } | null>(null);
  const open = () => setOpened(true);
  const close = () => setOpened(false);
  return (
    <>
      <div className="mt-3">
        <Popover
          width={200}
          position="bottom"
          withArrow
          shadow="md"
          clickOutsideEvents={['mouseup', 'touchend']}
        >
          <Popover.Target>
            <span
              onMouseEnter={open}
              onMouseLeave={close}
              className="cursor-pointer"
            >
              {row.tests.length}
            </span>
          </Popover.Target>
          <Popover.Dropdown className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg">
            <ul className="overflow-hidden text-sm capitalize text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {row.tests.map((test, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setselectedStat(test);
                    setstatPlayer(row.player);
                    setisViewTestOpen(true);
                  }}
                  className={`w-full px-4 py-2 ${
                    idx === row.tests.length - 1 ? '' : 'border-b'
                  } border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer`}
                >
                  {test.testName}
                </li>
              ))}
            </ul>
          </Popover.Dropdown>
        </Popover>
      </div>
      <ViewTest
        isOpen={isViewTestOpen}
        onClose={() => setisViewTestOpen(false)}
        onSuccess={() => setisViewTestOpen(false)}
        sessionTest={selectedStat}
        player={statPlayer}
      />
    </>
  );
}
