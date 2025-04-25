import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Global/Navbar';
import HeroSection from '@/Components/Home/HeroSection';
import FeaturedMovies from '@/Components/Home/FeaturedMovies';
import HowItWorks from '@/Components/Home/HowItWorks';
import CallToAction from '@/Components/Home/CallToAction';
import Footer from '@/Components/Global/Footer';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Selamat Datang di Tiket Bioskop" />
            <div className="min-h-screen bg-gradient-to-b from-white via-sky-50 to-blue-50">
                <Navbar />

                {/* Added pt-16 */}
                <main className="">
                    <HeroSection />
                    <FeaturedMovies />
                    <HowItWorks />
                    <CallToAction />
                    {/* Add more sections as needed */}
                </main>

                <Footer />
            </div>
        </>
    );
}
