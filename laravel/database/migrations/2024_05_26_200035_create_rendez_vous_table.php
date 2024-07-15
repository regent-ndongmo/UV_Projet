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
        Schema::create('rendez_vous', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->string('status');
            $table->foreignId('photographe_id')->constrained('photographes');
            $table->foreignId('contrat_id')->constrained('contrats');
            $table->string('lieux');
            $table->string('google_calendar_event_id')->nullable(); // Pour stocker l'ID de l'événement Google Calendar
            $table->timestamps();

            $table->unique(['date', 'heure_debut', 'heure_fin', 'photographe_id']); // Assure l'unicité des rendez-vous par photographe à une heure donnée
        });
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

