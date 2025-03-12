import { Popover } from '@mantine/core';
import { useEffect, useState } from 'react';
import { PlayerStat } from './interface';
import { set } from 'lodash';

export default function MissingTestsPopover(props: { row: PlayerStat }) {
  const { row } = props;
  const [missingTest, setmissingTest] = useState<
    { test: { id: string; name: string } }[]
  >([]);
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    if (row) {
      const missing = row.sessionTests.filter(
        (test) => !row.tests.some((t) => t.testId === test.test.id),
      );
      setmissingTest(missing);
    }
  }, []);

  const open = () => setOpened(true);
  const close = () => setOpened(false);
  return (
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
            {missingTest.length}
          </span>
        </Popover.Target>
        <Popover.Dropdown className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg">
          <ul className="text-sm capitalize text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {missingTest.map((test, idx) => (
              <li
                key={idx}
                className={`w-full px-4 py-2 ${
                  idx === missingTest.length - 1 ? '' : 'border-b'
                } border-gray-200 rounded-t-lg dark:border-gray-600`}
              >
                {test.test.name}
              </li>
            ))}
          </ul>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
