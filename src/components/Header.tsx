import Image from 'next/image';

const Header = () => {
    return (
        <div className="flex justify-between items-center border-b-gray-200 border-b-[1px] ">
            <div className="px-5 py-3 flex gap-0">
                <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
                <div className="px-5 flex flex-col justify-center">
                    <div className="text-[20px] font-[500]">KinU</div>
                    <div className="text-[12px] font-[400]">Quản lý chi tiêu</div>
                </div>
            </div>
            <div className="px-5 flex justify-center items-center gap-3">
                <div className="icon">
                    <Image src="/icons/menu_header/notification.svg" alt="logo" width={20} height={20} />
                </div>
                <div className="icon">
                    <Image src="/icons/menu_header/chart.svg" alt="logo" width={20} height={20} />
                </div>
                <div className="avatar">
                    <Image src="/icons/menu_header/Photo.svg" alt="logo" width={50} height={50} />
                </div>
                <Image src="/icons/menu_header/dropdown.svg" alt="logo" width={30} height={30} />
            </div>

        </div>
    );
};

export default Header;
