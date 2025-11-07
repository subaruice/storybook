import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SidebarMenu } from "./SidebarMenu";

const meta: Meta<typeof SidebarMenu> = {
    title: "Navigation/SidebarMenu",
    component: SidebarMenu,
    tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof SidebarMenu>;

const items = [
    { label: "Dashboard" },
    {
        label: "Settings",
        children: [{ label: "Profile" }, { label: "Security" }, { label: "Notifications" }],
    },
    {
        label: "Projects",
        children: [
            { label: "Active" },
            { label: "Archived" },
            {
                label: "More",
                children: [{ label: "Sub-nested example" }],
            },
        ],
    },
];

export const Default: Story = {
    render: () => {
        const [open, setOpen] = useState(false);
        return (
            <>
                <button onClick={() => setOpen(true)}>Open Sidebar</button>
                <SidebarMenu open={open} onClose={() => setOpen(false)} items={items} />
            </>
        );
    },
};
