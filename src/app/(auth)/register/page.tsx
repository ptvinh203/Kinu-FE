"use client";

import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./register.module.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";



const Register = () => {
    const router = useRouter();

    // Khởi tạo state cho email, password, thông báo lỗi và trạng thái hiển thị mật khẩu
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu
    const [showRepassword, setShowRepassword] = useState(false); // Trạng thái để quản lý hiển thị mật khẩu nhập lại

    // Hàm xử lý khi người dùng nhấn nút "Đăng kí"
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form

        // Kiểm tra xem email và password có được nhập hay không
        if (!name || !email || !password || !repassword) {
            toast.error("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password != repassword) {
            toast.error("Mật khẩu không khớp!");
            return;
        }


        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
            username: name,
            email,
            password,
            fullname: "KinU",
            phone: "012345678",
            birthday: "2003-01-01",
            gender: 0
        })
            .then(res => {
                console.log(res)
                router.push('/login')
                toast.success("Đăng ký thành công");
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
