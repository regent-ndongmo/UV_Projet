<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contrats', function (Blueprint $table) {
            $table->id();
            $table->string("libelle");
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->double("montant");
            $table->date("date");
            $table->string("nom_client");
            $table->string("status_paiement");
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("contrats", function(Blueprint $table){
            $table->dropForeign('photographe_id');

        });
        Schema::dropIfExists('contacts');
    }
};
