"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Tooltip } from 'antd';
import Image from 'next/image';
import axios from 'axios';

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

import styles from './spendtype.module.scss'
import { successNotification } from "../../../components/Notification/index"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { userInfo } from 'os';
import CurrentBalance from '@/components/CurrentBalance';

const SpendType: React.FC = () => {
    const [spendTypes, setSpendTypes] = useState([
        { id: 1, name: 'Tiền nhà', estimatedAmount: 3000000, spentAmount: 3000000, color: { id: 1, name: "", colorCode: "" }, icon: { id: 1, name: "", svgUrl: "" } },
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
        setEditSpendAmount(item.estimatedAmount)
        setEditType(item.name)
    };

    const handleOk = () => {
        if (editType === "") {
            toast.error('Loại chi tiêu trống');
            return;
        }
        if (editSpendAmount === null || editSpendAmount === 0) {
            toast.error('Số tiền dự tính không hợp lệ');
            return;
        }
        if (editAbbre === "") {
            toast.error('Ký hiệu viết tắt trống');
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
        if (spendType === "") {
            toast.error('Vui lòng nhập loại chi tiêu')
            return
        }
        if (abbre === "") {
            toast.error('Vui lòng nhập ký hiệu viết tắt')
            return
        }
        if (spendAmount == null || spendAmount === 0) {
            toast.error('Vui lòng nhập số tiền dự tính')
            return
        }
        if (selectedColor === null) {
            toast.error('Vui lòng chọn màu')
            return
        }
        if (selectedIcon === null) {
            toast.error('Vui lòng chọn biểu tượng')
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
                toast.error("Bạn không thể xóa loại chi tiêu này vì đã có giao dịch sử dụng loại chi tiêu này");
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
            (item.estimatedAmount.toString().includes(searchTerm) || item.spentAmount.toString().includes(searchTerm));

        return matchesName || matchesAmount;
    });

    if (loading) {
        return <p>Loading spend types...</p>;
    }
    return (
        <div className="flex w-full h-full p-0 space-x-10 tao-bg">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-[25%] p-5 pink-bg rounded-lg h-full">
                <CurrentBalance />

                <div>
                    <h3 className="text-[15px] mb-3 font-bold">Thêm Loại Chi Tiêu</h3>
                    <form>
                        <div className="mb-3">
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    value={spendType}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSpendType(value);
                                        if (value === "") setAbbre("");
                                        else setAbbre(value.split(" ").map((word) => word[0].toUpperCase()).join(""));
                                    }}
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
                                    Số tiền dự tính trong tháng
                                </label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <Tooltip title='Ký hiệu viết tắt dùng để phân loại các khoản chi tiêu khi được tạo tự động'>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        value={abbre}
                                        onChange={(e) => setAbbre(e.target.value)}
                                        className={styles.inputLo}
                                        required
                                        autoComplete="off"
                                    />
                                    <label htmlFor="email" className={styles.text}>
                                        Ký hiệu viết tắt
                                    </label>
                                </div>
                            </Tooltip>
                        </div>

                        <div className={styles.coolinput}>
                            <label htmlFor="input" className={styles.text}>Biểu tượng</label>
                            <div className={styles.colorOptions}>
                                {icons.map(icon => (
                                    <div
                                        key={icon.id}
                                        className={`${styles.colorItem} ${selectedIcon === icon.id ? styles.selected : ''}`}
                                        onClick={() => setSelectedIcon(icon.id)}
                                    >
                                        <div className={styles.colorName}>
                                            <FontAwesomeIcon icon={getIconFromSvgUrl(icon.svgUrl)} />
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
                                        className={`${styles.colorItem} ${selectedColor === color.id ? styles.selected : ''}`}
                                        onClick={() => setSelectedColor(color.id)}
                                        style={{ backgroundColor: color.colorCode }}
                                    >
                                    </div>
                                ))}
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
                                <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Dự Kiến Trong Tháng</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền Đã Tiêu Trong Tháng</th>
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
                                        <p>Chi tiêu khác</p>
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
                                    <td className={`py-3 px-4 ${item.spentAmount > item.estimatedAmount ? "text-red-500" : "text-green-500"}`}>
                                        {Math.round(item.spentAmount).toLocaleString("vi-VN")} VND
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
                        <input type="text" value={editType} placeholder="Write here..." onChange={(e) => setEditType(e.target.value)} name="name" className={styles.inputMobal} />
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
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Ký hiệu viết tắt</label>
                        <input type="text" value={editAbbre} placeholder="Write here..." onChange={(e) => setEditAbbre(e.target.value)}
                            name="symbol" className={styles.inputMobal} />
                    </div>
                    <div className={styles.coolinput}>
                        <label htmlFor="input" className={styles.text}>Biểu tượng</label>
                        <div className={styles.colorOptions}>
                            {icons.map(icon => (
                                <div
                                    className={`${styles.colorItem} ${editIcon === icon.id ? styles.selected : ''}`}
                                    key={icon.id}
                                    onClick={() => { setEditIcon(icon.id) }}
                                >
                                    <FontAwesomeIcon icon={getIconFromSvgUrl(icon.svgUrl)} />
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
                                    className={`${styles.colorItem} ${editColor === color.id ? styles.selected : ''}`}
                                    onClick={() => { setEditColor(color.id) }}
                                    style={{ backgroundColor: color.colorCode }}
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