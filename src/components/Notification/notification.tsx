import Image from 'next/image';
import { useState } from 'react';

const Notification = ({ onClose }) => {
    console.log("Notification component rendered!");
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Thành công -43.000 VND bánh tráng trộn, khoản chi Ăn uống vào lúc 23:00",
            date: "1 giờ trước",
            read: false,
        },
        {
            id: 2,
            message: "Bạn vừa chinh phục mục tiêu tháng 7! Giờ thì hãy tự thưởng cho mình… nhưng đừng tiêu hết nhé!",
            date: "3 ngày trước",
            read: false,
        },
        {
            id: 3,
            message: "Thành công -1.300.000 VND mua váy đi ăn cưới, khoản chi Mua sắm vào lúc 12:30",
            date: "21/07/2024",
            read: false,
        },
        {
            id: 4,
            message: "Thành công -50.000 VND bữa ăn mì cay Hot hot, khoản chi Ăn uống vào lúc 17:13",
            date: "17/07/2024",
            read: false,
        }
    ]);

    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }));
        setNotifications(updatedNotifications);
    };

    // Kiểm tra xem tất cả thông báo đã được đánh dấu là đã đọc hay chưa
    const allRead = notifications.every(notification => notification.read);

    const toggleReadStatus = (id) => {
        const updatedNotifications = notifications.map(notification => 
            notification.id === id ? { ...notification, read: !notification.read } : notification
        );
        setNotifications(updatedNotifications);
    };

    return (
        <div className="absolute right-5 top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-96 p-5 z-50">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Thông báo</h2>
                <button 
                    className="text-sm text-blue-600" 
                    onClick={onClose}
                >
                    Đóng
                </button>
            </div>
            <div className="flex justify-between mt-4">
                <select className="text-blue-600 text-sm">
                    <option value="all">Tất cả</option>
                    <option value="">Đã đọc</option>
                    <option value="">Chưa đọc</option>
                </select>
                <button className="text-blue-600 text-sm" onClick={markAllAsRead}>
                    Đánh dấu tất cả đã đọc 
                    {allRead && <span className="text-green-500 ml-1">✓</span>} {/* Dấu tick nếu tất cả đã đọc */}
                </button>
            </div>
            <div className="mt-4 space-y-4">
                {notifications.map((notification) => (
                    <div key={notification.id} className={`flex items-start space-x-3 ${!notification.read ? 'font-semibold' : 'text-gray-700'}`}>
                        <Image src="/icons/menu_header/notification_icon.svg" alt="notification icon" width={20} height={20} />
                        <div>
                            <p className={`text-sm ${!notification.read ? 'text-black' : 'text-gray-700'}`}>{notification.message}</p>
                            <p className="text-xs text-gray-500 italic">{notification.date}</p>
                        </div>
                        <button onClick={() => toggleReadStatus(notification.id)} className="ml-auto text-blue-600 text-sm">
                            {notification.read ? (
                                <span className="text-green-500">✓</span>
                            ) : (
                                <span className="text-gray-500">✗</span>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;