"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem('userId')) {
      router.push('/homepage');
    }
  }, [router])

  return (
    <div className="flex justify-center items-center gap-8 flex-col pt-[50px]" style={{ width: '100vw', height: '100vh' }}>
      <Image src="/icons/logo.svg" alt="logo" width={200} height={200} />
      <div className="flex justify-center items-center gap-0 flex-col">
        <div className="dark-yellow-text logo-weight text-[55px]">KinU</div>
        <div className="light-yellow-text description-weight text-[18px]">Tài chính gọn gàng, đừng hoang mang!</div>
      </div>
      <button className="button" onClick={() => router.push('/login')}>Bắt đầu ngay</button>
    </div>
  );
};

export default HomePage;
