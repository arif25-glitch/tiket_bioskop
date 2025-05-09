import { Head } from '@inertiajs/react';
import LoginForm from '@/Components/LoginUser/Login';
import Navbar from '@/Components/Global/Navbar';

interface Props {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Login" />
            <Navbar />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100/40">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden">
                    <LoginForm status={status} canResetPassword={canResetPassword} />
                </div>
            </div>
        </>
    );
}
