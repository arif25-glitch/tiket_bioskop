import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Types for seat status
type SeatStatus = 'available' | 'selected' | 'occupied' | 'disabled';

interface SeatProps {
    id: string;
    status: SeatStatus;
    type: 'regular' | 'premium' | 'vip';
    onClick: () => void;
    disabled: boolean;
}

interface SeatMapProps {
    selectedSeats: string[];
    onSeatClick: (id: string, type: 'regular' | 'premium' | 'vip', price: number) => void;
    seatPrices: {
        regular: number;
        premium: number;
        vip: number;
    };
    maxSeats: number;
}

// A single seat component
const Seat: React.FC<SeatProps> = ({ id, status, type, onClick, disabled }) => {
    // Determine styles based on seat status and type
    const getBackgroundColor = () => {
        if (status === 'occupied') return 'bg-gray-400';
        if (status === 'selected') {
            if (type === 'vip') return 'bg-purple-600';
            if (type === 'premium') return 'bg-blue-600';
            return 'bg-green-600';
        }
        
        if (type === 'vip') return 'bg-purple-100';
        if (type === 'premium') return 'bg-blue-100';
        return 'bg-green-100';
    };
    
    const getHoverEffect = () => {
        if (status === 'occupied' || disabled) return '';
        
        if (type === 'vip') return 'hover:bg-purple-500 hover:border-purple-600';
        if (type === 'premium') return 'hover:bg-blue-500 hover:border-blue-600';
        return 'hover:bg-green-500 hover:border-green-600';
    };
    
    const getBorderColor = () => {
        if (status === 'occupied') return 'border-gray-500';
        if (status === 'selected') {
            if (type === 'vip') return 'border-purple-700';
            if (type === 'premium') return 'border-blue-700';
            return 'border-green-700';
        }
        
        if (type === 'vip') return 'border-purple-300';
        if (type === 'premium') return 'border-blue-300';
        return 'border-green-300';
    };

    return (
        <motion.button
            whileHover={{ scale: status !== 'occupied' && !disabled ? 1.1 : 1 }}
            whileTap={{ scale: status !== 'occupied' && !disabled ? 0.95 : 1 }}
            onClick={onClick}
            disabled={status === 'occupied' || disabled}
            className={`
                w-8 h-8 rounded-t-lg border-2 
                ${getBackgroundColor()} 
                ${getHoverEffect()}
                ${getBorderColor()}
                transition-colors duration-200
                ${disabled ? 'cursor-not-allowed opacity-60' : status === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'}
                hover:text-white
                flex items-center justify-center text-xs font-medium
            `}
            title={`Kursi ${id}${status === 'occupied' ? ' (Sudah dibooking)' : ''}${disabled ? ' (Maksimal kursi tercapai)' : ''}`}
        >
            {id.split('-')[1]}
        </motion.button>
    );
};

// Generate mock seat data
const generateSeats = () => {
    // Rows from A to J
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    // Seats per row - 14 seats (7 on each side with aisle in the middle)
    const seatsPerRow = 14;
    
    const seats = [];
    
    for (const row of rows) {
        const rowSeats = [];
        for (let i = 1; i <= seatsPerRow; i++) {
            // Create a gap in the middle (after seat 7)
            if (i === 8) {
                rowSeats.push({ id: `${row}-aisle`, type: 'aisle' });
            }
            
            // Randomize some seats as occupied (about 20%)
            const isOccupied = Math.random() < 0.2;
            
            // Determine seat type based on row
            let type: 'regular' | 'premium' | 'vip' = 'regular';
            if (['A', 'B'].includes(row)) {
                type = 'vip';
            } else if (['C', 'D', 'E'].includes(row)) {
                type = 'premium';
            }
            
            rowSeats.push({
                id: `${row}-${i}`,
                status: isOccupied ? 'occupied' : 'available',
                type,
            });
        }
        seats.push(rowSeats);
    }
    
    return seats;
};

export default function SeatMap({ selectedSeats, onSeatClick, seatPrices, maxSeats }: SeatMapProps) {
    // Generate seat data
    const [seatMap, setSeatMap] = useState(() => generateSeats());
    
    // Update seat status when selectedSeats changes
    useEffect(() => {
        setSeatMap(prevSeatMap => prevSeatMap.map(row => 
            row.map(seat => {
                if (seat.type === 'aisle') return seat;
                return {
                    ...seat,
                    status: selectedSeats.includes(seat.id) 
                        ? 'selected' 
                        : seat.status === 'occupied' ? 'occupied' : 'available'
                };
            })
        ));
    }, [selectedSeats]);
    
    // Handle seat click
    const handleSeatClick = (id: string, type: 'regular' | 'premium' | 'vip') => {
        const price = seatPrices[type];
        onSeatClick(id, type, price);
    };
    
    return (
        <div className="flex flex-col items-center space-y-3">
            {seatMap.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2 items-center">
                    {/* Row label on the left */}
                    <div className="w-6 text-center text-gray-500 font-medium">
                        {row[0].id.split('-')[0]}
                    </div>
                    
                    <div className="flex space-x-1">
                        {row.map((seat, seatIndex) => (
                            seat.type === 'aisle' ? (
                                <div key={`aisle-${rowIndex}-${seatIndex}`} className="w-4" />
                            ) : (
                                <Seat 
                                    key={seat.id} 
                                    id={seat.id} 
                                    status={seat.status as SeatStatus} 
                                    type={seat.type as 'regular' | 'premium' | 'vip'} 
                                    onClick={() => handleSeatClick(seat.id, seat.type as 'regular' | 'premium' | 'vip')} 
                                    disabled={selectedSeats.length >= maxSeats && !selectedSeats.includes(seat.id)}
                                />
                            )
                        ))}
                    </div>
                    
                    {/* Row label on the right */}
                    <div className="w-6 text-center text-gray-500 font-medium">
                        {row[0].id.split('-')[0]}
                    </div>
                </div>
            ))}
        </div>
    );
}
