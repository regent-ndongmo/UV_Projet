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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId("photographe_id")->constrained("photographes");
            $table->string("categorie");
            $table->unique(['photographe_id', 'categorie']);
            $table->timestamps();
        });
        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table("categories", function(Blueprint $table){
            $table->dropForeign('photographe_id');

        });
        Schema::dropIfExists('categories');
    }
};
