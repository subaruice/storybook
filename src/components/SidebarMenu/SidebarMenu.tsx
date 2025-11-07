import { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./SidebarMenu.module.css";

interface MenuItem {
    label: string;
    children?: MenuItem[];
}

interface SidebarMenuProps {
    open: boolean;
    onClose: () => void;
    items: MenuItem[];
}

export const SidebarMenu: FC<SidebarMenuProps> = ({ open, onClose, items }) => {
    const [expanded, setExpanded] = useState<string | null>(null);

    const toggleSubmenu = (label: string) => {
        setExpanded((prev) => (prev === label ? null : label));
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.aside
                        className={styles.sidebar}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                    >
                        <div className={styles.header}>
                            <h3>Menu</h3>
                            <button className={styles.closeBtn} onClick={onClose}>
                                ✕
                            </button>
                        </div>

                        <nav className={styles.menu}>
                            {items.map((item) => (
                                <div key={item.label} className={styles.menuItem}>
                                    <div
                                        className={styles.menuLabel}
                                        onClick={() => (item.children ? toggleSubmenu(item.label) : onClose())}
                                    >
                                        {item.label}
                                        {item.children && (
                                            <span className={styles.arrow}>{expanded === item.label ? "▾" : "▸"}</span>
                                        )}
                                    </div>

                                    <AnimatePresence>
                                        {item.children && expanded === item.label && (
                                            <motion.div
                                                className={styles.submenu}
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                            >
                                                {item.children.map((sub) => (
                                                    <div key={sub.label} className={styles.subItem} onClick={onClose}>
                                                        {sub.label}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};
