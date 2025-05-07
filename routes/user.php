<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::prefix('user')->name('user.')->group(function() {
    // Public routes
    Route::get('/login', [UserController::class, 'login'])->name('login');
    Route::post('/login', [UserController::class, 'doLogin'])->name('doLogin');

    Route::middleware(['auth:web'])->group(function() {
        // Protected routes
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/register', [UserController::class, 'register'])->name('register');
        Route::post('/register', [UserController::class, 'doRegister'])->name('doRegister');
    });
});