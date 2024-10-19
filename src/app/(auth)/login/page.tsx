import Image from 'next/image';

const Login = () => {
    return (
        <div className="flex justify-end items-start">
            <Image src="/icons/auth_form_bg.svg" alt="logo" width={430} height={500} />
        </div>
    );
};

export default Login;
