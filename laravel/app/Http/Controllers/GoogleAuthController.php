<?php

namespace App\Http\Controllers;

use Google\Client;
use Illuminate\Http\Request;

class GoogleAuthController extends Controller
{
    
    public function redirectToGoogle()
    {
        $client = new Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->addScope(\Google\Service\Calendar::CALENDAR_EVENTS);

        $authUrl = $client->createAuthUrl();

        return redirect()->to($authUrl);
    }

    /**
     * Traite la réponse de Google après autorisation de l'utilisateur.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function handleGoogleCallback(Request $request)
    {
        $client = new Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->addScope(\Google\Service\Calendar::CALENDAR_EVENTS);

        if (!$request->has('code')) {
            $authUrl = $client->createAuthUrl();
            return redirect()->to($authUrl);
        } else {
            $code = $request->get('code');
            $client->fetchAccessTokenWithAuthCode($code);
            $accessToken = $client->getAccessToken();

            // Stocker $accessToken dans la session
        session(['google_access_token' => $accessToken]);
        return response()->json(['message' => 'Authentication successful', 'access_token' => $accessToken]);
        }
    }

}
