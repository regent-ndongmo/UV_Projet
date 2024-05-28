<?php

use App\Http\Controllers\PhotoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Definition des differente routes pour notre API
Route::get('/photo', [PhotoController::class, "index"]);
Route::get("photo/{id}", [PhotoController::class, "getPhotoById"] );
Route::post("photo/", [PhotoController::class, "create"] );
Route::put("photo/{id}", [PhotoController::class, "updatePut"] );
Route::patch("photo/{id}", [PhotoController::class, "updatePatch"] );
Route::delete("photo/{id}", [PhotoController::class, "delete"] );

