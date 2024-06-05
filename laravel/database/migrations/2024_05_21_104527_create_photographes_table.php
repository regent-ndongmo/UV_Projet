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
            $table->foreignId("user_id")->constrained("users");
            $table->string("nom");
            $table->string("ville");
            $table->string("pays");
            $table->string("numero");
            $table->string("photo");
            $table->string("signature");
            $table->string("description");
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
            $table->dropForeign(['user_id']);
        });
        Schema::dropIfExists('photographes');
    }
};
