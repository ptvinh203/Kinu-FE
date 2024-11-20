"use client";

import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./register.module.scss";
import axios from "axios";      
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify"; 



const Register = () => {
    const router = useRouter(); // Khởi tạo router để điều hướng

    // Khởi tạo state cho email, password, thông báo lỗi và trạng thái hiển thị mật khẩu
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu
    const [showRepassword, setShowRepassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu nhập lại

    // Hàm xử lý khi người dùng nhấn nút "Đăng kí"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

        // Kiểm tra xem email và password có được nhập hay không
        if ( !name || !email || !password || !repassword) {
            setError("Please fill in");
            return;
        }

        if (password != repassword){
            setError("Re-enter password and password are not the same.");
            return;
        }

        // Xóa thông báo lỗi nếu trước đó đã có lỗi
        setError("");
        console.log("Name:", name);
        console.log("email:", email);
        console.log("Mat khau:", password);
        console.log("Mat khau nhap lai:", repassword);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
            email,
            password,
            username: "default",
            fullname: "full",
            phone: "000000",
            birthday: "2003-06-17",
            gender: "0"
        })
        .then(res => {
            console.log(res)
            // localStorage.setItem('userId', res.data.data.id)
            // router.push('/spendtype')
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
                    <p className={styles.headTxt}>Cùng bắt đầu nào</p>
                </div>
                <div className={styles.enterLo}>
                    <p className={styles.abc}>Hãy điền tất cả thông tin</p>
                    <form onSubmit={handleSubmit} className={styles.containerLo}>
                        {/* Nhập tên đăng nhập */}
                        <div className={styles.inputGroup}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.inputLo}
                                required
                                autoComplete="off"
                            />
                            <label htmlFor="email" className={styles.text}>
                                Tên đăng nhập
                            </label>
                        </div>

                        {/* Nhập email */}
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

                        {/* Nhập password */}
                        <div className={styles.inputGroup}>
                            <input
                                type={showPassword ? "text" : "password"} // Đổi giữa text và password dựa vào trạng thái
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.inputLo}
                                required
                            />
                            <label htmlFor="password" className={styles.text}>
                                Nhập mật khẩu 
                            </label>
                            {/* Nút toggle hiển thị/ẩn mật khẩu */}
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {/* Đổi icon dựa vào trạng thái showPassword */}
                                {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>


                        {/* Nhập lại password */}
                        <div className={styles.inputGroup}>
                            <input
                                type={showRepassword ? "text" : "password"} // Đổi giữa text và password dựa vào trạng thái
                                value={repassword}
                                onChange={(e) => setRepassword(e.target.value)}
                                className={styles.inputLo}
                                required
                            />
                            <label htmlFor="password" className={styles.text}>
                                Nhập lại mật khẩu 
                            </label>
                            {/* Nút toggle hiển thị/ẩn mật khẩu */}
                            <button
                                type="button"
                                className={styles.togglePassword}
                                onClick={() => setShowRepassword(!showRepassword)}
                            >
                                {/* Đổi icon dựa vào trạng thái showPassword */}
                                {showRepassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </button>
                        </div>

                        {/* Hiển thị lỗi nếu có */}
                        {error && (
                            <p style={{ color: "#440000", fontSize: "10px" }}>{error}</p>
                        )}

                        {/* Liên kết quên mật khẩu */}
                        <div className={styles.content}>
                            <a href="/forgot" className={styles.passLink}>
                                Quên mật khẩu?
                            </a>
                        </div>

                        {/* Nút đăng kí */}
                        <button className={styles.btnLo} type="submit">
                            Đăng kí
                        </button>
                    </form>

                    {/* Liên kết về trang đăng nhập */}
                    <div className={styles.regisLink}>
                        <p className={styles.textRegis}>Đã có tài khoản?</p>
                        <a href="/login" className={styles.linkRegis}>
                            Đăng nhập
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.triangleDown}></div>
        </div>
    );
};

// Export component để sử dụng ở các nơi khác
export default Register;
