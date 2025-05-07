<?php
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function() {
  // Public routes
  Route::get('/login', [AdminController::class, 'login'])->name('login');
  Route::post('/login', [AdminController::class, 'login'])->name('doLogin');

  Route::middleware(['auth:web', 'onlyAdminCanAccess'])->group(function() {
    // Protected routes
    Route::get('/', [AdminController::class, 'index'])->name('index');
    Route::get('/register', [AdminController::class, 'register'])->name('register');
    Route::post('/register', [AdminController::class, 'register'])->name('doRegister');
  });
});