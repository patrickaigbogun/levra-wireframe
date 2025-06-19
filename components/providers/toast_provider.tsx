"use client";

import { CheckCircle, Info, LinkBreak, Spinner, Warning } from "@phosphor-icons/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
    children: React.ReactNode;
}

// Define the type for the icon props
interface IconProps {
    type: string;
    isLoading?: boolean;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
    const CustomIcon = (props: IconProps) => {
        const { type, isLoading } = props;

        if (isLoading) return <Spinner />;

        switch (type) {
            case 'info':
                return <Info weight='duotone' size={28}/>;
            case 'success':
                return <CheckCircle weight='duotone' size={28} />;
            case 'error':
                return <LinkBreak weight='duotone' size={28} />;
            case 'warning':
                return <Warning weight='duotone' size={28}/>;
            case 'default':
                return undefined;
            default:
                return undefined;
        }
    };

    return (
        <>
            {children}
            <ToastContainer icon={CustomIcon} />
        </>
    );
};

export default ToastProvider;