import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    message: "This is a toast message!",
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    type: "info",
    duration: 100000
  },
};

export const Success: Story = {
  args: {
    type: "success",
    message: "Saved successfully!",
    duration: 10000
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Something went wrong!",
    duration: 9998
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "Check your input again!",
  },
};

export const LongDuration: Story = {
  args: {
    type: "info",
    message: "This will stay longer...",
    duration: 6000,
  },
};

export const NotClosable: Story = {
  args: {
    type: "info",
    message: "You cannot close this manually",
    closable: false,
  },
};
