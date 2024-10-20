"use client";

import React, { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu

    // Hàm xử lý khi người dùng nhấn nút "Login"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra xem email và password có được nhập hay không
        if (!email || !password) {
            setError('Please fill in both email and password.');
        } else {
            setError('');
            console.log('email:', email);
            console.log('Mat khau:', password);
        }
    };

    return (
        <div className="flex justify-end items-start">
            <div className='container'>
                <div className='headLo'>
                    <p className='headTxt'>Xin chào,</p>
                    <p className='headTxt'>Rất vui được gặp lại</p>
                </div>
                <div className='enterLo'>
                    <p className='abc'>Đăng nhập để tiếp tục</p>
                    <form onSubmit={handleSubmit} className='containerLo'>
                        <div className='inputGroup'>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className='inputLo'
                                required
                                autoComplete="off"
                            />
                            <label htmlFor="email" className='text'>Email</label>
                        </div>
                        <div className='inputGroup'>
                            <input 
                                type={showPassword ? "text" : "password"} // Thay đổi type dựa trên showPassword
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className='inputLo'
                                required
                            />
                            <label htmlFor="password" className='text'>Password</label>
                            <button 
                                type="button" 
                                className="togglePassword" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>
                        {error && <p style={{ color: '#440000', fontSize: '10px' }}>{error}</p>} {/* Hiển thị thông báo lỗi nếu có */}
                        <div className="content">
                            <a href="/forgot" className="pass-link">Quên mật khẩu?</a>
                        </div>
                        <button className='btnLo' type="submit">Đăng nhập</button>
                    </form>
                    <div className='regisLink'>
                        <p className='textRegis'>Chưa có tài khoản</p>
                        <a href="https://cellphones.com.vn/sforum/wp-content/uploads/2024/04/anh-ma-kinh-di-20.jpg" className='linkRegis'>Đăng ký</a>
                    </div>
                </div>
                <div className="triangle-down"></div>
            </div>
        </div>
    );
};

export default Login;
