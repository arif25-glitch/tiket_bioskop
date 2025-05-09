import { FormEventHandler, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useForm } from '@inertiajs/react';
import { AtSign, Lock, Eye, EyeOff, Check, AlertTriangle } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    // Focus the email input on component mount
    useEffect(() => {
        if (emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.doLogin'), {
            preserveScroll: true,
            onSuccess: () => {
                reset('password');
            },
            onError: (errors) => {
                if (errors.email) {
                    emailInputRef.current?.focus();
                } else if (errors.password) {
                    passwordInputRef.current?.focus();
                }
            },
        });
    };

    return (
        <div className="px-1">
            {/* Animated Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
            >
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                    Selamat Datang!
                </h2>
                <p className="mt-2 text-gray-600">
                    Masuk untuk melanjutkan
                </p>
            </motion.div>

            {/* Status message with animation */}
            <AnimatePresence>
                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6 rounded-lg flex items-center gap-2 bg-green-50 p-3 border border-green-100"
                    >
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <p className="text-sm font-medium text-green-700">{status}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={submit} className="space-y-6">
                {/* Email Field with Floating Label */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={`group relative h-14 rounded-xl border-2 transition-all duration-200 ${
                        errors.email 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'email' 
                                ? 'border-blue-400 bg-blue-50/30' 
                                : data.email 
                                    ? 'border-gray-300' 
                                    : 'border-gray-200 bg-gray-50/50'
                    }`}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <AtSign className={`h-5 w-5 transition-colors ${
                                focusedField === 'email' ? 'text-blue-600' : ''
                            }`} />
                        </div>
                        
                        <input
                            ref={emailInputRef}
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className={`peer h-full w-full rounded-xl border-none bg-transparent px-11 pt-2 outline-none ${
                                errors.email ? 'text-red-600' : 'text-gray-700'
                            }`}
                            onChange={(e) => setData('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        
                        <label 
                            htmlFor="email"
                            className={`absolute left-11 text-sm transition-all duration-200 
                                ${data.email || focusedField === 'email' 
                                    ? 'top-1 text-xs font-medium' 
                                    : 'top-1/2 -translate-y-1/2'
                                } ${
                                    errors.email 
                                        ? 'text-red-500' 
                                        : focusedField === 'email' 
                                            ? 'text-blue-700' 
                                            : 'text-gray-500'
                                }`}
                        >
                            Email
                        </label>
                    </div>
                    
                    {errors.email && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 flex items-center gap-x-1 text-sm text-red-500"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span>{errors.email}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Password Field with Floating Label */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className={`group relative h-14 rounded-xl border-2 transition-all duration-200 ${
                        errors.password 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'password' 
                                ? 'border-blue-400 bg-blue-50/30' 
                                : data.password 
                                    ? 'border-gray-300' 
                                    : 'border-gray-200 bg-gray-50/50'
                    }`}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Lock className={`h-5 w-5 transition-colors ${
                                focusedField === 'password' ? 'text-blue-600' : ''
                            }`} />
                        </div>
                        
                        <input
                            ref={passwordInputRef}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className={`peer h-full w-full rounded-xl border-none bg-transparent px-11 pt-2 outline-none ${
                                errors.password ? 'text-red-600' : 'text-gray-700'
                            }`}
                            onChange={(e) => setData('password', e.target.value)}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        
                        <label 
                            htmlFor="password"
                            className={`absolute left-11 text-sm transition-all duration-200 
                                ${data.password || focusedField === 'password' 
                                    ? 'top-1 text-xs font-medium' 
                                    : 'top-1/2 -translate-y-1/2'
                                } ${
                                    errors.password 
                                        ? 'text-red-500' 
                                        : focusedField === 'password' 
                                            ? 'text-blue-700' 
                                            : 'text-gray-500'
                                }`}
                        >
                            Password
                        </label>
                        
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    
                    {errors.password && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 flex items-center gap-x-1 text-sm text-red-500"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span>{errors.password}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Remember Me Row */}
                <motion.div 
                    className="flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <label className="flex cursor-pointer items-center">
                        <div 
                            className={`relative mr-2 h-4 w-4 rounded border transition-colors ${
                                data.remember ? 'border-blue-700 bg-blue-700' : 'border-gray-300 bg-white'
                            }`}
                            onClick={() => setData('remember', !data.remember)}
                        >
                            {data.remember && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center text-white"
                                >
                                    <Check className="h-3 w-3" />
                                </motion.div>
                            )}
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="sr-only"
                            />
                        </div>
                        <span className="text-sm text-gray-600">Ingat saya</span>
                    </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                >
                    <motion.button
                        type="submit"
                        disabled={processing}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-700/20 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 ${
                            processing ? 'opacity-80' : ''
                        }`}
                    >
                        {processing ? (
                            <div className="flex items-center justify-center">
                                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="ml-2">Memproses...</span>
                            </div>
                        ) : (
                            <span>Masuk Sekarang</span>
                        )}
                        
                        {/* Animated background effect on hover */}
                        <div className="absolute -left-full top-0 h-full w-full bg-gradient-to-r from-blue-800 to-blue-600 opacity-0 transition-all duration-300 group-hover:left-0 group-hover:opacity-100"></div>
                    </motion.button>
                </motion.div>
            </form>
        </div>
    );
}
