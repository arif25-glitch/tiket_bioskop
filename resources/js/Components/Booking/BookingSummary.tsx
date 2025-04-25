import { motion } from 'framer-motion';

interface SeatSelection {
    id: string;
    type: 'regular' | 'premium' | 'vip';
    price: number;
}

interface BookingSummaryProps {
    selectedSeats: SeatSelection[];
    totalPrice: number;
    formatPrice: (price: number) => string;
    onSubmit: () => void;
    isSubmitting: boolean;
    maxSeats: number;
    errors: Record<string, string>;
}

export default function BookingSummary({ 
    selectedSeats, 
    totalPrice, 
    formatPrice, 
    onSubmit, 
    isSubmitting,
    maxSeats,
    errors
}: BookingSummaryProps) {
    const seatTypeLabels = {
        regular: 'Regular',
        premium: 'Premium',
        vip: 'VIP',
    };
    
    const getSeatBadgeColor = (type: 'regular' | 'premium' | 'vip') => {
        switch (type) {
            case 'vip': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'premium': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-green-100 text-green-800 border-green-200';
        }
    };
    
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h2>
            
            {/* Selected seats list */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Kursi Terpilih:</h3>
                
                {selectedSeats.length === 0 ? (
                    <div className="p-4 bg-gray-50 rounded-lg text-center text-gray-500">
                        Pilih kursi (maksimal {maxSeats})
                    </div>
                ) : (
                    <div className="space-y-3">
                        {selectedSeats.map((seat) => (
                            <motion.div 
                                key={seat.id} 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center">
                                    <span className="font-medium text-gray-800">{seat.id}</span>
                                    <span className={`ml-2 text-xs px-2 py-1 rounded-full border ${getSeatBadgeColor(seat.type)}`}>
                                        {seatTypeLabels[seat.type]}
                                    </span>
                                </div>
                                <span className="text-gray-700">{formatPrice(seat.price)}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Price breakdown */}
            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Jumlah Kursi</span>
                    <span className="text-gray-800 font-medium">{selectedSeats.length}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Biaya Layanan</span>
                    <span className="text-gray-800 font-medium">{formatPrice(5000 * selectedSeats.length)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                    <span className="text-gray-900">Total Pembayaran</span>
                    <span className="text-blue-600">{formatPrice(totalPrice + 5000 * selectedSeats.length)}</span>
                </div>
            </div>
            
            {/* Display any errors */}
            {Object.keys(errors).length > 0 && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                    <ul className="list-disc list-inside">
                        {Object.entries(errors).map(([key, error]) => (
                            <li key={key}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            {/* Submit button */}
            <motion.button
                whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                onClick={onSubmit}
                disabled={selectedSeats.length === 0 || isSubmitting}
                className={`
                    w-full py-3 rounded-lg font-medium text-white text-center
                    ${selectedSeats.length === 0 || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                    transition-colors duration-200
                `}
            >
                {isSubmitting ? (
                    <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Memproses...</span>
                    </div>
                ) : (
                    'Lanjutkan ke Pembayaran'
                )}
            </motion.button>
            
            <p className="mt-3 text-xs text-gray-500 text-center">
                Dengan melanjutkan, Anda setuju dengan syarat dan ketentuan yang berlaku.
            </p>
        </div>
    );
}
