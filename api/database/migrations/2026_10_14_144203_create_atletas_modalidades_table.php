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
        Schema::create('atletas_modalidades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('atleta_id')
                ->constrained('atletas')
                ->onUpdate('restrict')
                ->onDelete('cascade');

            $table->foreignId('modalidade_id')
                ->constrained('modalidades')
                ->onUpdate('restrict')
                ->onDelete('restrict');

            $table->string('classe', 100)->nullable();
            $table->date('validade_atestado')->nullable();

            $table->unique(['atleta_id', 'modalidade_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atletas_modalidades');
    }
};