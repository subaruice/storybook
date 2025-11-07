import { type FC, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    closable?: boolean;
    onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({ message, type = "info", duration = 3000, closable = true, onClose }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    const handleAnimationComplete = () => {
        if (!visible) onClose?.();
    };

    const handleManualClose = () => {
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={`${styles.toast} ${styles[type]}`}
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onAnimationComplete={handleAnimationComplete}
                >
                    <span>{message}</span>

                    {closable && (
                        <button className={styles.closeBtn} onClick={handleManualClose}>
                            ✕
                        </button>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
