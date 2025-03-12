import { Group, Avatar, Text, Accordion } from '@mantine/core';
import { SiVlcmediaplayer } from 'react-icons/si';
import { SessionTest } from './interface';
import { Test } from '../tests/interface copy';

export function AccordionLabel({ name: label, requiredMetrics }: Test) {
  return (
    <Group wrap="nowrap">
      <SiVlcmediaplayer className="text-2xl text-gray-500" />
      <div>
        <Text className="capitalize dark:text-white">{label}</Text>
        <Text size="sm" c="dimmed" fw={400}>
          {requiredMetrics.join(', ')}
        </Text>
      </div>
    </Group>
  );
}

export function AvailableTests(props: { tests: SessionTest[], selectedTest:(test: SessionTest )=>void }) {
  const { tests,selectedTest } = props;
  function handleGetStarted (test:SessionTest) {
    selectedTest(test)
  }
  const items = tests.map((item) => (
    <Accordion.Item
      value={item.id}
      key={item.test.name}
>
      <Accordion.Control
        className={`
           dark:bg-gray-900 text-gray-900
           dark:hover:bg-gray-800
        `}
      >
        <AccordionLabel {...item.test} />
      </Accordion.Control>
      <Accordion.Panel className=" dark:bg-gray-900">
        <button onClick={()=>handleGetStarted(item)} className="bg-theme-light ml-2 mt-4 px-4 py-1 rounded text-white dark:bg-theme-dark hover:bg-theme-secondary">
          Get Started
        </button>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion chevronPosition="right" variant="contained">
      {items}
    </Accordion>
  );
}
