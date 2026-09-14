<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if (! $user) {
            return response()->json([
                'message' => 'Unauthenticated.',
            ], 401);
        }

        $userRole = strtolower(trim($user->role ?? ''));

        foreach ($roles as $role) {
            $normalizedRole = strtolower(trim($role));

            if ($userRole === $normalizedRole) {
                return $next($request);
            }

            // Also match "staff" with "staff gudang"
            if ($normalizedRole === 'staff' && str_contains($userRole, 'staff')) {
                return $next($request);
            }
        }

        return response()->json([
            'message' => 'Akses ditolak. Peran ' . ($user->role ?? 'User') . ' tidak memiliki izin untuk mengakses resource ini.',
        ], 403);
    }
}
