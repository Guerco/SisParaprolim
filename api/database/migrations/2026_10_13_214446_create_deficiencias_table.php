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
        Schema::create('deficiencias', function (Blueprint $table) {
            $table->id();
            $table->string('cid_10',10)->unique();
            $table->string('descricao_deficiencia',200);

            $table->foreignId('tipo_deficiencia_id')
                ->constrained('tipos_deficiencias')
                ->onUpdate('restrict')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deficiencias');
    }
};
