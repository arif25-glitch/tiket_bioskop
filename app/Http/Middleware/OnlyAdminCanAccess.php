<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OnlyAdminCanAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated and has the 'admin' role
        if (!auth()->guard('web')->check() || auth()->guard('web')->user()->role != 'admin') {
            // If not, redirect to the login page or show an error message
            return redirect()->route('login')->with('error', 'You do not have access to this page.');
        }
        
        // If the user is authenticated and has the 'admin' role, allow the request to proceed
        return $next($request);
    }
}
