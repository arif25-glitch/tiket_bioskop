import { Head } from '@inertiajs/react';
import RegisterForm from '@/Components/LoginUser/Register';
import Navbar from '@/Components/Global/Navbar';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <Navbar />
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100/40">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden">
                    <RegisterForm />
                </div>
            </div>
        </>
    );
}
