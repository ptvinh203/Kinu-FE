"use client";

import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import { 
  SearchOutlined,
  SunOutlined,
  CarOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  HeartOutlined,
  PrinterOutlined
 } from '@ant-design/icons';
import { successNotification } from "../../../components/Notification/index"
import styles from './editSpen.module.scss';

const Page: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    successNotification("Chỉnh sửa thành công");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Danh sách các màu sắc
  const colorOptions = [
    { id: 1, name: 'Đỏ', color: '#FF0000' },
    { id: 2, name: 'Xanh dương', color: '#0000FF' },
    { id: 3, name: 'Xanh lá', color: '#00FF00' },
    { id: 4, name: 'Vàng', color: '#FFFF00' },
    { id: 5, name: 'Tím', color: '#800080' },
    { id: 6, name: 'Xanh lá', color: '#00FF00' },
    { id: 7, name: 'Vàng', color: '#FFFF00' },
    { id: 8, name: 'Tím', color: '#800080' },
  ];

  const iconOptions = [
    { id: 1, name: 'Tìm kiếm', icon: <SearchOutlined /> },
    { id: 2, name: 'Mặt trời', icon: <SunOutlined /> },
    { id: 3, name: 'Xe hơi', icon: <CarOutlined /> },
    { id: 4, name: 'Giỏ hàng', icon: <ShoppingCartOutlined /> },
    { id: 5, name: 'Nhà', icon: <HomeOutlined /> },
    { id: 6, name: 'Trái tim', icon: <HeartOutlined /> },
    { id: 7, name: 'Máy in', icon: <PrinterOutlined /> },
  ];

  return (
    <div className={styles.container}>
      <Button type="primary" onClick={showModal}>
        Mở Modal
      </Button>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="30%"
        className={styles.mobalEditSpen}
      >
        <div className={styles.containerMobal}>
          <div className={styles.headMobal}>
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
            <p className={styles.titleMobal}>Chỉnh Sửa Loại Chi Tiêu</p>
          </div>
          <div className={styles.coolinput}>
            <label htmlFor="input" className={styles.text}>Tên loại chi tiêu</label>
            <input type="text" placeholder="Write here..." name="name" className={styles.inputMobal} />
          </div>
          <div className={styles.coolinput}>
            <label htmlFor="input" className={styles.text}>Số tiền dự tính</label>
            <input type="text" placeholder="Write here..." name="money" className={styles.inputMobal} />
          </div>
          <div className={styles.coolinput}>
            <label htmlFor="input" className={styles.text}>Ký hiệu viết tắt</label>
            <input type="text" placeholder="Write here..." name="symbol" className={styles.inputMobal} />
          </div>
          <div className={styles.coolinput}>
            <label htmlFor="input" className={styles.text}>Biểu tượng</label>
            <div className={styles.colorOptions}>
              {iconOptions.map(icon => (
                <div
                key={icon.id}
                className={`${styles.colorItem} ${selectedColor === icon.name ? styles.selected : ''}`}
                onClick={() => setSelectedColor(icon.name)}
              >
                <span className={styles.colorName}>{icon.icon}</span>
              </div>
              ))}
            </div>
          </div>
          <div className={styles.coolinput}>
            <label htmlFor="input" className={styles.text}>Màu sắc</label>
            <div className={styles.colorOptions}>
              {colorOptions.map(color => (
                <div
                  key={color.id}
                  className={`${styles.colorItem} ${selectedColor === color.name ? styles.selected : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                  style={{ backgroundColor: color.color }}
                >
                </div>
              ))}
            </div>
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

export default Page;
