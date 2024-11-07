"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import axios from 'axios';
import styles from './homepage.module.scss'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CarOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

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
    faLayerGroup, faUsers, faGamepad, faBusinessTime,
    IconDefinition
} from '@fortawesome/free-solid-svg-icons';

const SpendType: React.FC = () => {
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

    const getIconFromSvgUrl = (svgUrl: string): IconDefinition => {

        const icon = iconMapping[svgUrl];

        if (icon) {
            return icon;
        } else {
            return faDog;  // Fallback icon if not found
        }
    };

    const [spendTypes, setSpendTypes] = useState([
        { id: 1, name: 'Tiền nhà', estimatedAmount: 3000000, spent: 3000000, color: { id: 1, name: "", colorCode: "" }, icon: { id: 1, name: "", svgUrl: "" } },
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
    const [spendName, setSpendName] = useState('');
    const [spendType, setSpendType] = useState("");
    const [spendAmount, setSpendAmount] = useState<any>();
    const [abbre, setAbbre] = useState("");
    const [loading, setLoading] = useState(true);  // State to handle loading
    const totalEstimated = loading ? spendTypes.reduce((total, item) => total + item.estimatedAmount, 0) : 0;

    const [editId, setEditId] = useState<any>();
    const [editType, setEditType] = useState<any>();
    const [editSpendAmount, setEditSpendAmount] = useState<any>();
    const [editAbbre, setEditAbbre] = useState<any>();
    const [editColor, setEditColor] = useState<any>();
    const [editIcon, setEditIcon] = useState<any>();

    const [expenditure, setExpenditure] = useState([
        {
            id: 0,
            name: "",
            amount: 0,
            dateSpinding: "",
            typeSprinding: {
                id: 0,
                name: "",
                estimatedAmount: 0,
                abbreviation: "",
                colorCode: "",
                svgUrl: "",
            }
        }
    ]);

    const fetchExpenditure = async () => {
        try {
            // Fetch data from API
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/expenditure?userId=${userId}`);
            console.log("API Response: ", response.data);  // Log the response data

            const data = response.data.data;
            const updatedData = data.map((item: any) => ({
                ...item,  // Spread the existing properties of the item
                spent: 0  // Initialize `spent` to 0 or any value you want
            }));
            console.log(updatedData)

            setExpenditure(updatedData);  // Set the modified data to state
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

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


    // useEffect to call API when component mounts
    useEffect(() => {
        fetchSpendTypes();
        fetchExpenditure();
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

    const options = [
        { value: 'Tiền nhà', label: 'Tiền nhà' },
        { value: 'Tiền điện', label: 'Tiền điện' },
        { value: 'Tiền nước', label: 'Tiền nước' },
        { value: 'Ăn uống', label: 'Ăn uống' },
    ];

    const value = -9000000.0;

    if (loading) {
        return <p>Loading spend types...</p>;
    }
    return (
        <div className="flex w-full h-full p-0 space-x-10 tao-bg">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-[25%] p-5 pink-bg rounded-lg h-full flex flex-col justify-between">
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
                    <h3 className="text-[15px] mb-3 font-bold" style={{ color: 'red' }}>Các Khoản Chi Gần Nhất</h3>
                    <hr />
                    <div className={styles.historyToday}>
                        <p className={styles.title}>Hôm nay</p>
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faCar} />
                            </div>
                            <div className={styles.txt}>
                                <p className={styles.nametxt}>Tiền Điện Tháng 8</p>
                                <p className={styles.statustxt} style={{ color: '#00ff4c' }}>Giao dịch thành công</p>
                            </div>
                            <div className={styles.money} style={{ color: value > 0 ? '#00ff4c' : value < 0 ? 'red' : 'black' }}>
                                <p>{value.toLocaleString()}</p>
                                <p style={{ paddingLeft: '5px' }}>VNĐ</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.historyToday}>
                        <p className={styles.title}>Hôm nay</p>
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faCar} />
                            </div>
                            <div className={styles.txt}>
                                <p className={styles.nametxt}>Tiền Điện Tháng 8</p>
                                <p className={styles.statustxt} style={{ color: '#00ff4c' }}>Giao dịch thành công</p>
                            </div>
                            <div className={styles.money} style={{ color: value > 0 ? '#00ff4c' : value < 0 ? 'red' : 'black' }}>
                                <p>{value.toLocaleString()}</p>
                                <p style={{ paddingLeft: '5px' }}>VNĐ</p>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.icon}>
                                <FontAwesomeIcon icon={faCar} />
                            </div>
                            <div className={styles.txt}>
                                <p className={styles.nametxt}>Tiền Điện Tháng 8</p>
                                <p className={styles.statustxt} style={{ color: '#00ff4c' }}>Giao dịch thành công</p>
                            </div>
                            <div className={styles.money} style={{ color: value > 0 ? '#00ff4c' : value < 0 ? 'red' : 'black' }}>
                                <p>{value.toLocaleString()}</p>
                                <p style={{ paddingLeft: '5px' }}>VNĐ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bảng các loại chi tiêu */}
            <div className="w-2/3 flex flex-col h-full">

                <div className={styles.chart}>
                    <div className={styles.imgChart}>
                        <img src="/img/home.png" alt="" width={500} height={500} />
                    </div>
                    <div className={styles.category}>
                        <div className={styles.headCate}>
                            <p className={styles.txthead}>Các Loại Chi Tiêu</p>
                        </div>
                        <div className={styles.contentCate}>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: '#fd443b' }}>
                                    <FontAwesomeIcon icon={faHouse} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: '#4807EA' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: 'yellow' }}>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack} >
                                <div className={styles.icon} style={{ backgroundColor: '#56CCF2' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: 'purple' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: '#EF5DA8' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: 'green' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                            <div className={styles.iconBack}>
                                <div className={styles.icon} style={{ backgroundColor: '#56CCF2' }}>
                                    <FontAwesomeIcon icon={faCar} />
                                </div>
                                <p className={styles.txtIcon}>Tiền nhà</p>
                            </div>
                        </div>
                    </div>
                </div>
                <table>
                    <div className={styles.headtbl}>
                        <div className={styles.titletbl}>
                            <p className={styles.titleTbl}>Các Khoản Chi Trong Tháng</p>
                            <p className={styles.titleTbl1}>Hoạt động hàng tháng</p>
                        </div>
                        <Link href="/spendhistory" className={styles.titleTbl2}>
                            Xem Tất Cả
                        </Link>
                    </div>
                </table>
                <div className={styles.tableContainer}>
                    
                    <div className={styles.tableContainer}>
                        <table className="min-w-full tao-bg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Tên Chi Tiêu</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Loại Thanh Toán</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Ngày Tháng</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm"></th>
                                </tr>
                            </thead>
                            <tbody className={styles.bodyTbl}>
                                {expenditure.map((item, index) => (
                                    <tr key={index} className="relative hover:bg-[#fd3b003a] rounded-[10px]">
                                        <td className="py-3 px-4 flex items-center space-x-2 z-[100]">
                                            <div className={styles.nameIcon}>
                                                <div style={{ backgroundColor: item.typeSprinding.colorCode }} className={styles.bgrIcon}>
                                                    <FontAwesomeIcon icon={getIconFromSvgUrl(item.typeSprinding.svgUrl)} className={styles.iconTable} />
                                                </div>
                                                <p>{item.name}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{item.typeSprinding.name}</td>
                                        <td className="py-3 px-4">{new Date(item.dateSpinding).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                        <td className="py-3 px-4">{Math.round(item.amount).toLocaleString("vi-VN")} VND</td>

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