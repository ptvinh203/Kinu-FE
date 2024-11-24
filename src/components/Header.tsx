"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Notification from './Notification/notification';
import axios from 'axios';
import NotificationItem from "./Notification/notification.interface";
import { useRouter } from 'next/navigation';
import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import { useNotificationContext } from '@/app/(main)/layout';

const Header = () => {
    const router = useRouter();
    const { setOnNotification } = useNotificationContext();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isNotificationOpen, setNotificationOpen] = useState(false);

    const toggleNotification = () => {
        setNotificationOpen(!isNotificationOpen);
    };

    const closeNotification = () => {
        setNotificationOpen(false);
    };
    const notificationsRead = notifications.filter((n) => n.read);
    const notificationsUnread = notifications.filter((n) => !n.read);
    const fetchNoti = () => {
        const userId = localStorage.getItem('userId');
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/notification/all?userId=${userId}`)
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

    const goToSpendChar = () => {
        router.push('/spendchar')
    }

    useEffect(() => {
        fetchNoti();

        const userId = localStorage.getItem('userId')
        const socket = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}`, {
            transports: ["websocket"],
            query: { userId },
        });

        socket.on('notification', (newNotification: NotificationItem) => {
            toast.success(newNotification.content);
            fetchNoti();
            setOnNotification(true);
        });
    }, [setOnNotification]);


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
                <button className="bg-[#FFC248] w-10 h-10 flex justify-center items-center rounded-full relative" onClick={toggleNotification} aria-label="Thông báo">
                    <Image src="/icons/menu_header/notification.svg" alt="notification" width={20} height={20} />
                    {notificationsUnread.length > 0 ?
                        <div className="absolute right-0 top-0 w-3 h-3 bg-red-500 rounded-full"></div> :
                        <div></div>
                    }
                </button>
                {isNotificationOpen && <Notification notifications={notifications} notificationsRead={notificationsRead}
                    notificationsUnread={notificationsUnread} onClose={closeNotification} onNotificationRead={handleRead} onNotificationReadAll={markAllAsRead} />}
                <div className="bg-[#FFC248] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer" onClick={goToSpendChar}>
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