import type { Meta, StoryObj } from "@storybook/react";
import { Input, type InputProps } from "./Input";

const meta: Meta<typeof Input> = {
    title: "Components/Input",
    component: Input,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: { type: "select" },
            options: ["text", "password", "number"],
        },
    },
    args: {
        placeholder: "Type here...",
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
    args: {
        type: "text",
        clearable: false,
    } as Partial<InputProps>,
};

export const TextClearable: Story = {
    args: {
        type: "text",
        clearable: true,
        defaultValue: "Some text",
    } as Partial<InputProps>,
};

export const Password: Story = {
    args: {
        type: "password",
        clearable: false,
    } as Partial<InputProps>,
};

export const PasswordClearable: Story = {
    args: {
        type: "password",
        clearable: true,
        defaultValue: "hunter2",
    } as Partial<InputProps>,
};

export const NumberType: Story = {
    args: {
        type: "number",
        clearable: true,
        defaultValue: "42",
    } as Partial<InputProps>,
};
