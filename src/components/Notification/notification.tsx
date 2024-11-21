import { useState } from "react";
import NotificationItem from "./notification.interface";

interface NotificationProps {
    notifications: NotificationItem[];
    notificationsRead: NotificationItem[];
    notificationsUnread: NotificationItem[];
    onClose: () => void;
    onNotificationRead: (notificationId: number) => void;
    onNotificationReadAll: () => void;
}

const Notification: React.FC<NotificationProps> = ({
    notifications,
    notificationsRead,
    notificationsUnread,
    onClose,
    onNotificationRead,
    onNotificationReadAll,
}) => {
    const [filter, setFilter] = useState("all"); // State to handle the selected filter option

    const markAllAsRead = () => {
        onNotificationReadAll();
    };

    const allRead = notifications.every((notification) => notification.read);

    const toggleReadStatus = (id: number) => {
        onNotificationRead(id);
    };

    // Filter notifications based on the selected filter option
    const filteredNotifications =
        filter === "all"
            ? notifications
            : filter === "read"
            ? notificationsRead
            : notificationsUnread;

    return (
        <div className="absolute right-5 top-16 bg-white border border-gray-200 rounded-lg shadow-lg w-96 z-50 pt-3">
            <div className="flex justify-between items-center pb-4 border-b border-gray-200 px-5">
                <h2 className="text-lg font-semibold text-black">Thông báo</h2>
                <button className="text-sm text-blue-600" onClick={onClose}>
                    Đóng
                </button>
            </div>
            <div className="flex justify-between mt-4 px-5">
                <select
                    className="text-blue-600 text-sm"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)} // Update filter state
                >
                    <option value="all">Tất cả</option>
                    <option value="read">Đã đọc</option>
                    <option value="unread">Chưa đọc</option>
                </select>
                <button className="text-blue-600 text-sm" onClick={markAllAsRead}>
                    Đánh dấu tất cả đã đọc
                    {allRead && <span className="text-green-500 ml-1">✓</span>}
                </button>
            </div>
            <div className="mt-4 flex flex-col">
                {filteredNotifications.length === 0 ? (
                    <p className="text-center text-gray-500 italic">
                        Không có thông báo nào
                    </p>
                ) : (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center space-x-3 ${
                                !notification.read ? "font-semibold" : "text-gray-700"
                            } ${
                                notification.typeNotifiction === "OverSpending"
                                    ? "bg-red-300"
                                    : "bg-white"
                            } px-5 py-2`}
                        >
                            <div>
                                <p
                                    className={`text-sm ${
                                        !notification.read ? "text-black" : "text-gray-700"
                                    }`}
                                >
                                    {notification.content}
                                </p>
                                <p className="text-xs text-gray-500 italic">
                                    {new Date(notification.createdAt)
                                        .toLocaleDateString("en-GB")
                                        .replace(/\//g, "-")}
                                </p>
                            </div>
                            <button
                                onClick={() =>
                                    !notification.read && toggleReadStatus(notification.id)
                                }
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
