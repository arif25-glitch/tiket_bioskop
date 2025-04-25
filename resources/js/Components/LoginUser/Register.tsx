import { FormEventHandler, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import { User, AtSign, Lock, Eye, EyeOff, AlertTriangle, Shield, CheckCircle2 } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [passwordStrength, setPasswordStrength] = useState(0);
    
    const nameInputRef = useRef<HTMLInputElement>(null);
    
    // Focus the name input on component mount
    useEffect(() => {
        if (nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, []);

    // Calculate password strength
    useEffect(() => {
        if (!data.password) {
            setPasswordStrength(0);
            return;
        }
        
        let strength = 0;
        // Length check
        if (data.password.length >= 8) strength += 1;
        // Contains number
        if (/\d/.test(data.password)) strength += 1;
        // Contains special char
        if (/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) strength += 1;
        // Contains uppercase and lowercase
        if (/[A-Z]/.test(data.password) && /[a-z]/.test(data.password)) strength += 1;
        
        setPasswordStrength(strength);
    }, [data.password]);

    const getPasswordStrengthInfo = () => {
        switch (passwordStrength) {
            case 0: return { text: '', color: '', bg: 'bg-gray-200' };
            case 1: return { text: 'Lemah', color: 'text-red-500', bg: 'bg-red-500' };
            case 2: return { text: 'Sedang', color: 'text-yellow-500', bg: 'bg-yellow-500' };
            case 3: return { text: 'Kuat', color: 'text-blue-500', bg: 'bg-blue-500' };
            case 4: return { text: 'Sangat Kuat', color: 'text-green-500', bg: 'bg-green-500' };
            default: return { text: '', color: '', bg: 'bg-gray-200' };
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="px-1">
            {/* Animated Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-center"
            >
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                    Buat Akun Baru
                </h2>
                <p className="mt-2 text-gray-600">
                    Daftar untuk mulai menggunakan layanan
                </p>
            </motion.div>

            <form onSubmit={submit} className="space-y-5">
                {/* Name Field with Floating Label */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className={`group relative h-14 rounded-xl border-2 transition-all duration-200 ${
                        errors.name 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'name' 
                                ? 'border-blue-400 bg-blue-50/30' 
                                : data.name 
                                    ? 'border-gray-300' 
                                    : 'border-gray-200 bg-gray-50/50'
                    }`}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <User className={`h-5 w-5 transition-colors ${
                                focusedField === 'name' ? 'text-blue-600' : ''
                            }`} />
                        </div>
                        
                        <input
                            ref={nameInputRef}
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className={`peer h-full w-full rounded-xl border-none bg-transparent px-11 pt-2 outline-none ${
                                errors.name ? 'text-red-600' : 'text-gray-700'
                            }`}
                            onChange={(e) => setData('name', e.target.value)}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        
                        <label 
                            htmlFor="name"
                            className={`absolute left-11 text-sm transition-all duration-200 
                                ${data.name || focusedField === 'name' 
                                    ? 'top-1 text-xs font-medium' 
                                    : 'top-1/2 -translate-y-1/2'
                                } ${
                                    errors.name 
                                        ? 'text-red-500' 
                                        : focusedField === 'name' 
                                            ? 'text-blue-700' 
                                            : 'text-gray-500'
                                }`}
                        >
                            Nama Lengkap
                        </label>
                    </div>
                    
                    {errors.name && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 flex items-center gap-x-1 text-sm text-red-500"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span>{errors.name}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Email Field with Floating Label */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
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
                    transition={{ delay: 0.3 }}
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
                    
                    {/* Password strength indicator */}
                    {data.password && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-1.5"
                        >
                            <div className="flex items-center gap-x-2">
                                <div className="h-1.5 flex-grow rounded-full bg-gray-200 overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        className={`h-full ${getPasswordStrengthInfo().bg}`}
                                    />
                                </div>
                                {passwordStrength > 0 && (
                                    <span className={`text-xs font-medium ${getPasswordStrengthInfo().color}`}>
                                        {getPasswordStrengthInfo().text}
                                    </span>
                                )}
                            </div>
                            
                            {/* Password requirements */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-2 grid grid-cols-2 gap-1"
                            >
                                <div className="flex items-center gap-x-1">
                                    <div className={`h-3 w-3 rounded-full ${data.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-xs text-gray-600">Min. 8 karakter</span>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <div className={`h-3 w-3 rounded-full ${/\d/.test(data.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-xs text-gray-600">Min. 1 angka</span>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <div className={`h-3 w-3 rounded-full ${/[A-Z]/.test(data.password) && /[a-z]/.test(data.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-xs text-gray-600">Huruf besar & kecil</span>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <div className={`h-3 w-3 rounded-full ${/[!@#$%^&*(),.?":{}|<>]/.test(data.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    <span className="text-xs text-gray-600">Karakter khusus</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                    
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

                {/* Password Confirmation Field with Floating Label */}
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className={`group relative h-14 rounded-xl border-2 transition-all duration-200 ${
                        errors.password_confirmation 
                            ? 'border-red-300 bg-red-50' 
                            : focusedField === 'password_confirmation' 
                                ? 'border-blue-400 bg-blue-50/30' 
                                : data.password_confirmation 
                                    ? 'border-gray-300' 
                                    : 'border-gray-200 bg-gray-50/50'
                    }`}>
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Shield className={`h-5 w-5 transition-colors ${
                                focusedField === 'password_confirmation' ? 'text-blue-600' : ''
                            }`} />
                        </div>
                        
                        <input
                            id="password_confirmation"
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className={`peer h-full w-full rounded-xl border-none bg-transparent px-11 pt-2 outline-none ${
                                errors.password_confirmation ? 'text-red-600' : 'text-gray-700'
                            }`}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            onFocus={() => setFocusedField('password_confirmation')}
                            onBlur={() => setFocusedField(null)}
                            required
                        />
                        
                        <label 
                            htmlFor="password_confirmation"
                            className={`absolute left-11 text-sm transition-all duration-200 
                                ${data.password_confirmation || focusedField === 'password_confirmation' 
                                    ? 'top-1 text-xs font-medium' 
                                    : 'top-1/2 -translate-y-1/2'
                                } ${
                                    errors.password_confirmation 
                                        ? 'text-red-500' 
                                        : focusedField === 'password_confirmation' 
                                            ? 'text-blue-700' 
                                            : 'text-gray-500'
                                }`}
                        >
                            Konfirmasi Password
                        </label>
                        
                        <button 
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                        
                        {/* Password match indicator */}
                        {data.password && data.password_confirmation && (
                            <div className="absolute right-12 top-1/2 -translate-y-1/2">
                                {data.password === data.password_confirmation ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                )}
                            </div>
                        )}
                    </div>
                    
                    {errors.password_confirmation && (
                        <motion.div 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1.5 flex items-center gap-x-1 text-sm text-red-500"
                        >
                            <AlertTriangle className="h-4 w-4" />
                            <span>{errors.password_confirmation}</span>
                        </motion.div>
                    )}
                </motion.div>

                {/* Submit Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
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
                            <span>Daftar Sekarang</span>
                        )}
                    </motion.button>
                </motion.div>
            </form>
        </div>
    );
}
