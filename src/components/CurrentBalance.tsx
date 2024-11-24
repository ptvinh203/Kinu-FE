import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CurrentBalanceProps {
    reload: boolean;
}

const CurrentBalance = ({ reload }: CurrentBalanceProps) => {
    const [currentBalance, setCurrentBalance] = useState(0);
    const [walletId, setWalletId] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccount = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/account/id?id=${localStorage.getItem('userId')}`)
            if (res && res.data && res.data.data) {
                setCurrentBalance(Number(res.data.data.currentBalance))
            }
        }

        setWalletId(localStorage.getItem('walletId'))
        fetchAccount()
    }, [reload])


    return (
        <div className="mb-3 p-2 bg-yellow-300 rounded-lg light-yellow-bg relative overflow-hidden">
            <Image className="absolute right-0 top-0 pl-[320px] h-[100%] min-h-[150px]" src="/icons/spendtype/decoration.svg" alt="decoration" width={430} height={500} />
            <div className="top-0 right-0 left-0 bottom-0 flex flex-col gap-2 px-4 py-4 z-[10]">
                <h2 className="text-[13px] font-semibold">SỐ DƯ HIỆN TẠI</h2>
                <div className="flex gap-5">
                    <Image className="" src="/icons/spendtype/wallet.svg" alt="decoration" width={50} height={50} />
                    <div>
                        <p
                            style={{
                                fontSize: '110%',
                                fontWeight: 'bold'
                            }}
                        >{currentBalance.toLocaleString('vi-VN')} VND</p>
                        <p className="text-sm font-md">Tổng số tiền</p>
                    </div>
                </div>
                <div className='text-[13px]'>
                    Ví điện tử:
                    {
                        walletId != null
                            ? <span className="text-[#008080]"> Đã liên kết</span>
                            : <span className="text-red-600"> Chưa liên kết</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default CurrentBalance;