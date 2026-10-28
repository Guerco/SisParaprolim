<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('atletas', function (Blueprint $table) {
            $table->date('data_emissao_atestado')->nullable()->after('validade_termo_imagem');
            $table->date('data_vencimento_atestado')->nullable()->after('data_emissao_atestado');
            $table->string('motivo_inatividade', 100)->nullable()->after('inativado_em');
        });
    }

    public function down(): void
    {
        Schema::table('atletas', function (Blueprint $table) {
            $table->dropColumn([
                'data_emissao_atestado',
                'data_vencimento_atestado',
                'motivo_inatividade'
            ]);
        });
    }
};