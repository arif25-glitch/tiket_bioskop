import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function CallToAction() {
    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const buttonHover = {
        scale: 1.05,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)', // Slightly stronger shadow on hover
        transition: { type: 'spring', stiffness: 400, damping: 10 },
    };

    return (
        <motion.section
            // Use a primary color gradient, adjust text color
            className="bg-gradient-to-r from-blue-600 to-cyan-500 py-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Siap Menonton Film Favoritmu?
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                    Jangan lewatkan keseruan film-film terbaru. Daftar atau
                    masuk sekarang untuk mulai memesan tiket.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                    {/* Button 1: White background, primary text color */}
                    <motion.div whileHover={buttonHover}>
                        <Link
                            href={route('user.register')}
                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-sm hover:bg-blue-50 sm:w-auto"
                        >
                            Daftar Gratis
                        </Link>
                    </motion.div>
                    {/* Button 2: Transparent background, white border/text */}
                    <motion.div whileHover={buttonHover}>
                        <Link
                            href={route('user.login')}
                            className="inline-flex w-full items-center justify-center rounded-md border border-white px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-white/10 sm:w-auto"
                        >
                            Masuk Akun
                        </Link>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
