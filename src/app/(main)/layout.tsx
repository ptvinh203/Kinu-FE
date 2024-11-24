"use client"

import { createContext, ReactNode, use, useContext, useState } from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar/SideBar';
import styles from './layout.module.scss';

const NotificationContext = createContext<{ onNotification: boolean; setOnNotification: (value: boolean) => void }>({
    onNotification: false,
    setOnNotification: () => { },
});

const Layout = ({ children }: { children: ReactNode }) => {
    const [onNotification, setOnNotification] = useState<boolean>(false);

    return (
        <NotificationContext.Provider value={{ onNotification, setOnNotification }}>
            <div className="flex flex-col h-[100vh]">
                <Header />
                <div className={`flex ${styles.content}`}>
                    <SideBar />
                    <div className="w-full flex justify-center h-[100%]">{children}</div>
                </div>
            </div>
        </NotificationContext.Provider>
    );
};

export default Layout;
export const useNotificationContext = () => useContext(NotificationContext);
