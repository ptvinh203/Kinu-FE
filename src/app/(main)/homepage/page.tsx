/* eslint-disable @next/next/no-img-element */
"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import styles from './homepage.module.scss'
import React, { useState, useEffect } from 'react';
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
import CurrentBalance from '@/components/CurrentBalance';

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

    const [loading, setLoading] = useState(true);  // State to handle loading
    interface Icon {
        id: string;
        name: string;
        svgUrl: string;
    }

    interface Color {
        colorCode: string;
    }

    interface TypeSpending {
        id: number;
        name: string;
        estimatedAmount: number;
        abbreviation: string;
        color: Color;
        icon: Icon;
    }

    interface Expenditure {
        id: number;
        name: string;
        amount: number;
        dateSpinding: string;
        typeSprinding: TypeSpending;
        paymentType: boolean;
    }

    const [expenditure, setExpenditure] = useState<Expenditure[]>([]);

    const totalAmount = expenditure.reduce((acc, item) => acc + Number(item.amount), 0);

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

            setSpendTypes(updatedData);  // Set the modified data to state
        } finally {
            setLoading(false);
        }
    };


    // useEffect to call API when component mounts
    useEffect(() => {
        fetchSpendTypes();
        fetchExpenditure();
    }, []);


    if (loading) {
        return <p>Loading spend types...</p>;
    }
    return (
        <div className="flex w-full h-full p-0 space-x-10 tao-bg">
            {/* Sidebar Thêm loại chi tiêu */}
            <div className="w-[25%] p-5 pink-bg rounded-lg h-full flex flex-col justify-between">
                <CurrentBalance reload />

                <div>
                    <h3 className="text-[15px] mb-3 font-bold" style={{ color: 'red' }}>Các Khoản Chi Gần Nhất</h3>
                    <hr />
                    <div className={styles.historyToday}>
                        {expenditure.slice(0, 3).map((e, index) => (
                            <div className={styles.item}
                                key={index}>
                                <div className={styles.icon} style={{ backgroundColor: e.typeSprinding.color.colorCode }}>
                                    <FontAwesomeIcon icon={getIconFromSvgUrl(e.typeSprinding.icon.svgUrl)} />
                                </div>
                                <div className={styles.txt}>
                                    <p className={styles.nametxt}>{e.name}</p>
                                    <p className={styles.statustxt} style={{ color: '#00ff4c' }}>
                                        Giao dịch thành công
                                    </p>
                                </div>
                                <div
                                    className={styles.money}
                                    style={{
                                        color: 'red'
                                    }}
                                >
                                    <p>{(Math.round(e.amount != null ? e.amount : 0)).toLocaleString('vi-VN')}</p>
                                    <p style={{ paddingLeft: '5px' }}>VNĐ</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Bảng các loại chi tiêu */}
            <div className="w-2/3 flex flex-col h-full">

                <div className={styles.chart}>
                    <div className={styles.imgChart}>
                        {/* <img src="/img/home.png" alt="" width={500} height={500}/> */}
                        <div className={styles.headChart}>
                            <img src="img/s1.png" alt="" width={150} />
                            <div className={styles.totalhead}>
                                <p className={styles.txtTotal}>{totalAmount.toLocaleString('vi-VN')} VND</p>
                                <p>Tổng chi tiêu</p>
                            </div>
                        </div>
                        <hr style={{ margin: '10px' }} />
                        <img src="img/s2.png" alt="" width={350} />
                        <div className={styles.bodyChart}>
                            <div className={styles.totalBody}>
                                <p className={styles.titleTxt}>Chi tiêu tuần này</p>
                                <p className={styles.moneyTxt}>{totalAmount.toLocaleString('vi-VN')} VND</p>
                                <img src="img/s4.png" alt="" width={125} />
                            </div>
                            <img src="img/s3.png" alt="" width={150} className={styles.imgChart3} />
                        </div>
                    </div>
                    <div className={styles.category}>
                        <div className={styles.headCate}>
                            <p className={styles.txthead}>Các Loại Chi Tiêu</p>
                        </div>
                        <div className={styles.contentCate}>
                            {spendTypes.slice(0, 8).map((item, index) => (
                                <div className={styles.iconBack} key={index}>
                                    <div className={styles.icon} style={{ backgroundColor: item.color.colorCode }}>
                                        <FontAwesomeIcon icon={getIconFromSvgUrl(item.icon.svgUrl)} />
                                    </div>
                                    <p className={styles.txtIcon}>{item.name}</p>
                                </div>
                            ))}
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

                    <div className={`${styles.tableContainer} h-full`}>
                        <table className="min-w-full tao-bg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Tên Chi Tiêu</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Loại Thanh Toán</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Ngày Tháng</th>
                                    <th className="text-left py-3 px-4 font-semibold text-sm">Số Tiền</th>
                                </tr>
                            </thead>
                            <tbody className={styles.bodyTbl}>
                                {expenditure.map((item, index) => (
                                    <tr key={index} className="relative hover:bg-[#fd3b003a] rounded-[10px]">
                                        <td className="py-3 px-4 flex items-center space-x-2 z-[100]">
                                            <div className={styles.nameIcon}>
                                                <div style={{ backgroundColor: item.typeSprinding.color.colorCode }} className={styles.bgrIcon}>
                                                    <FontAwesomeIcon icon={getIconFromSvgUrl(item.typeSprinding.icon.svgUrl)} className={styles.iconTable} />
                                                </div>
                                                <p>{item.name}</p>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">{item.paymentType === true ? 'Ví điện tử' : 'Tiền mặt'}</td>
                                        <td className="py-3 px-4">{new Date(item.dateSpinding).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
                                        <td className="py-3 px-4">{Math.round(item.amount).toLocaleString("vi-VN")} VND</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpendType;