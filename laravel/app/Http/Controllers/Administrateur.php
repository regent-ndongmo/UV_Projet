<?php

namespace App\Http\Controllers;

use App\Models\sfrc;
use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;
class Administrateur extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

public function sendEmail()
{
    $details = [
        'name' => 'John Doe',
        'email' => 'john.doe@example.com',
        'message' => 'This is a test email from Laravel.',
    ];

    Mail::to('franclaintomayo45@gmail.com')->send(new ContactFormMail($details));

    return 'Email sent successfully!';
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(sfrc $sfrc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(sfrc $sfrc)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, sfrc $sfrc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(sfrc $sfrc)
    {
        //
    }
}
