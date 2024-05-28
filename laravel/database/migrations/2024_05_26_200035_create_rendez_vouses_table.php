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
        Schema::create('rendez_vouses', function (Blueprint $table) {
            $table->id();
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->foreignId("contrat_id")->constrained("contrats");
            $table->date("date");
            $table->time("heure_debut");
            $table->time("heure_fin");
            $table->string("status");
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("rendez_vous", function(Blueprint $table){
            $table->dropForeign(['photographe_id', 'contrat_id']);
        });
        Schema::dropIfExists('rendez_vouses');
    }
};

