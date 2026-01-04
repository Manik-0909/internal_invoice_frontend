import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { label: 'Select', value: '' },
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

export const Default: Story = {
  args: {
    options,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Currency',
    options,
  },
};

export const Required: Story = {
  args: {
    label: 'Currency',
    options,
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Currency',
    options,
    helperText: 'Please select your preferred currency',
  },
};

export const WithWarning: Story = {
  args: {
    label: 'Currency',
    options,
    warning: 'This currency may affect pricing',
  },
};

export const WithError: Story = {
  args: {
    label: 'Currency',
    options,
    error: 'Currency is required',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Currency',
    options,
    disabled: true,
    value: 'a',
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Currency',
    options,
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};
