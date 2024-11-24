"use client";

import { ReactNode, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem('userId')) {
            router.push('/homepage');
        }
    }, [router])

    return (
        <div>
            <div className="auth-background">
                <Image
                    src="/icons/bg.svg"
                    alt="background"
                    width={200}
                    height={200}
                    className="absolute bottom-0 left-0 w-[70%]"
                />
            </div>
            <div className="flex justify-between px-20">
                <div className="w-[40%] py-20 flex flex-col gap-5">
                    <div className="flex items-center gap-10">
                        <Image src="/icons/logo.svg" alt="logo" width={160} height={160} />
                        <div className="text-white logo-weight text-[50px]">KinU</div>
                    </div>
                    <div>
                        <div className="text-white description-weight text-[20px]">
                            Tài chính của bạn có thể hơi rối
                        </div>
                        <div className="text-white description-weight text-[20px]">
                            Nhưng đừng lo, KinU đã sẵn sàng giải cứu!
                        </div>
                    </div>
                </div>
                <div className="w-[60%] flex justify-end">{children}</div>
            </div>
        </div>
    );
};

export default Layout;
