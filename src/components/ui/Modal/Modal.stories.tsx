import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import ModalBody from './Modal.Body';
import ModalFooter from './Modal.Footer';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <>
      <Button
        variant="primary"
        data-twe-toggle="modal"
        data-twe-target="#demoModal"
        data-twe-ripple-init
        data-twe-ripple-color="light"
      >
        Open Modal
      </Button>

      <Modal
        id="demoModal"
        title="Demo Modal"
        description="This is a reusable modal component"
      >
        <ModalBody>Modal body content goes here</ModalBody>

        <ModalFooter>
          <Button variant="secondary" data-twe-modal-dismiss>
            Cancel
          </Button>

          <Button variant="primary">Confirm</Button>
        </ModalFooter>
      </Modal>
    </>
  ),
};
