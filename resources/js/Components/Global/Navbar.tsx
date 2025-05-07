import { Link, usePage } from '@inertiajs/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Search, X } from 'lucide-react';

export default function Navbar() {
    const { auth } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });
    const scrollThreshold = [0, 0.02];
    const navBg = useTransform(scrollYProgress, scrollThreshold, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.85)"]);
    const navBackdropBlur = useTransform(scrollYProgress, scrollThreshold, ["blur(0px)", "blur(12px)"]);
    const navBorder = useTransform(scrollYProgress, scrollThreshold, ["rgba(236, 239, 241, 0)", "rgba(229, 231, 235, 0.5)"]);
    const navShadow = useTransform(scrollYProgress, scrollThreshold, ["0 0 #0000", "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"]);
    const progressBarOpacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        // Add search logic here (e.g., debounce and call API)
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.1 } },
    };
    const linkHover = {
        scale: 1.05,
        color: '#1D4ED8',
        originX: 0,
        transition: { type: 'spring', stiffness: 400, damping: 15 },
    };
    const buttonHover = {
        scale: 1.03,
        boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.2)',
        transition: { type: 'spring', stiffness: 400, damping: 15 },
    };
    const logoHover = {
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 0.5 }
    }
    // Animation for search focus
    const searchFocusVariant = {
        scale: 1.02,
        boxShadow: '0px 0px 8px rgba(59, 130, 246, 0.4)', // Blue focus shadow
    };


    return (
        <>
            <motion.nav
                style={{
                    backgroundColor: navBg,
                    backdropFilter: navBackdropBlur,
                    WebkitBackdropFilter: navBackdropBlur,
                    borderColor: navBorder,
                    boxShadow: navShadow,
                }}
                className="sticky top-0 z-50 border-b"
                variants={navVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Main flex container for desktop */}
                    <div className="flex h-16 items-center justify-between">

                        {/* Left Section: Logo & Nav Links (Desktop) */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {/* Logo */}
                            <motion.div whileHover={logoHover}>
                                <Link href="/" className="flex shrink-0 items-center">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600" />
                                    <span className="ml-3 text-lg font-bold tracking-tight text-gray-800">
                                        Tiket Bioskop
                                    </span>
                                </Link>
                            </motion.div>
                            {/* Navigation Links */}
                            <motion.div whileHover={linkHover}>
                                <Link
                                    href="#featured"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700"
                                >
                                    Film Unggulan
                                </Link>
                            </motion.div>
                            <motion.div whileHover={linkHover}>
                                <Link
                                    href="#how-it-works"
                                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700"
                                >
                                    Cara Kerja
                                </Link>
                            </motion.div>
                        </div>

                        {/* Center Section: Search Input (Desktop) */}
                        <div className="hidden md:flex md:flex-1 md:justify-center md:px-8 lg:px-16">
                            <motion.div
                                className="relative w-full max-w-md"
                                whileFocus={searchFocusVariant} // Apply animation on focus within the div
                            >
                                <input
                                    type="text"
                                    placeholder="Cari film, bioskop..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    // Enhanced styling for search bar
                                    className="w-full rounded-full border border-gray-300/60 bg-gray-100/70 px-4 py-2 pl-11 text-sm text-gray-800 placeholder-gray-500 shadow-inner transition duration-300 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                {searchTerm && (
                                    <button
                                        onClick={clearSearch}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
                                        aria-label="Clear search"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                )}
                            </motion.div>
                        </div>

                        {/* Right Section: Auth Links (Desktop) */}
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {auth.user ? (
                                <motion.div whileHover={buttonHover}>
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                </motion.div>
                            ) : (
                                <>
                                    <motion.div whileHover={linkHover}>
                                        <Link
                                            href={route('user.login')}
                                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700"
                                        >
                                            Masuk
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={buttonHover}>
                                        <Link
                                            href={route('user.register')}
                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                                        >
                                            Daftar
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Mobile: Logo (aligned left) */}
                        <div className="flex items-center md:hidden">
                            <motion.div whileHover={logoHover}>
                                <Link href="/" className="flex shrink-0 items-center">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-blue-600" />
                                    {/* Optionally hide text on very small screens if needed */}
                                    <span className="ml-2 text-lg font-bold tracking-tight text-gray-800">
                                        Tiket Bioskop
                                    </span>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile: Menu & Search Toggles (aligned right) */}
                        <div className="-mr-2 flex items-center md:hidden">
                            {/* ... mobile buttons ... */}
                            <button
                                onClick={toggleSearch}
                                type="button"
                                className="mr-2 inline-flex items-center justify-center rounded-md bg-gray-100/50 p-2 text-gray-500 hover:bg-gray-200/70 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-label="Toggle search"
                            >
                                <Search className="h-6 w-6" />
                            </button>
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md bg-gray-100/50 p-2 text-gray-500 hover:bg-gray-200/70 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                aria-controls="mobile-menu"
                                aria-expanded={isOpen}
                            >
                                <span className="sr-only">Buka menu utama</span>
                                {isOpen ? (
                                    <X className="block h-6 w-6" />
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Input Area */}
                <motion.div
                    className={`${isSearchOpen ? 'block' : 'hidden'} border-t border-gray-200/50 bg-white/95 p-4 md:hidden`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isSearchOpen ? 'auto' : 0,
                        opacity: isSearchOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cari film..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full rounded-md border border-gray-300/70 bg-white/80 px-3 py-2 pl-10 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                                aria-label="Clear search"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Mobile Menu */}
                <motion.div
                    className={`${isOpen ? 'block' : 'hidden'} border-t border-gray-200/50 bg-white/95 backdrop-blur-md md:hidden`}
                    id="mobile-menu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Link href="#featured" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700" onClick={() => setIsOpen(false)}>Film Unggulan</Link>
                        <Link href="#how-it-works" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700" onClick={() => setIsOpen(false)}>Cara Kerja</Link>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700" onClick={() => setIsOpen(false)}>Dashboard</Link>
                        ) : (
                            <>
                                <Link href={route('user.login')} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-700" onClick={() => setIsOpen(false)}>Masuk</Link>
                                <Link href={route('user.register')} className="block rounded-md bg-blue-600 px-3 py-2 text-base font-medium text-white hover:bg-blue-700" onClick={() => setIsOpen(false)}>Daftar</Link>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.nav>
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed left-0 right-0 top-[64px] z-40 h-1 origin-[0%] bg-blue-600"
                style={{ scaleX, opacity: progressBarOpacity }}
            />
        </>
    );
}
