import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Navbar from '@/Components/Global/Navbar';
import Footer from '@/Components/Global/Footer';
import Login from '@/Components/LoginUser/Login';
import Register from '@/Components/LoginUser/Register';
import { PageProps } from '@/types';
import ApplicationLogo from '@/Components/ApplicationLogo';

// Define props if needed, e.g., for canResetPassword
interface UserLoginProps extends PageProps {
    canResetPassword?: boolean;
    status?: string;
}

export default function UserLoginIndex({ canResetPassword = false, status }: UserLoginProps) {
    const [isLoginView, setIsLoginView] = useState(true);
    const slideVariants: Variants = {
        enter: (isLogin: boolean) => ({
            x: isLogin ? '-100%' : '100%',
            opacity: 0,
            position: 'absolute' as 'absolute',
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative' as 'relative',
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
        exit: (isLogin: boolean) => ({
            x: isLogin ? '100%' : '-100%',
            opacity: 0,
            position: 'absolute' as 'absolute',
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }),
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Animated gradient background - Updated with new colors */}
            <div className="fixed inset-0 animate-gradient-slow" 
                style={{
                    background: 'linear-gradient(-45deg, #2269e9, #1a8ed0, #07b3d5)',
                    backgroundSize: '200% 200%',
                }}
            >
                {/* Decorative elements - Updated color values to match new scheme */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl"></div>
                    <div className="absolute right-20 top-1/4 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
                    <div className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl"></div>
                    
                    {/* Floating circles - Keeping these with updated opacity */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                        className="absolute top-1/4 left-1/5 h-16 w-16 rounded-full border border-white/20 bg-white/5"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 7,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: 1,
                        }}
                        className="absolute top-2/3 right-1/4 h-24 w-24 rounded-full border border-white/20 bg-white/5"
                    />
                </div>
            </div>

            <Head title={isLoginView ? 'Masuk Akun' : 'Daftar Akun Baru'} />
            <Navbar />

            {/* Main Content Area */}
            <main className="relative flex flex-1 flex-col items-center justify-center p-6 pb-16 z-10">
                {/* Logo with animation */}
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="mb-8"
                >
                    <ApplicationLogo className="h-16 w-auto fill-current text-white drop-shadow-lg" />
                </motion.div>

                {/* Card Container with glass morphism effect */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-full max-w-md overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl px-6 py-8 shadow-xl ring-1 ring-white/20 sm:px-8 sm:py-8"
                >
                    {/* Container for the sliding forms */}
                    <div className="relative overflow-hidden" style={{ minHeight: isLoginView ? "440px" : "600px" }}>
                        <AnimatePresence initial={false} custom={isLoginView} mode="wait">
                            <motion.div
                                key={isLoginView ? 'login' : 'register'}
                                custom={isLoginView}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full"
                            >
                                {isLoginView ? (
                                    <Login status={status} canResetPassword={canResetPassword} />
                                ) : (
                                    <Register />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Toggle Button */}
                    <motion.div 
                        className="mt-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.button
                            onClick={() => setIsLoginView(!isLoginView)}
                            className="inline-block text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 focus:outline-none"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isLoginView
                                ? 'Belum punya akun? Daftar di sini'
                                : 'Sudah punya akun? Masuk di sini'}
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Optional decorative elements at the bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center text-sm text-white/70"
                >
                    © 2023 Tiket Bioskop. All rights reserved.
                </motion.div>
            </main>

            <style>{`
                @keyframes gradient-slow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient-slow {
                    animation: gradient-slow 15s ease infinite;
                }
            `}</style>
            
            <Footer />
        </div>
    );
}

