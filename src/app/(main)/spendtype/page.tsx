"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import {
    SearchOutlined,
    SunOutlined,
    CarOutlined,
    ShoppingCartOutlined,
    HomeOutlined,
    HeartOutlined,
    PrinterOutlined
} from '@ant-design/icons';
import {
    faDog,
    faGuitar,
    faMagnifyingGlass,
    faPhone,
    faCartShopping,
    faCarSide,
    faPlaneDeparture,
    faPizzaSlice,
    faBurger,
    faCheese,
    faIceCream,
    faBowlFood,
    faBreadSlice,
    faMugHot,
    faShip,
    faVideo,
    faStar,
    faShirt,
    faMartiniGlass,
    faVolleyball,
    faBaseballBatBall,
    faTableTennisPaddleBall,
    faFutbol,
    faGolfBallTee,
    faFootball,
    faBicycle
} from '@fortawesome/free-solid-svg-icons';

import styles from './spendtype.module.scss'
import { successNotification } from "../../../components/Notification/index"
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const SpendType: React.FC = () => {
    const [spendTypes, setSpendTypes] = useState([
        { name: 'Tiền nhà', estimated: 3000000, spent: 3000000, color: 'red', icon: '🏠' },
        { name: 'Đi lại', estimated: 1500000, spent: 500000, color: 'purple', icon: '🚗' },
        { name: 'Mua sắm', estimated: 5500000, spent: 1200000, color: 'pink', icon: '🛍️' },
        { name: 'Ăn uống', estimated: 5500000, spent: 480120, color: 'cyan', icon: '🍔' },
        { name: 'Du lịch', estimated: 800000, spent: 1000000, color: 'green', icon: '✈️' },
        { name: 'Tiền điện', estimated: 1200000, spent: 1000000, color: 'blue', icon: '💡' },
        { name: 'Tiền nước', estimated: 300000, spent: 0, color: 'yellow', icon: '💧' },
        { name: 'Chi tiêu khác', estimated: 500000, spent: 0, color: 'gray', icon: '🔧' },
    ]);

    const colorOptions = [
        { id: 1, name: 'Đỏ', color: '#FF0000' },
        { id: 2, name: 'Xanh dương', color: '#0000FF' },
        { id: 3, name: 'Xanh lá', color: '#00FF00' },
        { id: 4, name: 'Vàng', color: '#FFFF00' },
        { id: 5, name: 'Tím', color: '#800080' },
    ];

    const icons = [
        { id: 1, icon: faDog, label: "Dog" },
        { id: 2, icon: faGuitar, label: "Guitar" },
        { id: 3, icon: faMagnifyingGlass, label: "Search" },
        { id: 4, icon: faPhone, label: "Phone" },
        { id: 5, icon: faCartShopping, label: "Shopping Cart" },
        { id: 6, icon: faCarSide, label: "Car Side" },
        { id: 7, icon: faPlaneDeparture, label: "Plane" },
        { id: 8, icon: faPizzaSlice, label: "Pizza" },
        { id: 9, icon: faBurger, label: "Burger" },
        { id: 10, icon: faCheese, label: "Cheese" },
        { id: 11, icon: faIceCream, label: "Ice Cream" },
        { id: 12, icon: faBowlFood, label: "Bowl of Food" },
        { id: 13, icon: faBreadSlice, label: "Bread" },
        { id: 14, icon: faMugHot, label: "Mug" },
        { id: 15, icon: faShip, label: "Ship" },
        { id: 16, icon: faVideo, label: "Video" },
        { id: 17, icon: faStar, label: "Star" },
        { id: 18, icon: faShirt, label: "Shirt" },
        { id: 19, icon: faMartiniGlass, label: "Martini Glass" },
        { id: 20, icon: faVolleyball, label: "Volleyball" },
        { id: 21, icon: faBaseballBatBall, label: "Baseball" },
        { id: 22, icon: faTableTennisPaddleBall, label: "Table Tennis" },
        { id: 23, icon: faFutbol, label: "Football" },
        { id: 24, icon: faGolfBallTee, label: "Golf" },
        { id: 25, icon: faFootball, label: "American Football" },
        { id: 26, icon: faBicycle, label: "Bicycle" },
    ];


    const totalEstimated = spendTypes.reduce((total, item) => total + item.estimated, 0);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [editFormData, setEditFormData] = useState({
        name: '',
        estimated: '',
        shortName: '',
        icon: '',
        color: '',
    });
    const [spendType, setSpendType] = useState("");
    const [spendAmount, setSpendAmount] = useState("");


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        successNotification("Chỉnh sửa thành công");
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteClick = (item: any) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleEditClick = (item: any) => {
        setSelectedItem(item);
        setEditFormData({
            name: item.name,
            estimated: item.estimated,
            shortName: '', // Add your logic for short name or icon
            icon: item.icon,
            color: item.color,
        });
        setIsEditModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setSpendTypes(spendTypes.filter((item) => item !== selectedItem));
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
    };

    const handleSaveEdit = () => {
        setSpendTypes(spendTypes.map((item: any) =>
            item === selectedItem
                ? { ...item, ...editFormData }
                : item
        ));
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
    };

    const handleCancelEdit = () => {
        setIsEditModalOpen(false);
        setSelectedItem(null);
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setEditFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const isNumeric = (str: string) => {
        if (typeof str !== "string") return false;
        return !isNaN(Number(str)) && !isNaN(parseFloat(str));
    };

    // Lọc các loại chi tiêu dựa trên từ khóa tìm kiếm
    const filteredSpendTypes = spendTypes.filter((item) => {
        const searchLower = searchTerm.toLowerCase();

        const matchesName = item.name.toLowerCase().includes(searchLower);

        const matchesAmount =
            isNumeric(searchTerm) &&
            (item.estimated.toString().includes(searchTerm) || item.spent.toString().includes(searchTerm));

        return matchesName || matchesAmount;
    });


    return (
        <div className="flex w-full h-full p-0 space-x-10 tao-bg">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-[25%] p-5 pink-bg rounded-lg">
            <div className="mb-5 p-4 bg-yellow-300 rounded-lg light-yellow-bg relative rounded-[20px] overflow-hidden">
                    <Image className="absolute right-0 top-0 pl-[320px] h-[100%] min-h-[150px]" src="/icons/spendtype/decoration.svg" alt="decoration" width={430} height={500} />
                    <div className="top-0 right-0 left-0 bottom-0 flex flex-col gap-2 px-4 py-4 z-[10]">
                        <h2 className="text-md font-semibold">TỔNG SỐ TIỀN DỰ TÍNH</h2>
                        <div className="flex gap-5">
                            <Image className="" src="/icons/spendtype/wallet.svg" alt="decoration" width={50} height={50} />
                            <div>
                                <p className={styles.money}>{totalEstimated.toLocaleString('vi-VN')} VND</p>
                                <p className="text-sm font-md">Tổng số tiền</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <h3 className="text-lg mb-3 font-bold">Thêm Loại Chi Tiêu</h3>
                    <form>
                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={spendType}
                                    onChange={(e) => setSpendType(e.target.value)}
                                    className={styles.inputLo}
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="email" className={styles.text}>
                                    Loại chi tiêu
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={spendAmount}
                                    onChange={(e) => setSpendAmount(e.target.value)}
                                    className={styles.inputLo}
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="email" className={styles.text}>
                                    Số tiền dự tính
                                </label>
                            </div>
                        </div>

                        <div className={styles.coolinput}>
                            <label htmlFor="input" className={styles.text}>Biểu tượng</label>
                            <div className={styles.colorOptions}>
                                {icons.map(icon => (
                                    <div
                                        key={icon.id}
                                        className={`${styles.colorItem} ${selectedIcon === icon.label ? styles.selected : ''}`}
                                        onClick={() => setSelectedIcon(icon.label)}
                                    >
                                        <div className={styles.colorName}>
                                            <FontAwesomeIcon icon={icon.icon} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.coolinput}>
                            <label htmlFor="input" className={styles.text}>Màu sắc</label>
                            <div className={styles.colorOptions}>
                                {colorOptions.map(color => (
                                    <div
                                        key={color.id}
                                        className={`${styles.colorItem} ${selectedColor === color.name ? styles.selected : ''}`}
                                        onClick={() => setSelectedColor(color.name)}
                                        style={{ backgroundColor: color.color }}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="mt-3 w-full p-2 light-yellow-bg text-white rounded transition-opacity duration-300 hover:opacity-50">Thêm loại chi tiêu</button>
                    </form>
                </div>
            </div>

            {/* Bảng các loại chi tiêu */}
            <div className="w-2/3 flex flex-col h-full">
                <table>
                    <div className={styles.headtbl}>
                        <p className={styles.titleTbl}>Các Loại Chi Tiêu</p>
                        <div className={styles.search}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className={styles.searchTbl}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className={styles.iconOverlay}>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>

                    </div>
                </table>
                <table className="min-w-full tao-bg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 font-semibold text-sm">Tên Chi Tiêu</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Dự Kiến</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Đã Tiêu</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className={styles.bodyTbl}>
                        {filteredSpendTypes.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4 flex items-center space-x-2">
                                    <span className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></span>
                                    <span>{item.icon} {item.name}</span>
                                </td>
                                <td className="py-3 px-4">{item.estimated.toLocaleString("vi-VN")} VND</td>
                                <td className={`py-3 px-4 ${item.spent > item.estimated ? "text-red-500" : "text-green-500"}`}>
                                    {item.spent.toLocaleString("vi-VN")} VND
                                </td>
                                <td className={styles.btnTble}>
                                    <button onClick={showModal} className={styles.editBtn}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal xác nhận xóa */}
            {isDeleteModalOpen && (
                <div className={styles.modalOverplay}>
                    <div className={"bg-white p-6 rounded-lg"}>
                        <div className={styles.headDeleMobal}>
                            <Image src="/icons/logo.svg" alt="logo" width={70} height={70} />
                            <div className={styles.titleDele}>
                                <p className={styles.titleDeleMobal}>Bạn có chắc chắn muốn xóa không</p>
                                <p>Một khi đã xóa thì không thể khôi phục lại.</p>
                            </div>
                        </div>
                        <div className={styles.btnDeleMobal}>
                            <button
                                className={styles.btnCan}
                                onClick={handleCancelDelete}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className={styles.btnOk}
                                onClick={handleConfirmDelete}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chỉnh sửa loại chi tiêu */}
            <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                width="30%"
                className={styles.mobalEditSpen}
                styles={{
                    content: {
                        backgroundColor: '#fff5e2', // Ensure the content area has the desired background color
                        borderRadius: '8px',
                        marginTop: '-40px'
                    },
                    body: {
                        backgroundColor: '#fff5e2', // Ensure the modal body has the desired background
                    },
                }}
            >
                <div className={styles.containerMobal}>
                    <div className={styles.headMobal}>
                        <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
                        <p className={styles.titleMobal}>Chỉnh Sửa Loại Chi Tiêu</p>
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Tên loại chi tiêu</label>
                        <input type="text" placeholder="Write here..." name="name" className={styles.inputMobal} />
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Số tiền dự tính</label>
                        <input type="text" placeholder="Write here..." name="money" className={styles.inputMobal} />
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Ký hiệu viết tắt</label>
                        <input type="text" placeholder="Write here..." name="symbol" className={styles.inputMobal} />
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Biểu tượng</label>
                        <div className={styles.colorOptions}>
                            {icons.map(icon => (
                                <div className={styles.colorName}>
                                    <FontAwesomeIcon icon={icon.icon} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Màu sắc</label>
                        <div className={styles.colorOptions}>
                            {colorOptions.map(color => (
                                <div
                                    key={color.id}
                                    className={`${styles.colorItem} ${selectedColor === color.name ? styles.selected : ''}`}
                                    onClick={() => setSelectedColor(color.name)}
                                    style={{ backgroundColor: color.color }}
                                >
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.modalFooter}>
                        <Button type="primary" onClick={handleOk} className={styles.btnMobal}>
                            Lưu thông tin
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SpendType;