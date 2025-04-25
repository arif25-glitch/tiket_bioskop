import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Global/Navbar';
import Footer from '@/Components/Global/Footer';
import { ArrowLeft, CreditCard, Wallet, Clock } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import { motion } from 'framer-motion';

// This is just a skeleton for the payment page that would follow the seat selection
export default function BookingPayment({ 
    auth, 
    booking 
}: PageProps<{ 
    booking: {
        id: number;
        movieTitle: string;
        seats: string[];
        totalPrice: number;
        expiresAt: string;
    } 
}>) {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
    
    const { post, processing } = useForm();
    
    const paymentMethods = [
        { id: 'credit_card', name: 'Kartu Kredit/Debit', icon: CreditCard },
        { id: 'e_wallet', name: 'E-Wallet', icon: Wallet },
    ];
    
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };
    
    const handleSubmit = () => {
        if (!selectedPaymentMethod) return;
        
        post(route('booking.process-payment', booking.id), {
            data: {
                paymentMethodId: selectedPaymentMethod
            }
        });
    };
    
    // Calculate remaining time (in a real app, this would be based on server expiration time)
    const countdownMinutes = 15;
    
    return (
        <>
            <Head title="Pembayaran" />
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                
                <main className="mx-auto max-w-3xl pt-4 pb-16 px-4 sm:px-6">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link 
                            href={route('booking.select-seats', booking.id)} 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span>Kembali ke pemilihan kursi</span>
                        </Link>
                    </div>
                    
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
                        <p className="text-gray-600">Pilih metode pembayaran untuk menyelesaikan pemesanan</p>
                    </div>
                    
                    {/* Booking Timer */}
                    <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center">
                        <Clock className="h-5 w-5 text-yellow-600 mr-2" />
                        <div>
                            <p className="text-sm text-yellow-800">
                                Selesaikan pembayaran dalam <span className="font-medium">{countdownMinutes} menit</span>
                            </p>
                            <p className="text-xs text-yellow-700">Kursi Anda akan dilepas setelah waktu habis</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Payment methods */}
                        <div className="w-full md:w-2/3">
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pilih Metode Pembayaran</h2>
                                
                                <div className="space-y-3">
                                    {paymentMethods.map((method) => (
                                        <div 
                                            key={method.id}
                                            className={`
                                                p-4 border-2 rounded-lg cursor-pointer transition-all
                                                ${selectedPaymentMethod === method.id 
                                                    ? 'border-blue-500 bg-blue-50' 
                                                    : 'border-gray-200 hover:border-blue-300'}
                                            `}
                                            onClick={() => setSelectedPaymentMethod(method.id)}
                                        >
                                            <div className="flex items-center">
                                                <div className={`
                                                    p-2 rounded-full mr-3
                                                    ${selectedPaymentMethod === method.id ? 'bg-blue-100' : 'bg-gray-100'}
                                                `}>
                                                    <method.icon className={`h-5 w-5 ${selectedPaymentMethod === method.id ? 'text-blue-600' : 'text-gray-500'}`} />
                                                </div>
                                                <span className="font-medium text-gray-800">{method.name}</span>
                                                <div className="ml-auto">
                                                    <div className={`
                                                        w-5 h-5 rounded-full border-2
                                                        ${selectedPaymentMethod === method.id 
                                                            ? 'border-blue-500 bg-blue-500' 
                                                            : 'border-gray-300'
                                                        }
                                                        flex items-center justify-center
                                                    `}>
                                                        {selectedPaymentMethod === method.id && (
                                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Order summary */}
                        <div className="w-full md:w-1/3">
                            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                                
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Film</span>
                                        <span className="text-gray-800 font-medium">{booking.movieTitle}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Kursi</span>
                                        <span className="text-gray-800 font-medium">{booking.seats.join(', ')}</span>
                                    </div>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-semibold">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-blue-600">{formatPrice(booking.totalPrice)}</span>
                                    </div>
                                </div>
                                
                                <motion.button
                                    whileHover={!processing && selectedPaymentMethod ? { scale: 1.01 } : {}}
                                    whileTap={!processing && selectedPaymentMethod ? { scale: 0.98 } : {}}
                                    onClick={handleSubmit}
                                    disabled={!selectedPaymentMethod || processing}
                                    className={`
                                        w-full py-3 rounded-lg font-medium text-white text-center
                                        ${!selectedPaymentMethod || processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                                        transition-colors duration-200
                                    `}
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Memproses...</span>
                                        </div>
                                    ) : (
                                        'Bayar Sekarang'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </main>
                
                <Footer />
            </div>
        </>
    );
}
