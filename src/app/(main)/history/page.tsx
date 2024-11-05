"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    faBicycle,
    faHouse, faUser, faCheck, faDownload, faImage, faBars, faEnvelope,
    faMusic, faWandMagicSparkles, faHeart, faArrowRight,
    faCircleXmark, faBomb, faPoo, faCameraRetro, faXmark, faCloud,
    faComment, faCaretUp, faTruckFast, faPenNib, faArrowUp, faHippo,
    faFaceSmile, faCalendarDays, faPaperclip, faShieldHalved,
    faFile, faBell, faClipboard, faFilter, faCircleInfo, faArrowUpFromBracket,
    faBolt, faCar, faGhost, faCircleUser, faPen, faUmbrella,
    faGift, faFilm, faList, faGear, faTrash, faCircleUp, faCircleDown, faInbox, faRotateRight, faLock, faHeadphones,
    faBarcode, faTag, faBook, faBookmark, faPrint, faCamera,
    faFont, faCircleHalfStroke, faDroplet, faShareFromSquare, faPlus,
    faMinus, faShare, faCircleExclamation, faFire, faEye, faEyeSlash,
    faPlane, faMagnet, faHand, faFolder, faFolderOpen, faMoneyBill, faThumbsUp, faThumbsDown, faComments, faLemon, faKey, faThumbtack,
    faGears, faPaperPlane, faCode, faGlobe, faTruck, faCity,
    faTicket, faTree, faWifi, faPaintRoller, faSliders, faBrush,
    faHashtag, faFlask, faBriefcase, faCompass, faDumpsterFire, faPerson, faPersonDress,
    faAddressBook, faBath, faHandshake, faSnowflake,
    faRightToBracket, faEarthAmericas, faCloudArrowUp, faBinoculars, faPalette,
    faLayerGroup, faUsers, faGamepad, faBusinessTime
} from '@fortawesome/free-solid-svg-icons';

import styles from './history.module.scss'
import { successNotification } from "../../../components/Notification/index"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { userInfo } from 'os';

const SpendType: React.FC = () => {
    const [spendTypes, setSpendTypes] = useState([
        { id: 1, name: 'Tiền nhà', estimatedAmount: 3000000, spent: 3000000, color: { id: 1, name: "", colorCode: "" }, icon: { id: 1, name: "", svgUrl: "" } },
    ]);

    const [colorOptions, setColorOptions] = useState([
        { id: 1, name: 'Đỏ', colorCode: '#FF0000', spent: 0 },
    ]);

    const [icons, setIcon] = useState([
        { id: 1, name: faDog, svgUrl: "Dog", spent: 0 },
    ]);


    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
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
    const [spendAmount, setSpendAmount] = useState<any>();
    const [abbre, setAbbre] = useState("");
    const [loading, setLoading] = useState(true);  // State to handle loading
    const totalEstimated = loading ? spendTypes.reduce((total, item) => total + item.estimatedAmount, 0) : 0;
    const [startDate, setStartDate] = useState(""); 
    const [editStartDate, setEditStartDate] = useState<any>();
    const [editId, setEditId] = useState<any>();
    const [editType, setEditType] = useState<any>();
    const [editSpendAmount, setEditSpendAmount] = useState<any>();
    const [editAbbre, setEditAbbre] = useState<any>();
    const [editColor, setEditColor] = useState<any>();
    const [editIcon, setEditIcon] = useState<any>();

    const iconMapping: Record<string, IconDefinition> = {
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
        faBicycle,
        faHouse, 
        faUser, 
        faCheck, 
        faDownload, 
        faImage, 
        faBars, 
        faEnvelope,
        faMusic, 
        faWandMagicSparkles, 
        faHeart, 
        faArrowRight,
        faCircleXmark, 
        faBomb, 
        faPoo, 
        faCameraRetro, 
        faXmark, 
        faCloud,
        faComment, 
        faCaretUp, 
        faTruckFast, 
        faPenNib, 
        faArrowUp, 
        faHippo,
        faFaceSmile, 
        faCalendarDays, 
        faPaperclip, 
        faShieldHalved,
        faFile, 
        faBell, 
        faClipboard, 
        faFilter, 
        faCircleInfo, 
        faArrowUpFromBracket,
        faBolt, 
        faCar, 
        faGhost, 
        faCircleUser, 
        faPen, 
        faUmbrella,
        faGift, 
        faFilm, 
        faList, 
        faGear, 
        faTrash, 
        faCircleUp, 
        faCircleDown, 
        faInbox, 
        faRotateRight, 
        faLock, 
        faHeadphones,
        faBarcode, 
        faTag, 
        faBook, 
        faBookmark, 
        faPrint, 
        faCamera,
        faFont, 
        faCircleHalfStroke, 
        faDroplet, 
        faShareFromSquare, 
        faPlus,
        faMinus, 
        faShare, 
        faCircleExclamation, 
        faFire, 
        faEye, 
        faEyeSlash,
        faPlane, 
        faMagnet, 
        faHand, 
        faFolder, 
        faFolderOpen, 
        faMoneyBill, 
        faThumbsUp, 
        faThumbsDown, 
        faComments, 
        faLemon, 
        faKey, 
        faThumbtack,
        faGears, 
        faPaperPlane, 
        faCode, 
        faGlobe, 
        faTruck, 
        faCity,
        faTicket, 
        faTree, 
        faWifi, 
        faPaintRoller, 
        faSliders, 
        faBrush,
        faHashtag, 
        faFlask, 
        faBriefcase, 
        faCompass, 
        faDumpsterFire, 
        faPerson, 
        faPersonDress,
        faAddressBook, 
        faBath, 
        faHandshake, 
        faSnowflake,
        faRightToBracket, 
        faEarthAmericas, 
        faCloudArrowUp, 
        faBinoculars, 
        faPalette,
        faLayerGroup, 
        faUsers, 
        faGamepad, 
        faBusinessTime
    };

    // Helper function to get the icon safely
    const getIconFromSvgUrl = (svgUrl: string): IconDefinition => {

        const icon = iconMapping[svgUrl];

        if (icon) {
            return icon;
        } else {
            return faDog;  // Fallback icon if not found
        }
    };


    const fetchSpendTypes = async () => {
        try {
            // Fetch data from API
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/type-sprinding?userId=${userId}`);
            console.log("API Response: ", response.data);  // Log the response data

            const data = response.data.data;
            const updatedData = data.map((item: any) => ({
                ...item,  // Spread the existing properties of the item
                spent: 0  // Initialize `spent` to 0 or any value you want
            }));
            console.log(updatedData)

            setSpendTypes(updatedData);  // Set the modified data to state
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };

    const fetchColor = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/color`);

            const data = response.data.data;

            setColorOptions(data);  // Set the modified data to state
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const fetchIcon = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/icon`);
            console.log("API Response: ", response.data);

            const data = response.data.data;
            const updatedData = data.map((item: any) => ({
                ...item,  // Spread the existing properties of the item
                spent: 0  // Initialize `spent` to 0 or any value you want
            }));
            console.log(updatedData)

            setIcon(updatedData);  // Set the modified data to state
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };


    // useEffect to call API when component mounts
    useEffect(() => {
        fetchSpendTypes();
        fetchColor();
        fetchIcon();
    }, []);

    const showModal = (item: any) => {
        console.log(item)
        setIsModalVisible(true);
        setEditId(item.id)
        setEditColor(item.color.id)
        setEditIcon(item.icon.id)
        setEditAbbre(item.abbreviation)
        setEditStartDate(item.name)
        setEditSpendAmount(item.estimatedAmount)
        setEditType(item.name)
    };

    const handleOk = () => {
        if (editType === ""){
            toast.error('Loại chi tiêu trống');
            return;
        }
        if (editSpendAmount === null || editSpendAmount === 0){
            toast.error('Số tiền dự tính không hợp lệ');
            return;
        }
        if (editAbbre === ""){
            toast.error('Chọn loại chi tiêu');
            return;
        }
        setIsModalVisible(false);
        axios.put(`${process.env.NEXT_PUBLIC_API_URL}/type-sprinding/update/${editId}`, {
            name: editType,
            estimatedAmount: editSpendAmount,
            abbreviation: editAbbre,
            iconId: editIcon,
            colorId: editColor,
        })
            .then(res => {
                toast.success("Sửa thành công");
                fetchSpendTypes();
            })
            .catch(err => {
                console.log(err)
                toast.error("Sửa thất bại: " + err.response.data.message);
            })
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleDeleteClick = (item: any) => {
        setSelectedItem(item.id);
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

    const createNewSpendType = () => {
        if (spendType === ""){
            toast.error('Vui lòng nhập loại chi tiêu')
            return
        }
        if (abbre === ""){
            toast.error('Vui lòng chọn loại chi tiêu')
            return
        }
        if (spendAmount == null || spendAmount === 0){
            toast.error('Vui lòng nhập số tiền dự tính')
            return
        }
        
        const userId = localStorage.getItem('userId')
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/type-sprinding/create`, {
            name: spendType,
            estimatedAmount: spendAmount,
            abbreviation: abbre,
            iconId: selectedIcon?.toString(),
            colorId: selectedColor?.toString(),
            userId,
        })
            .then(res => {
                toast.success("Thêm thành công");
                fetchSpendTypes();
            })
            .catch(err => {
                console.log(err)
                toast.error("Thêm thất bại: " + err.response.data.message);
            })
    };

    const handleConfirmDelete = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/type-sprinding/delete/${selectedItem}`, {
        })
            .then(res => {
                toast.success("Xóa thành công");
                fetchSpendTypes();
            })
            .catch(err => {
                console.log(err)
                toast.error("Xóa thất bại: " + err.response.data.message);
            })
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
    const filteredSpendTypes = loading ? [] : spendTypes.filter((item) => {
        const searchLower = searchTerm.toLowerCase();

        const matchesName = item.name.toLowerCase().includes(searchLower);

        const matchesAmount =
            isNumeric(searchTerm) &&
            (item.estimatedAmount.toString().includes(searchTerm) || item.spent.toString().includes(searchTerm));

        return matchesName || matchesAmount;
    });

    if (loading) {
        return <p>Loading spend types...</p>;
    }

    // ngày và giờ ở chổ thêm loại chi tiêu
    // Khai báo component AddExpense
    // const AddExpense = () => {
    // // Khởi tạo state startDate với giá trị mặc định là ngày hiện tại, và hàm setStartDate để cập nhật giá trị của startDate
    //     const [startDate, setStartDate] = useState(new Date());
    // };
    return (
        <div className="flex w-full h-full p-0 space-x-10 tao-bg">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-[25%] p-5 pink-bg rounded-lg h-full">
                <div className="mb-3 p-2 bg-yellow-300 rounded-lg light-yellow-bg relative rounded-[20px] overflow-hidden">
                    <Image className="absolute right-0 top-0 pl-[320px] h-[100%] min-h-[150px]" src="/icons/spendtype/decoration.svg" alt="decoration" width={430} height={500} />
                    <div className="top-0 right-0 left-0 bottom-0 flex flex-col gap-2 px-4 py-4 z-[10]">
                        <h2 className="text-[13px] font-semibold">SỐ DƯ TỪ VÍ ĐIỆN TỬ</h2>
                        <div className="flex gap-5">
                            <Image className="" src="/icons/spendtype/wallet.svg" alt="decoration" width={50} height={50} />
                            <div>
                                <p className={styles.money}>{totalEstimated.toLocaleString('vi-VN')} VND</p>
                                <p className="text-sm font-md">Tổng chi phí</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div>
                    <h3 className="text-[15px] mb-3 font-bold">Thêm Khoản Chi Tiêu</h3>
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
                                    Tên khoản chi tiêu
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                                {/* <input
                                    type="text"
                                    value={abbre}
                                    onChange={(e) => setAbbre(e.target.value)}
                                    className={styles.inputLo}
                                    required
                                    autoComplete="off"
                                /> */}
                                <select id="expenseType" 
                                className={styles.inputLo} 
                                onChange={(e) => setAbbre(e.target.value)}
                                value={abbre}
                                required
                                autoComplete="off"
                                >
                                    <option value="">Chọn loại chi tiêu</option>
                                    <option value="1">Tiền nhà</option>
                                    <option value="2">Tiền điện</option>
                                    <option value="3">Đi lại</option>
                                    <option value="4">Du lịch</option>
                                    <option value="5">Ăn uống</option>
                                    <option value="6">Mua sắm</option>
                                    <option value="7">Tiền nước</option>
                                    <option value="8">Chi tiêu khác</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={Math.round(spendAmount != null ? spendAmount : 0).toLocaleString('vi-VN')}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
                                        setSpendAmount(Number(value)); // Store as a number
                                    }}
                                    onBlur={() => setSpendAmount(Math.round(spendAmount != null ? spendAmount : 0))}
                                    className={styles.inputLo}
                                    required
                                    autoComplete="off"
                                />
                                <label htmlFor="email" className={styles.text}>
                                    Số tiền 
                                </label>
                            </div>
                        </div>

                        

                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className={`${styles.inputLo}`} 
                                placeholderText="Chọn ngày" // Thêm thuộc tính placeholderText
                            />
                            </div>
                        </div>

                        

                        <div onClick={createNewSpendType} className="mt-3 w-full p-2 light-yellow-bg text-white rounded-[0.78rem] transition-opacity duration-300 hover:opacity-50 justify-center flex items-center cursor-pointer">Thêm loại chi tiêu</div>
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
                <div className={styles.tableContainer}>
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
                            <tr key={-1} className="relative hover:bg-[#fd3b003a] rounded-[10px] w-full">
                                <div className="absolute w-full h-full"></div>
                                <td className="py-3 px-4 flex items-center space-x-2 z-[100]">
                                    <div className={styles.nameIcon}>
                                        <div className={`${styles.bgrIcon} bg-[#eeeeee]`}>
                                            <FontAwesomeIcon icon={faDog} className={styles.iconTable} />
                                        </div>
                                        <p>Mặc định</p>
                                    </div>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                {/* <td className="py-3 px-4">{item.estimatedAmount.toLocaleString("vi-VN")} VND</td>
                                <td className={`py-3 px-4 ${item.spent > item.estimatedAmount ? "text-red-500" : "text-green-500"}`}>
                                    {item.spent.toLocaleString("vi-VN")} VND
                                </td>
                                <td className={styles.btnTble}>
                                    <button onClick={() => showModal(item)} className={styles.editBtn}>
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                    <button className={styles.deleteBtn} onClick={() => handleDeleteClick(item)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </td> */}
                            </tr>
                            {filteredSpendTypes.slice(1).map((item, index) => (
                                <tr key={index} className="relative hover:bg-[#fd3b003a] rounded-[10px]">
                                    <td className="py-3 px-4 flex items-center space-x-2 z-[100]">
                                        <div className={styles.nameIcon}>
                                            <div style={{ backgroundColor: item.color.colorCode }} className={styles.bgrIcon}>
                                                <FontAwesomeIcon icon={getIconFromSvgUrl(item.icon.svgUrl)} className={styles.iconTable} />
                                            </div>
                                            <p>{item.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">{Math.round(item.estimatedAmount).toLocaleString("vi-VN")} VND</td>
                                    <td className={`py-3 px-4 ${item.spent > item.estimatedAmount ? "text-red-500" : "text-green-500"}`}>
                                        {Math.round(item.spent).toLocaleString("vi-VN")} VND
                                    </td>
                                    <td className={styles.btnTble}>
                                        <button onClick={() => showModal(item)} className={styles.editBtn}>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button className={styles.deleteBtn} onClick={() => handleDeleteClick(item)}>
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

            {/* Modal Chỉnh Sửa Lịch Sử Chi Tiêu */}
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
                        <p className={styles.titleMobal}>Chỉnh Sửa Lịch Sử Chi Tiêu</p>
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Tên khoản chi tiêu</label>
                        <input type="text" value={editType} placeholder="Write here..." onChange={(e) => setEditType(e.target.value)} name="name" className={styles.inputMobal} />
                    </div>

                    <div className={styles.coolinput}>
                        <select id="expenseType" 
                                className={styles.inputMobal} 
                                onChange={(e) => setEditAbbre(e.target.value)}
                                value={editAbbre}
                                name="symbol"
                                >
                                    <option value="">Chọn loại chi tiêu</option>
                                    <option value="1">Tiền nhà</option>
                                    <option value="2">Tiền điện</option>
                                    <option value="3">Đi lại</option>
                                    <option value="4">Du lịch</option>
                                    <option value="5">Ăn uống</option>
                                    <option value="6">Mua sắm</option>
                                    <option value="7">Tiền nước</option>
                                    <option value="8">Chi tiêu khác</option>
                                </select>
                    </div>

                    <div className={styles.coolinput}>
                            <DatePicker
                                selected={editStartDate}
                                onChange={(date) => setEditStartDate(date)}
                                name="name"
                                dateFormat="dd/MM/yyyy"
                                className={styles.inputMobal} 
                                placeholderText="Chọn ngày" // Thêm thuộc tính placeholderText
                            />
                    </div>

                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Số tiền dự tính</label>
                        <input type="text" value={Math.round(editSpendAmount).toLocaleString("vi-VN")} placeholder="Write here..." 
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
                            setEditSpendAmount(Number(value)); // Store as a number
                        }}
                        onBlur={() => setEditSpendAmount(Math.round(editSpendAmount))}
                        name="money" className={styles.inputMobal} />
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