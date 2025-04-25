import { motion } from 'framer-motion';
import { Search, CalendarCheck, Ticket, Popcorn } from 'lucide-react'; // Example icons

const steps = [
    {
        icon: Search,
        title: 'Cari Film',
        description: 'Jelajahi film terbaru atau cari judul favoritmu.',
    },
    {
        icon: CalendarCheck,
        title: 'Pilih Jadwal & Kursi',
        description: 'Tentukan tanggal, waktu, dan posisi duduk terbaik.',
    },
    {
        icon: Ticket,
        title: 'Bayar & Dapatkan Tiket',
        description: 'Selesaikan pembayaran aman dan terima e-tiketmu.',
    },
    {
        icon: Popcorn,
        title: 'Nikmati Film!',
        description: 'Tunjukkan e-tiket di bioskop dan selamat menonton!',
    },
];

export default function HowItWorks() {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const stepVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
    };

    return (
        <motion.section
            id="how-it-works"
            className="bg-white py-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Pesan Tiket Semudah 1-2-3
                </h2>
                <motion.div
                    className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
                    variants={{
                        visible: { transition: { staggerChildren: 0.2 } },
                    }}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            variants={stepVariants}
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-900">
                                {step.title}
                            </h3>
                            <p className="text-gray-600">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
