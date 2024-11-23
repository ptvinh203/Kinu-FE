"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './sidebar.module.scss';

const SideBar = () => {
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    // Make sure the code that uses useRouter() runs only on the client side
    useEffect(() => {
        setIsClient(true);
    }, []);

    const icons = [
        { src: "/icons/menu_sidebar/Category.svg", alt: "Category", route: "/homepage" },
        { src: "/icons/menu_sidebar/Star.svg", alt: "Star", route: "/spendtype" },
        { src: "/icons/menu_sidebar/Paper.svg", alt: "Paper", route: "/spendhistory" },
        { src: "/icons/menu_sidebar/Chart.svg", alt: "Chart", route: "/spendchar" },
        { src: "/icons/menu_sidebar/Ticket.svg", alt: "Ticket", route: "/wallet" },
        { src: "/icons/menu_sidebar/Setting.svg", alt: "Setting", route: "/spendtype" }
    ];

    const handleClick = (index: any) => {
        setSelectedIcon(index);
        if (isClient) {
            router.push(icons[index].route);  // Navigate to the associated route
        }
    };

    return (
        <div className="px-3 py-8 flex flex-col items-center border-r-gray-200 border-r-[1px] gap-3">
            {icons.map((icon, index) => (
                <div 
                    key={index} 
                    className={`${styles.icon} cursor-pointer ${selectedIcon === index ? styles.icon_select : styles.icon_hover}`} 
                    onClick={() => handleClick(index)}
                    style={{ color: selectedIcon === index ? 'white' : 'black' }}
                >
                    <img 
                        src={icon.src} 
                        alt={icon.alt} 
                        width={20} 
                        height={20} 
                        className={styles.icon_image}
                    />
                </div>
            ))}
            
            <div className="absolute bottom-[20px] brown-background">
                <Image src="/icons/menu_sidebar/Logout.svg" alt="Logout" width={20} height={20} />
            </div>
        </div>
    );
};

export default SideBar;
