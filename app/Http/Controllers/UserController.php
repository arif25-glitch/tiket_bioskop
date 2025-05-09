<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{
    public function login()
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
            'canResetPassword' => true
        ]);
    }

    public function doLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        try {
            if (Auth::attempt($credentials, $request->boolean('remember'))) {
                $request->session()->regenerate();
                
                return redirect()->intended(route('home'))->with('status', 'Selamat datang kembali!');
            }

            return back()->withErrors([
                'email' => 'Email atau password yang Anda masukkan salah.',
            ])->onlyInput('email');

        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
            
            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat login. Silakan coba lagi.'
            ]);
        }
    }

    public function register()
    {
        return Inertia::render('Auth/Register');
    }

    public function doRegister(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:45|unique:users,username',
            'email' => 'required|string|email|max:45|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        try {
            DB::beginTransaction();
            
            $user = User::create([
                'username' => $validated['username'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => 'user'
            ]);

            Auth::login($user);
            
            DB::commit();
            return redirect()->route('home')->with('message', 'Akun berhasil dibuat!');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Registration error: ' . $e->getMessage());
            
            return back()
                ->withInput($request->except('password', 'password_confirmation'))
                ->withErrors(['error' => 'Terjadi kesalahan saat membuat akun. Silakan coba lagi.']);
        }
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }

    public function index()
    {
        return view('user.index');
    }

    public function show($id)
    {
        return view('user.show', ['id' => $id]);
    }

    public function create()
    {
        return view('user.create');
    }

    public function store(Request $request)
    {
        // Logic to store user data
        return redirect()->route('user.index');
    }

    public function edit($id)
    {
        return view('user.edit', ['id' => $id]);
    }
}
