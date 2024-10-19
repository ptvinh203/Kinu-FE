import Image from 'next/image';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center gap-8 flex-col pt-[50px]">
      <Image src="/icons/logo.svg" alt="logo" width={200} height={200} />
      <div className="flex justify-center items-center gap-0 flex-col">
        <div className="dark-yellow-text logo-weight text-[55px]">KinU</div>
        <div className="light-yellow-text description-weight text-[18px]">Tài chính gọn gàng, đừng hoang mang!</div>
      </div>
      <button className="button">Bắt đầu ngay</button>
    </div>
  );
};

export default HomePage;
