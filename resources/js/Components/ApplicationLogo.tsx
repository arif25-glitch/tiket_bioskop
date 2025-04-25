import { SVGProps } from 'react';

export default function ApplicationLogo(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Replace this with your actual logo SVG path data */}
            <path
                d="M24 4C12.95 4 4 12.95 4 24C4 35.05 12.95 44 24 44C35.05 44 44 35.05 44 24C44 12.95 35.05 4 24 4ZM24 36C16.27 36 10 29.73 10 22H14C14 27.52 18.48 32 24 32C29.52 32 34 27.52 34 22H38C38 29.73 31.73 36 24 36Z"
                fill="currentColor" // Use currentColor to inherit color via className
            />
            {/* Example of a simple film reel icon part */}
            <circle cx="24" cy="24" r="4" fill="currentColor" />
            <rect x="6" y="22" width="4" height="4" fill="currentColor" />
            <rect x="38" y="22" width="4" height="4" fill="currentColor" />
            <rect x="22" y="6" width="4" height="4" fill="currentColor" />
            <rect x="22" y="38" width="4" height="4" fill="currentColor" />
        </svg>
    );
}
