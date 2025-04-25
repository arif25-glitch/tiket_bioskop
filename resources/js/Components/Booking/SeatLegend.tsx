export default function SeatLegend() {
    const legendItems = [
        { label: 'Regular', color: 'bg-green-100 border-green-300' },
        { label: 'Premium', color: 'bg-blue-100 border-blue-300' },
        { label: 'VIP', color: 'bg-purple-100 border-purple-300' },
        { label: 'Terpilih', color: 'bg-green-600 border-green-700' },
        { label: 'Sudah dibooking', color: 'bg-gray-400 border-gray-500' },
    ];

    return (
        <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Keterangan Kursi:</h3>
            <div className="flex flex-wrap gap-4">
                {legendItems.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <div className={`w-6 h-6 rounded-t-md border-2 ${item.color} mr-2`}></div>
                        <span className="text-sm text-gray-600">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
