import Image from 'next/image';
// import { useRouter } from 'next/router';

const SideBar = () => {
    // const router = useRouter();

    // const handleClick = () => {
    //     router.push('/');
    // };
    return (
        <div className="px-3 py-8 flex flex-col items-center border-r-gray-200 border-r-[1px] gap-3">
            <div className="icon">
                <Image src="/icons/menu_sidebar/Category.svg" alt="logo" width={20} height={20} />
            </div>
            <div className="icon">
                <Image src="/icons/menu_sidebar/Star.svg" alt="logo" width={20} height={20} />
            </div>
            <div className="icon">
                <Image src="/icons/menu_sidebar/Paper.svg" alt="logo" width={20} height={20} />
            </div>
            <div className="icon">
                <Image src="/icons/menu_sidebar/Chart.svg" alt="logo" width={20} height={20} />
            </div>
            <div className="icon">
                <Image src="/icons/menu_sidebar/Ticket.svg" alt="logo" width={20} height={20} />
            </div>
            <div className="icon">
                <Image src="/icons/menu_sidebar/Setting.svg" alt="logo" width={20} height={20} />
            </div>

            {/* <div className="absolute bottom-[20px] brown-background" onClick={handleClick}> */}
            <div className="absolute bottom-[20px] brown-background">
                <Image src="/icons/menu_sidebar/Logout.svg" alt="logo" width={20} height={20} />
            </div>
        </div>
    );
};

export default SideBar;
