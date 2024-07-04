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
        Schema::create('commentaires', function (Blueprint $table) {
            $table->id();
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->string("nom_client");
            $table->string("ville_client");
            $table->string("description");
            $table->string('email_client');
            $table->string('numero_telephone');
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("commentaires", function(Blueprint $table){
            $table->dropForeign('photographe_id');

        });
        Schema::dropIfExists('commentaires');
    }
};
