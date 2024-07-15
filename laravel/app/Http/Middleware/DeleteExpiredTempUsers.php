<?php

namespace App\Http\Middleware;

use App\Models\TempUser;
use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DeleteExpiredTempUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        TempUser::where('verification_code_expires_at', '<', Carbon::now())->delete();
        return $next($request);
    }
}
