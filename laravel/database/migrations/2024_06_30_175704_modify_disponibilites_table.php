<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('disponibilites', function (Blueprint $table) {
            // Supprimer le champ 'Heure'
            $table->dropColumn('Heure');
            $table->dropColumn('Date');

            // Ajouter les champs 'date_debut' et 'date_fin'
            $table->date('date_debut');
            $table->date('date_fin');
        });
    }

    public function down()
    {
        Schema::table('disponibilites', function (Blueprint $table) {
            // Annuler les modifications dans la méthode 'up' si nécessaire
            $table->time('Heure');
            $table->date('Date');
            $table->dropColumn('date_debut');
            $table->dropColumn('date_fin');
        });
    }

};
