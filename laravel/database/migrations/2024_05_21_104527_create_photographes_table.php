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
        Schema::create('photographes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string("nom")->nullable();
            $table->string("ville")->nullable();
            $table->string("pays")->nullable();
            $table->string("numero")->nullable();
            $table->string("photo")->nullable();
            $table->string("signature")->nullable();
            $table->string("description")->nullable();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("photographes", function(Blueprint $table){
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('photographes');
    }
};
