"use client"

import { useState } from 'react';
import styles from './wallet.module.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Wallet = () => {
  const router = useRouter();
  // State variables for each input
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pinCode, setPin] = useState('');
  const [walletId, setWalletId] = useState(localStorage.getItem('walletId'));

  // Function to handle linking payment
  const linkPayment = async () => {
    const userId = localStorage.getItem('userId');

    if (phoneNumber === '') {
      toast.error('Vui lòng nhập số điện thoại')
      return;
    }

    if (pinCode === '') {
      toast.error('Vui lòng nhập mã PIN')
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ewallet`, {
        userId,
        phone: phoneNumber,
        otp,
        pinCode,
        balance: "5000000"
      });

      const data = response.data.data;
      console.log('Linked Successfully:', data);
      localStorage.setItem('walletId', data.id)
      setWalletId(data.id)
      toast.success('Liên kết thành công')
      router.push('/spendhistory')
    } catch (error) {
      console.error('Error linking payment:', error);
      toast.error(error.response.data.message);
    }
  };

  const unLink = async () => {
    const walletId = localStorage.getItem('walletId');
    try {

      // Send the DELETE request
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/ewallet/unlink/${walletId}`, {
      });

      console.log(response);
      toast.success("Hủy liên kết thành công");
      localStorage.removeItem('walletId')
      setWalletId(null);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Đã xảy ra lỗi khi hủy liên kết");
      }
    }
  };

  return (
    <div className="flex w-full h-full p-0 space-x-10 tao-bg">
      {/* Sidebar */}
      <div className="w-[25%] p-5 pink-bg rounded-lg h-full">
        <div className="mt-3 w-full p-2 light-yellow-bg text-white rounded-[0.78rem] transition-opacity duration-300 hover:opacity-50 justify-center flex items-center cursor-pointer">
          Liên kết với tài khoản MoMo
        </div>
        <div className="mt-3 w-full p-2 bg-white text-black rounded-[0.78rem] transition-opacity duration-300 hover:opacity-50 justify-center flex items-center cursor-pointer" onClick={unLink}>
          Hủy liên kết
        </div>
      </div>

      {/* Main form */}
      <div className={styles.form}>
        <p className={styles.titleTbl}>Số điện thoại đăng kí MoMo</p>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="Nhập số điện thoại đăng kí MoMo"
            value={phoneNumber} // Bind value to state
            onChange={(e) => setPhoneNumber(e.target.value)} // Update state on change
          />
          <button className={styles.otpButton}>Gửi OTP</button>
        </div>

        {/* <p className={styles.titleTbl}>Mã OTP</p>
        <div className={styles.inputGroup}>
          <input
            type="number"
            placeholder="Nhập mã OTP"
            value={otp} // Bind value to state
            onChange={(e) => setOtp(e.target.value)} // Update state on change
          />
        </div> */}

        <p className={styles.titleTbl}>Mã PIN MoMo</p>
        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Nhập mã PIN"
            value={pinCode} // Bind value to state
            onChange={(e) => setPin(e.target.value)} // Update state on change
          />
        </div>

        <button
          onClick={linkPayment} // Call linkPayment when clicked
          className="mt-3 w-full p-2 light-yellow-bg text-white rounded-[0.78rem] transition-opacity duration-300 hover:opacity-50 justify-center flex items-center cursor-pointer"
          disabled={walletId !== null}
        >
          {walletId !== null ? 'Đã liên kết' : 'Liên kết'}
        </button>
      </div>

      {/* Logo MOMO */}
      <div className={styles.logoContainer}>
        <img src="/icons/momo-logo.svg" alt="MoMo Logo" className={styles.logo} />
      </div>
    </div>
  );
};

export default Wallet;
