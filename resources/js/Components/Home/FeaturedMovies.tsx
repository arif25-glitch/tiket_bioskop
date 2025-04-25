import { motion } from 'framer-motion';

// Placeholder data - replace with actual movie data fetching
const movies = [
    {
        id: 1,
        title: 'Film Keren 1',
        imageUrl: 'https://via.placeholder.com/300x450/92c952',
        genre: 'Aksi',
    },
    {
        id: 2,
        title: 'Drama Menyentuh',
        imageUrl: 'https://via.placeholder.com/300x450/771796',
        genre: 'Drama',
    },
    {
        id: 3,
        title: 'Komedi Kocak',
        imageUrl: 'https://via.placeholder.com/300x450/24f355',
        genre: 'Komedi',
    },
    {
        id: 4,
        title: 'Petualangan Seru',
        imageUrl: 'https://via.placeholder.com/300x450/f66b97',
        genre: 'Petualangan',
    },
];

export default function FeaturedMovies() {
    const sectionVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.section
            id="featured"
            // Use a very light gray or white background
            className="bg-gray-50 py-16"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Sedang Tayang & Segera Hadir
                </h2>
                <motion.div
                    className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                    }}
                >
                    {movies.map((movie) => (
                        <motion.div
                            key={movie.id}
                            // White background for cards, refined shadow
                            className="overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl"
                            variants={cardVariants}
                            whileHover={{ scale: 1.03, y: -5 }} // Subtle lift effect
                        >
                            <img
                                src={movie.imageUrl}
                                alt={movie.title}
                                className="h-auto w-full object-cover" // Adjust height as needed
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {movie.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {movie.genre}
                                </p>
                                {/* Use primary color for link */}
                                <a
                                    href="#"
                                    className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                                >
                                    Lihat Detail & Pesan
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}
