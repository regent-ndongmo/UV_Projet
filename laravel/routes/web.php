<?php

use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\ProfileController;
use App\Models\Avoir;
use App\Models\Categorie;
use App\Models\Photo;
use App\Models\Photographe;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

/*

Route::prefix('etudiant')->name('etudiant.')->group(function(){
    Route::get('/', [EtudiantController::class,'index'])->name('index');
});
*/

Route::get('/photographe', function(){
    return Photographe::with("photo", "commentaire", "disponibilite", "categories")->paginate(5);
});

Route::get('/user', function(){
    return User::all();
});

Route::get('/create-symlink', function () {
    Artisan::call('storage:link');
    echo "Symlink Created. Thanks";
});

// Route::get('/photo', [PhotoController::class, "index"]);
// Route::get("photo/{id}", [PhotoController::class, "getPhotoById"] );
// Route::post("photo/", [PhotoController::class, "create"] );
// Route::put("photo/{id}", [PhotoController::class, "update"] );
// Route::delete("photo/{id}", [PhotoController::class, "delete"] );




Route::get('/categorie', function(){
    return Categorie::with(["photographes", "photo"])->paginate(5);
});

Route::get('/avoir', function(){
    return Avoir::paginate(10);
});

