import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'UI/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Success: Story = {
  args: {
    status: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Warning',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'Error',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    children: 'Info',
  },
};

export const Neutral: Story = {
  args: {
    status: 'neutral',
    children: 'Neutral',
  },
};

export const Small: Story = {
  args: {
    status: 'success',
    size: 'sm',
    children: 'Small badge',
  },
};

export const Medium: Story = {
  args: {
    status: 'success',
    size: 'md',
    children: 'Medium badge',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="success">Approved</StatusBadge>
      <StatusBadge status="warning">Pending</StatusBadge>
      <StatusBadge status="error">Rejected</StatusBadge>
      <StatusBadge status="info">Processing</StatusBadge>
      <StatusBadge status="neutral">Draft</StatusBadge>
    </div>
  ),
};
