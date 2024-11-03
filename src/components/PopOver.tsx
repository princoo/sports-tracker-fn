import { Popover } from '@mantine/core';
import { useState } from 'react';
import { Test } from '../pages/tests/interface copy';

export default function PopOver(props: { row: Test }) {
  const { row } = props;
  const [opened, setOpened] = useState(false);

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
        <span onMouseEnter={open} onMouseLeave={close} className="cursor-pointer">
          {row.requiredMetrics.length}
        </span>
      </Popover.Target>
      <Popover.Dropdown className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md shadow-lg">
        <ul className="text-sm capitalize text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          {row.requiredMetrics.map((metric,idx) => (
            <li key={idx}  className={`w-full px-4 py-2 ${idx === row.requiredMetrics.length-1 ? "" : "border-b"} border-gray-200 rounded-t-lg dark:border-gray-600`}>
              {metric}
            </li>
          ))}
        </ul>
      </Popover.Dropdown>
    </Popover>
    </div>
  );
}
