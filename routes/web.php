<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| Web Routes — Serve React SPA
|--------------------------------------------------------------------------
|
| Semua request non-API akan di-serve oleh React SPA.
| Frontend React di-build ke public/app/ directory.
|
*/

// Serve React SPA — catch-all route
Route::get('/{any?}', function () {
    $indexPath = public_path('app/index.html');

    if (File::exists($indexPath)) {
        return File::get($indexPath);
    }

    // Fallback: tampilkan instruksi jika belum di-build
    return response()->view('welcome');
})->where('any', '.*');
