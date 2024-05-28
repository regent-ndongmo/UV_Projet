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
        Schema::create('avoirs', function (Blueprint $table) {
            $table->id();
            $table->foreignId("categorie_id")->constrained("categories");
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //Supprimer les deux colonne suivant avant tout
        Schema::table("avoirs", function(Blueprint $table){
            $table->dropForeign(['photographe_id', "categorie_id"]);
        });
        Schema::enableForeignKeyConstraints();
    }
};
