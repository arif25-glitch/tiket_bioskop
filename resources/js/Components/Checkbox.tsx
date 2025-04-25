import { InputHTMLAttributes } from 'react';

export default function Checkbox({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            // Apply modern styling: rounded, blue focus ring, blue check color
            className={
                'rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
