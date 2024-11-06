import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface NotificationProps {
    onClose: () => void;
}

interface NotificationItem {
    id: number;
    content: string;
    createdAt: string;
    read: boolean;
    typeNotification: string;
}

const Notification: React.FC<NotificationProps> = ({ onClose }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

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

    const allRead = notifications.every(notification => notification.read);

    const toggleReadStatus = (id: number) => {
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
    };

    useEffect(() => {
        fetchNoti();
    }, []); // Adding an empty dependency array ensures fetchNoti runs only on initial render

    return (
        <div className="absolute right-5 top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-96 p-5 z-50">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Thông báo</h2>
                <button className="text-sm text-blue-600" onClick={onClose}>
                    Đóng
                </button>
            </div>
            <div className="flex justify-between mt-4">
                <select className="text-blue-600 text-sm">
                    <option value="all">Tất cả</option>
                    <option value="read">Đã đọc</option>
                    <option value="unread">Chưa đọc</option>
                </select>
                <button className="text-blue-600 text-sm" onClick={markAllAsRead}>
                    Đánh dấu tất cả đã đọc
                    {allRead && <span className="text-green-500 ml-1">✓</span>}
                </button>
            </div>
            <div className="mt-4 space-y-4">
                {notifications.length === 0 ? (
                    <p className="text-center text-gray-500 italic">Không có thông báo nào</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className={`flex items-start space-x-3 ${!notification.read ? 'font-semibold' : 'text-gray-700'}`}>
                            {/* <Image src="/icons/menu_header/notification_icon.svg" alt="notification icon" width={20} height={20} /> */}
                            <div>
                                <p className={`text-sm ${!notification.read ? 'text-black' : 'text-gray-700'}`}>{notification.content}</p>
                                <p className="text-xs text-gray-500 italic">
                                    {new Date(notification.createdAt).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                </p>
                            </div>
                            <button
                                onClick={() => !notification.read && toggleReadStatus(notification.id)}
                                className="ml-auto text-blue-600 text-sm"
                            >
                                {notification.read ? (
                                    <span className="text-green-500">✓</span>
                                ) : (
                                    <span className="text-gray-500">✗</span>
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notification;
