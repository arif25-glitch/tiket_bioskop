import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Navbar from '@/Components/Global/Navbar';
import Footer from '@/Components/Global/Footer';
import SeatMap from '@/Components/Booking/SeatMap';
import SeatLegend from '@/Components/Booking/SeatLegend';
import BookingSummary from '@/Components/Booking/BookingSummary';
import { ArrowLeft, Clock, Calendar, Info } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

// Mock movie data - would come from the backend in a real application
const movieData = {
    id: 1,
    title: "Avengers: Endgame",
    image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    rating: "PG-13",
    duration: "3h 1m",
    date: "Sabtu, 24 Jun 2023",
    time: "19:00",
    theater: "CGV Paris Van Java",
    room: "Auditorium 1",
    price: {
        regular: 50000,
        premium: 75000,
        vip: 125000,
    }
};

interface SeatSelection {
    id: string;
    type: 'regular' | 'premium' | 'vip';
    price: number;
}

export default function SeatSelection({ auth }: PageProps) {
    const [selectedSeats, setSelectedSeats] = useState<SeatSelection[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const maxSeats = 6; // Maximum seats a user can select
    
    const { data, setData, post, processing, errors } = useForm({
        movieId: movieData.id,
        selectedSeats: [],
        totalPrice: 0,
        showDate: movieData.date,
        showTime: movieData.time,
    });
    
    useEffect(() => {
        // Update form data when selectedSeats changes
        setData({
            ...data,
            selectedSeats: selectedSeats.map(seat => seat.id),
            totalPrice: selectedSeats.reduce((sum, seat) => sum + seat.price, 0)
        });
    }, [selectedSeats]);
    
    const handleSeatClick = (id: string, type: 'regular' | 'premium' | 'vip', price: number) => {
        setSelectedSeats(prev => {
            // If already selected, remove it
            if (prev.some(seat => seat.id === id)) {
                return prev.filter(seat => seat.id !== id);
            }
            
            // If max seats reached, don't add more
            if (prev.length >= maxSeats) {
                return prev;
            }
            
            // Add the new seat
            return [...prev, { id, type, price }];
        });
    };
    
    const handleSubmit = () => {
        setIsSubmitting(true);
        post(route('booking.process'), {
            onSuccess: () => {
                // Redirect happens via Inertia
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title={`Pilih Kursi - ${movieData.title}`} />
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="mx-auto max-w-7xl pt-4 pb-16 px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link 
                            href={route('movies.show', movieData.id)} 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span>Kembali ke detail film</span>
                        </Link>
                    </div>

                    {/* Movie Information Summary */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Movie poster */}
                                <div className="w-full md:w-1/4 lg:w-1/6">
                                    <div className="aspect-[2/3] rounded-lg overflow-hidden">
                                        <img 
                                            src={movieData.image} 
                                            alt={movieData.title}
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                </div>
                                
                                {/* Movie details */}
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{movieData.title}</h1>
                                    <div className="flex items-center text-sm text-gray-600 mb-4">
                                        <span className="inline-block px-2 py-1 bg-gray-100 rounded-md mr-3">{movieData.rating}</span>
                                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {movieData.duration}</span>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Bioskop</h3>
                                            <p className="text-base text-gray-900">{movieData.theater}</p>
                                            <p className="text-sm text-gray-600">{movieData.room}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-500">Jadwal</h3>
                                            <div className="flex items-center text-base text-gray-900">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                <span>{movieData.date}</span>
                                            </div>
                                            <div className="flex items-center text-base text-gray-900">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>{movieData.time} WIB</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-blue-600 mt-2">
                                        <Info className="h-4 w-4 mr-1" />
                                        <span>Silakan pilih kursi di bawah (maksimal {maxSeats} kursi)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left column: Seat Map */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                {/* Screen Visualization */}
                                <div className="mb-10 text-center">
                                    <div className="h-6 bg-gradient-to-t from-gray-200 to-transparent rounded-t-full mb-1"></div>
                                    <div className="w-3/4 mx-auto h-2 bg-gray-400 rounded-lg shadow-lg mb-2"></div>
                                    <p className="text-sm text-gray-500">LAYAR</p>
                                </div>
                                
                                {/* Seat Selection Area */}
                                <SeatMap 
                                    selectedSeats={selectedSeats.map(seat => seat.id)} 
                                    onSeatClick={handleSeatClick}
                                    seatPrices={movieData.price}
                                    maxSeats={maxSeats}
                                />
                                
                                {/* Legend for seat types */}
                                <div className="mt-8">
                                    <SeatLegend />
                                </div>
                            </div>
                        </div>

                        {/* Right column: Booking Summary */}
                        <div className="w-full lg:w-1/3">
                            <BookingSummary 
                                selectedSeats={selectedSeats}
                                totalPrice={data.totalPrice}
                                formatPrice={formatPrice}
                                onSubmit={handleSubmit}
                                isSubmitting={isSubmitting || processing}
                                maxSeats={maxSeats}
                                errors={errors}
                            />
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}
