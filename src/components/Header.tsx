"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Notification from './Notification/notification';
import axios from 'axios';
import NotificationItem from "./Notification/notification.interface";
import { useRouter } from 'next/navigation';

const Header = () => {
    const router = useRouter();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    };

    const closeNotification = () => {
        setNotificationOpen(false);
    };

    const fetchNoti = () => {
        const userId = localStorage.getItem('userId');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification?userId=${userId}`)
            .then((res) => {
                setNotifications(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRead = (id: number) => {
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notification/${id}/read`)
            .then(() => {
                console.log(`Notification ${id} marked as read`);
            })
            .catch((err) => {
                console.log(err);
            });
        const updatedNotifications = notifications.map(notification =>
            notification.id === id ? { ...notification, read: !notification.read } : notification
        );
        setNotifications(updatedNotifications);
    }

    const markAllAsRead = () => {
        const userId = localStorage.getItem('userId');
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }));
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/notification/read-all?userId=${userId}`)
            .then(() => {
                console.log("All notifications marked as read");
            })
            .catch((err) => {
                console.log(err);
            });
        setNotifications(updatedNotifications);
    };

    useEffect(() => {
        fetchNoti();
    }, []); // Adding an empty dependency array ensures fetchNoti runs only on initial render


    return (
        <div className="flex justify-between items-center border-b-gray-200 border-b-[1px]">
            <div className="px-5 py-3 flex gap-0">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} className='cursor-pointer' onClick={() => router.push('/homepage')} />
            <div className="px-5 flex flex-col justify-center">
                    <div className="text-[20px] font-[500]">KinU</div>
                    <div className="text-[12px] font-[400]">Quản lý chi tiêu</div>
                </div>
            </div>
            <div className="px-5 flex justify-center items-center gap-3">
                <button className="icon" onClick={toggleNotification} aria-label="Thông báo">
                    <Image src="/icons/menu_header/notification.svg" alt="notification" width={20} height={20} />
                </button>
                {isNotificationOpen && <Notification notifications={notifications} onClose={closeNotification} onNotificationRead={ handleRead } onNotificationReadAll={ markAllAsRead } />}
                <div className="icon">
                    <Image src="/icons/menu_header/chart.svg" alt="chart" width={20} height={20} />
                </div>
                <div className="avatar">
                    <Image src="/icons/menu_header/Photo.svg" alt="avatar" width={50} height={50} />
                </div>
                <div className="icon">
                    <Image src="/icons/menu_header/dropdown.svg" alt="dropdown" width={30} height={30} />
                </div>
            </div>
        </div>
    );
};

export default Header;

function fetchNoti() {
    throw new Error('Function not implemented.');
}
