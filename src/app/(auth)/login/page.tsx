"use client";

import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu

    // Hàm xử lý khi người dùng nhấn nút "Login"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Kiểm tra xem email và password có được nhập hay không
        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        setError("");
        console.log("email:", email);
        console.log("Mat khau:", password);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email,
            password
        })
        .then(res => {
            console.log(res)
            localStorage.setItem('userId', res.data.data.id)
            router.push('/spendtype')
        })
        .catch(err => {
            console.log(err)
            toast.error(err.response.data.message)
        })
    };

    return (
        <div className="relative w-full flex flex-col justify-end items-start gap-0 pl-[250px]">
            <div className={styles.container}>
                <div className={styles.headLo}>
                    <p className={styles.headTxt}>Xin chào,</p>
                    <p className={styles.headTxt}>Rất vui được gặp lại</p>
                </div>
                <div className={styles.enterLo}>
                    <p className={styles.abc}>Đăng nhập để tiếp tục</p>
                    <form onSubmit={handleSubmit} className={styles.containerLo}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.inputLo}
                                required
                                autoComplete="off"
                            />
                            <label htmlFor="email" className={styles.text}>
                                Email
                            </label>
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputLo}
                                required
                            />
                            <label htmlFor="password" className={styles.text}>
                                Nhập mật khẩu của bạn
                            </label>
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>
                        {error && (
                            <p style={{ color: "#440000", fontSize: "10px" }}>{error}</p>
                        )}
                        <div className={styles.content}>
                            <a href="/forgot" className={styles.passLink}>
                                Quên mật khẩu?
                            </a>
                        </div>
                        <button className={styles.btnLo} type="submit">
                            Đăng nhập
                        </button>
                    </form>
                    <div className={styles.regisLink}>
                        <p className={styles.textRegis}>Chưa có tài khoản?</p>
                        <a href="#" className={styles.linkRegis}>
                            Đăng ký
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.triangleDown}></div>
        </div>
    );
};

export default Login;
