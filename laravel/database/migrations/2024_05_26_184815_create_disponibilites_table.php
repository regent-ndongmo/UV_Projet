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
        Schema::create('disponibilites', function (Blueprint $table) {
            $table->id();
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->string('libele');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("diaponibilites", function(Blueprint $table){
            $table->dropForeign('photographe_id');

            // $table->dropConstrainedForeignId('photographe_id');
            // $table->dropConstrainedForeignId("categorie_id");

        });
        Schema::dropIfExists('disponibilites');
    }
};
