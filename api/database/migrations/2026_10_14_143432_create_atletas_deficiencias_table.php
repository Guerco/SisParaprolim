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
        Schema::create('atletas_deficiencias', function (Blueprint $table) {
            $table->id();

            $table->foreignId('atleta_id')
                ->constrained('atletas')
                ->onUpdate('restrict')
                ->onDelete('cascade');

            $table->foreignId('deficiencia_id')
                ->constrained('deficiencias')
                ->onUpdate('restrict')
                ->onDelete('restrict');

            $table->boolean('possui_laudo')->default(false);

            $table->unique(['atleta_id', 'deficiencia_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atletas_deficiencias');
    }
};