<?php

use App\Http\Controllers\Api\Auth\AuthentificationController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PhotographeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Definition des differente routes pour notre API
Route::get('/photo', [PhotoController::class, "index"]);
Route::get("photo/{id}", [PhotoController::class, "getPhotoById"] );
Route::post("photo/", [PhotoController::class, "create"] );
Route::put("photo/{id}", [PhotoController::class, "updatePut"] );
Route::patch("photo/{id}", [PhotoController::class, "updatePatch"] );
Route::delete("photo/{id}", [PhotoController::class, "delete"] );

Route::get('/photographe', [PhotographeController::class, "index"]);


Route::group(["ramespace"=>"Api\Auth"], function(){
    Route::post("/login", [AuthentificationController::class, "login"]);
    Route::post("/logout", [AuthentificationController::class, "logout"])->middleware('auth:api');
    Route::post("/register", [RegisterController::class, "register"]);

    Route::post('/photographe', [PhotographeController::class, 'store']);
    Route::put('/photographe/{id}', [PhotographeController::class, 'update']);
    Route::patch('/photographe/{id}', [PhotographeController::class, 'patch']);
    Route::get('/photographe/{id}', [PhotographeController::class, 'show']);
    Route::delete('/photographe/{id}', [PhotographeController::class, 'destroy']);

    Route::post('/registerPhotographe', [PhotographeController::class, 'register']);
});


Route::get('storage/{filename}', function ($filename) {
    $path = storage_path('app/public/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});
