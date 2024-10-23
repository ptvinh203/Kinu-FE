"use client";

import { FaBeer } from 'react-icons/fa';

import Image from 'next/image';

import { useState } from 'react';

const colors = [
    ['#FFA500', '#FFFFFF', '#FF4500', '#00BFFF', '#008000', '#FF0000'],
    ['#800080', '#9370DB', '#20B2AA', '#000080', '#A9A9A9', '#008000'],
    ['#800080', '#FF69B4', '#FF6347', '#006400', '#8B0000', '#4682B4'],
    ['#FFD700', '#FF8C00', '#ADFF2F', '#00FF7F', '#00CED1', '#1E90FF'],
    ['#FF1493', '#FFB6C1', '#FF4500', '#32CD32', '#8A2BE2', '#FF6347'],
];

const SpendType = () => {
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

    const totalEstimated = spendTypes.reduce((total, item) => total + item.estimated, 0);
    const totalSpent = spendTypes.reduce((total, item) => total + item.spent, 0);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [editFormData, setEditFormData] = useState({
        name: '',
        estimated: '',
        shortName: '',
        icon: '',
        color: '',
    });

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

    {/*Usestate cho phần chọn màu */ }
    const [selectedColor, setSelectedColor] = useState('');

    const handleColorClick = (color: any) => {
        setSelectedColor(color);
    };


    return (
        <div className="flex w-full h-full p-0 space-x-10">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-1/3 p-5 bg-yellow-100 rounded-lg">
                <div className="h-[130px] mb-5 p-4 bg-yellow-300 rounded-lg light-yellow-bg relative rounded-[20px] overflow-hidden">
                    <Image className="absolute right-0 top-0 pl-[220px] " src="/icons/spendtype/decoration.svg" alt="decoration" width={430} height={500} />
                    <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col gap-4 px-8 py-4 z-[10]">
                        <h2 className="text-md font-semibold">TỔNG SỐ TIỀN DỰ TÍNH</h2>
                        <div className="flex gap-5">
                            <Image className="" src="/icons/spendtype/wallet.svg" alt="decoration" width={60} height={60} />
                            <div>
                                <p className="text-2xl font-semibold">{totalEstimated.toLocaleString('vi-VN')} VND</p>
                                <p className="text-sm font-md">Tổng số tiền</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <h3 className="text-xl mb-3 font-bold">Thêm Loại Chi Tiêu</h3>
                    <form>
                        <div className="mb-3">
                            <label className="block mb-1">Tên loại chi tiêu</label>
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Nhập tên loại chi tiêu" />
                        </div>

                        <div className="mb-3">
                            <label className="block mb-1">Số tiền dự tính</label>
                            <input type="number" className="w-full p-2 border border-gray-300 rounded" placeholder="Nhập số tiền" />
                        </div>

                        <div className="mb-3 ">
                            <label className="block mb-1">Biểu tượng</label>
                            <div className="grid grid-cols-6 gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-yellow-300">
                                {/* Các biểu tượng (icon) */}
                                <button type="button">🏠</button>
                                <button type="button">🚗</button>
                                <button type="button">🛍️</button>
                                <button type="button">🍔</button>
                                <button type="button">✈️</button>
                                <button type="button">💡</button>
                            </div>
                        </div>

                        {/* <div className="mb-3">
                            <label className="block mb-1">Màu sắc</label>
                            <div className="grid grid-cols-6 gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-yellow-300">
                                
                                <button type="button" className="w-6 h-6 bg-red-500 rounded-lg "></button>
                                <button type="button" className="w-6 h-6 bg-purple-500 rounded-lg"></button>
                                <button type="button" className="w-6 h-6 bg-pink-500 rounded-lg"></button>
                                <button type="button" className="w-6 h-6 bg-cyan-500 rounded-lg"></button>
                                <button type="button" className="w-6 h-6 bg-green-500 rounded-lg"></button>
                                <button type="button" className="w-6 h-6 bg-yellow-500 rounded-lg"></button>
                            </div>
                        </div> */}


                        <div className="mb-3">
                            <label className="block mb-1">Màu sắc</label>
                            <div className="max-h-72 overflow-y-auto flex flex-col gap-2 overflow-y-scroll scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-yellow-300">
                                {colors.map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-around">
                                        {row.map((color, index) => (
                                            <div
                                                key={index}
                                                className={`w-12 h-12 rounded-lg cursor-pointer transition-all duration-200 ${selectedColor === color ? 'border-4 border-yellow-500' : 'border-0'}`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleColorClick(color)}
                                                onMouseEnter={(e) => e.currentTarget.style.border = '4px solid yellow'}
                                                onMouseLeave={(e) => e.currentTarget.style.border = selectedColor === color ? '4px solid yellow' : 'none'}
                                            ></div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button className="mt-3 w-full p-2 bg-yellow-500 text-white rounded transition-opacity duration-300 hover:opacity-50">Thêm loại chi tiêu</button>
                    </form>
                </div>
            </div>

            {/* Bảng các loại chi tiêu */}
            <div className="w-2/3 flex flex-col h-full">
                <table>
                    <tr>
                        <th>
                            <h2 className="text-2xl font-bold mb-5">Các Loại Chi Tiêu</h2>
                        </th>
                        <th className="pr-500">
                            <div className="relative w-1/3 ">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className="w-full p-4 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300" />
                                <span className="absolute left-3 top-3 text-gray-400">
                                    🔍
                                </span>
                            </div>
                        </th>
                    </tr>
                </table>
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="text-left py-3 px-4 font-semibold text-sm">Tên Chi Tiêu</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Dự Kiến</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Đã Tiêu</th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {spendTypes.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-3 px-4 flex items-center space-x-2">
                                    <span className={`w-4 h-4 rounded-full`} style={{ backgroundColor: item.color }}></span>
                                    <span>{item.icon} {item.name}</span>
                                </td>
                                <td className="py-3 px-4">{item.estimated.toLocaleString('vi-VN')} VND</td>
                                <td className={`py-3 px-4 ${item.spent > item.estimated ? 'text-red-500' : 'text-green-500'}`}>
                                    {item.spent.toLocaleString('vi-VN')} VND
                                </td>
                                <td className="py-3 px-4">
                                    <button
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 transition-opacity duration-100 hover:opacity-50"
                                        onClick={() => handleEditClick(item)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded transition-opacity duration-100 hover:opacity-50"
                                        onClick={() => handleDeleteClick(item)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal xác nhận xóa */}
            {isDeleteModalOpen && (
                <div className="w-full h-full fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
                    <div className="bg-white w-700 h-700 p-6 rounded-lg">
                        <h3 className="text-lg font-bold mb-4">Bạn có chắc chắn muốn xóa không?</h3>
                        <p className="mb-4">Một khi đã xóa thì không thể khôi phục lại.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded transition-opacity duration-100 hover:opacity-50"
                                onClick={handleCancelDelete}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded transition-opacity duration-100 hover:opacity-50"
                                onClick={handleConfirmDelete}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal chỉnh sửa loại chi tiêu */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-bold mb-4">Chỉnh Sửa Loại Chi Tiêu</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Tên loại chi tiêu</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={editFormData.name}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Số tiền dự tính</label>
                                <input
                                    type="number"
                                    name="estimated"
                                    value={editFormData.estimated}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Ký hiệu viết tắt</label>
                                <input
                                    type="text"
                                    name="shortName"
                                    value={editFormData.shortName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                            </div>
                            {/* Biểu tượng và Màu sắc */}
                            {/* Tương tự như phần icon và màu sắc */}
                        </form>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                className="bg-yellow-500 text-white px-4 py-2 rounded transition-opacity duration-100 hover:opacity-50"
                                onClick={handleCancelEdit}
                            >
                                Hủy bỏ
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded transition-opacity duration-100 hover:opacity-50"
                                onClick={handleSaveEdit}
                            >
                                Lưu thông tin
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default SpendType;








