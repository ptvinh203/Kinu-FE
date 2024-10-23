import { ReactNode } from 'react';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col h-[100vh]">
            <Header />
            <div className="flex h-full">
                <SideBar />
                <div className="w-full flex justify-center h-[100%]">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
