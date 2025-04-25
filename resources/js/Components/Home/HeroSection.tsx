import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function HeroSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            // Stagger children including the image
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
    };

    // Variant for the image
    const imageVariants = {
        hidden: { scale: 1.1, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 0.6, // Slightly increased base opacity, overlay will darken it
            transition: { duration: 1.2, ease: 'easeOut' }, // Slightly longer duration
        },
    };

    return (
        <motion.section
            // Keep min-h-screen and relative positioning
            className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 py-20 text-gray-800" // Fallback bg if image fails
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background Image */}
            <motion.img
                src="/storage/img/dragons-fantasy-artificial-intelligence-image.jpg"
                alt="Hero Background"
                className="absolute inset-0 z-0 h-full w-full object-cover" // Cover the section
                variants={imageVariants}
                // Ensure image loads after initial container animation
            />
            {/* Darker Overlay */}
            <div className="absolute inset-0 z-0 bg-black/40"></div> {/* Adjusted overlay */}

            {/* Optional: Adjust background pattern opacity or remove if image is primary */}
            {/* <div className="absolute inset-0 z-0 opacity-10"> ... </div> */}

            {/* Text Content - Ensure z-index is higher than image/overlay */}
            <div className="relative z-10 mx-auto max-w-4xl text-center">
                <motion.h1
                    // Use white text for better contrast on dark background
                    className="mb-6 text-4xl font-extrabold tracking-tight text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_30%)] sm:text-5xl md:text-6xl"
                    variants={itemVariants}
                >
                    Pesan Tiket Bioskop{' '}
                    {/* Adjust gradient if needed for contrast */}
                    <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Lebih Mudah
                    </span>
                </motion.h1>
                <motion.p
                    // Lighter text color for contrast
                    className="mb-8 text-lg text-gray-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_20%)] sm:text-xl"
                    variants={itemVariants}
                >
                    Temukan film terbaru, pilih kursi favoritmu, dan nikmati
                    pengalaman menonton tanpa antre. Semuanya dalam genggaman.
                </motion.p>
                {/* ... existing button ... */}
                {/* Button styling might need adjustment for contrast */}
                <motion.div variants={itemVariants}>
                    <Link
                        href={route('register')}
                        className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900" // Added focus styles
                    >
                        Mulai Nonton Sekarang
                    </Link>
                </motion.div>
            </div>
        </motion.section>
    );
}
