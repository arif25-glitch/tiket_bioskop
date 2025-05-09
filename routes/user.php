<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::prefix('user')->name('user.')->group(function() {
    // Public routes
    Route::middleware('guest')->group(function() {
        Route::get('/login', [UserController::class, 'login'])->name('login');
        Route::post('/login', [UserController::class, 'doLogin'])->name('doLogin');
        Route::get('/register', [UserController::class, 'register'])->name('register');
        Route::post('/register', [UserController::class, 'doRegister'])->name('doRegister');
    });

    // Protected routes
    Route::middleware(['auth:web'])->group(function() {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::post('/logout', [UserController::class, 'logout'])->name('logout');
    });
});