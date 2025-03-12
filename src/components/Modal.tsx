import { Drawer, ScrollArea } from '@mantine/core';

export default function Modal(props: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const { isOpen, onClose, children } = props;

  return (
    <>
      <Drawer opened={isOpen} onClose={onClose} position="right" size='md' withCloseButton={false} scrollAreaComponent={ScrollArea.Autosize}>
        {children}
      </Drawer>

    </>
  );
}
