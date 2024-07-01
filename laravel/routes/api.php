<?php

use App\Http\Controllers\Api\Auth\AuthentificationController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\PhotographeController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\AvoirController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RendezVousController;
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
Route::delete("photo/{id}", [PhotoController::class, "destroy"] );
Route::post('photo/{id}/like', [PhotoController::class, 'likePhoto']);
Route::get('/photos/search', [PhotoController::class, 'search']); // Recherche de photos



Route::get('/photographe', [PhotographeController::class, "index"]);
Route::get('/photographers/search', [PhotographeController::class, 'search']); // Recherche de photographes


Route::group(["ramespace"=>"Api\Auth"], function(){
    Route::post("/login", [AuthentificationController::class, "login"]);
    Route::post("/logout", [AuthentificationController::class, "logout"])->middleware('auth:api');
    Route::post("/register", [RegisterController::class, "register"]);

    Route::post('/registerPhotographe', [PhotographeController::class, 'register']);
    Route::post('/photographe/{id}', [PhotographeController::class, 'update']);
    Route::get('/photographe/{id}', [PhotographeController::class, 'show']);
    Route::delete('/photographe/{id}', [PhotographeController::class, 'destroy']);
});


Route::get('profile/{fileName}', function ($fileName) {
    $path = storage_path('app/public/images/profile/'. $fileName);
    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

// Routes pour les rendez vous
Route::get('/rendez-vous', [RendezVousController::class, "index"]);
Route::get("rendez-vous/{id}", [RendezVousController::class, "show"] );
Route::post("rendez-vous/", [RendezVousController::class, "store"] );
Route::put("rendez-vous/{id}", [RendezVousController::class, "update"] );
Route::delete("rendez-vous/{id}", [RendezVousController::class, "destroy"] );

// Routes pour Contrat
Route::get('/contrats', [ContratController::class, 'index']);
Route::post('/contrats', [ContratController::class, 'store']);
Route::get('/contrats/{id}', [ContratController::class, 'show']);
Route::put('/contrats/{id}', [ContratController::class, 'update']);
Route::delete('/contrats/{id}', [ContratController::class, 'destroy']);

// Routes pour les categories 
Route::get('/categories', [CategorieController::class, 'index']);
Route::post('/categories', [CategorieController::class, 'store']);
Route::get('/categories/{id}', [CategorieController::class, 'show']);
Route::put('/categories/{id}', [CategorieController::class, 'update']);
Route::delete('/categories/{id}', [CategorieController::class, 'destroy']);
Route::get('/categories/search', [CategorieController::class, 'search']); // Recherche de photographes


// Routes pour les disponibilités
Route::get('/disponibilites', [DisponibiliteController::class, 'index']);
Route::post('/disponibilites', [DisponibiliteController::class, 'store']);
Route::get('/disponibilites/{disponibilite}', [DisponibiliteController::class, 'show']);
Route::put('/disponibilites/{disponibilite}', [DisponibiliteController::class, 'update']);
Route::delete('/disponibilites/{disponibilite}', [DisponibiliteController::class, 'destroy']);

// Routes pour les commentaires 
Route::prefix('commentaires')->group(function () {
    Route::get('/', [CommentaireController::class, 'index']);
    Route::post('/', [CommentaireController::class, 'store']);
    Route::put('/{commentaire}', [CommentaireController::class, 'update']);
    Route::delete('/{commentaire}', [CommentaireController::class, 'destroy']);
});


// Route pour la table pivot 
Route::post('associer-photographe-categorie', [AvoirController::class, 'associerPhotographeACategorie']);
Route::delete('desassocier-photographe-categorie', [AvoirController::class, 'desassocierPhotographeDeCategorie']);
Route::get('photographes-par-categorie/{categorie_id}', [AvoirController::class, 'photographesParCategorie']);
Route::get('categories-par-photographe/{photographe_id}', [AvoirController::class, 'categoriesParPhotographe']);
