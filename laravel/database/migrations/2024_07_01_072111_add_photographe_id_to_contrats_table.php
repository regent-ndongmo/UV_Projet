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
        Schema::table('contrats', function (Blueprint $table) {
            $table->unsignedBigInteger('photographe_id')->nullable();

            // Clé étrangère vers la table des photographes
            $table->foreign('photographe_id')
                  ->references('id')
                  ->on('photographes')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contrats', function (Blueprint $table) {
            $table->dropForeign(['photographe_id']);
            $table->dropColumn('photographe_id');
        });
    }
};
