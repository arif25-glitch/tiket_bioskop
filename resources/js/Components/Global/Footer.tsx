import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        // Light gray background
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="flex items-center">
                            {/* Primary color logo */}
                            <ApplicationLogo className="h-10 w-auto text-blue-600" />
                            <span className="ml-3 text-xl font-semibold text-gray-800">
                                Tiket Bioskop
                            </span>
                        </Link>
                        <p className="text-base text-gray-500">
                            Pesan tiket bioskop online cepat, mudah, dan aman.
                        </p>
                        <div className="flex space-x-6">
                            {/* Adjusted icon colors */}
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Navigasi
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li>
                                        <Link
                                            href="#featured"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            Film
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="#how-it-works"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            Cara Pesan
                                        </Link>
                                    </li>
                                    {/* Add more links */}
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Bantuan
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            FAQ
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            Hubungi Kami
                                        </a>
                                    </li>
                                    {/* Add more links */}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                                    Legal
                                </h3>
                                <ul role="list" className="mt-4 space-y-4">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            Kebijakan Privasi
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-base text-gray-500 hover:text-gray-900"
                                        >
                                            Syarat & Ketentuan
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {/* Removed empty div from original structure if it existed */}
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; {new Date().getFullYear()} Tiket Bioskop. Semua
                        hak dilindungi undang-undang.
                    </p>
                </div>
            </div>
        </footer>
    );
}
