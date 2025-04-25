import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        // Use a light background, center content vertically and horizontally
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 p-6 sm:p-0">
            {/* Logo Link */}
            <div className="mb-8">
                <Link href="/">
                    <ApplicationLogo className="h-16 w-auto fill-current text-blue-600" />
                </Link>
            </div>

            {/* Card Container */}
            <div className="w-full max-w-md overflow-hidden rounded-xl bg-white/80 backdrop-blur-md px-6 py-8 shadow-xl ring-1 ring-gray-200/50 sm:px-10 sm:py-10">
                {children}
            </div>
        </div>
    );
}
