<?php

use App\Http\Controllers\Api\Auth\AuthentificationController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\AvoirController;
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
Route::get('/photo/search', [PhotoController::class, 'search']); // Recherche de photos
Route::get("photo/{id}", [PhotoController::class, "getPhotoById"] );
Route::post("photo/", [PhotoController::class, "create"] );
Route::put("photo/{id}", [PhotoController::class, "updatePut"] );
Route::patch("photo/{id}", [PhotoController::class, "updatePatch"] );
Route::delete("photo/{id}", [PhotoController::class, "delete"] );

Route::get('/photographe', [PhotographeController::class, "index"]);
Route::get('/photographe/search', [PhotographeController::class, 'search']); // Recherche de photographes


Route::group(["ramespace"=>"Api\Auth"], function(){
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/verify', [RegisterController::class, 'verify']);
    Route::post('/resend-verification', [RegisterController::class, 'resendVerification']);
    Route::post('/login', [AuthentificationController::class, 'login']);
    Route::post('/forgot-password', [AuthentificationController::class,'forgotPassword']);
    Route::post('/verify-reset-code', [AuthentificationController::class, 'verifyResetCode']);
    Route::post('/reset-password', [AuthentificationController::class, 'resetPassword']);

    Route::post("/logout", [AuthentificationController::class, "logout"])->middleware('auth:api');


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





//Definitio des routes pour la migration categorie
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\DisponibiliteController;
use App\Http\Controllers\GoogleAuthController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\RendezVousController;
use App\Http\Controllers\SearchController;

// Routes pour les categories
Route::get('categories', [CategorieController::class, 'index']);
Route::get('categories/ByName/{name}', [CategorieController::class, 'getCategoryIdsByName']);
// Crée une nouvelle catégorie
Route::post('categories', [CategorieController::class, 'create']);
// Affiche les détails d'une catégorie spécifique
Route::get('categories/{id}', [CategorieController::class, 'show']);
// Met à jour une catégorie spécifique
Route::put('categories/{id}', [CategorieController::class, 'update']);
Route::patch('categories/{id}', [CategorieController::class, 'update']);
// Supprime une catégorie spécifique
Route::delete('categories/{id}', [CategorieController::class, 'destroy']);
// Récupère les catégories par ID de photographe
Route::get('categories/photographes/{photographe_id}', [CategorieController::class, 'getByPhotographe']);
//  fonction de recherche sur les categories
Route::get('/categories/search', [CategorieController::class, 'search'])->name('categories.search');

// Routes pour les rendez vous
Route::get('/rendez-vous', [RendezVousController::class, "index"]);
Route::get("rendez-vous/{id}", [RendezVousController::class, "show"] );
//Route::get("rendez-vousByPhotographe/{id}", [RendezVousController::class, "getByPhotographe"] );
Route::post("rendez-vous", [RendezVousController::class, "create"] );
Route::put("rendez-vous/{id}", [RendezVousController::class, "update"] );
Route::delete("rendez-vous/{id}", [RendezVousController::class, "destroy"] );

// Routes pour Contrat
Route::get('/contrats', [ContratController::class, 'index']);
Route::get('/contratsPhotographe/{id}', [ContratController::class, 'getByPhotographe']);
Route::post('/contrats', [ContratController::class, 'store']);
Route::get('/contrats/{id}', [ContratController::class, 'show']);
Route::put('/contrats/{id}', [ContratController::class, 'update']);
Route::delete('/contrats/{id}', [ContratController::class, 'destroy']);


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
    Route::get('photographer/{photographe_id}', [CommentaireController::class, 'findAllByIdPhotographe']);
});

// Route pour les messsages
Route::prefix('messages')->group(function () {
    Route::get('/', [MessageController::class, 'index']);
    Route::get('/{id}', [MessageController::class, 'getByPhotographe']);
    Route::post('/', [MessageController::class, 'store']);
    Route::put('/{message}', [MessageController::class, 'update']);
    Route::delete('/{message}', [MessageController::class, 'destroy']);
});

// Route pour la table pivot
Route::post('associer-photographe-categorie', [AvoirController::class, 'associerPhotographeACategorie']);
Route::delete('desassocier-photographe-categorie', [AvoirController::class, 'desassocierPhotographeDeCategorie']);
Route::get('photographes-par-categorie/{categorie_id}', [AvoirController::class, 'photographesParCategorie']);
Route::get('categories-par-photographe/{photographe_id}', [AvoirController::class, 'categoriesParPhotographe']);

// routes pour l'authentification google
Route::get('/auth/google', [GoogleAuthController::class, 'redirectToGoogle'])->name('auth.google');

Route::get('/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);


// Routes pour les users
Route::get('/photographes', [PhotographeController::class, 'index']);
Route::post('/photographes/modifyRole', [AuthentificationController::class, 'updateUserRole']);


//Pour la recherche
Route::get('/search', [SearchController::class, 'search'])->name('search');


//Client
Route::get('/clients/{id}', [ClientController::class, 'show']);
Route::post('/clients', [ClientController::class, 'store']);
Route::put('/clients/{id}', [ClientController::class, 'update']);
Route::post('/clients/login', [ClientController::class, 'login']);

//Likes
Route::post('/likes', [LikeController::class, 'store']);
Route::get('/clients/{client_id}/likes', [LikeController::class, 'getUserLikes']);
Route::delete('/likes', [LikeController::class, 'destroy']);
