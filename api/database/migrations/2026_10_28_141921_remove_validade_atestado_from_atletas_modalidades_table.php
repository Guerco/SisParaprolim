<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('atletas_modalidades', function (Blueprint $table) {
            $table->dropColumn('validade_atestado');
        });
    }

    public function down(): void
    {
        Schema::table('atletas_modalidades', function (Blueprint $table) {
            $table->date('validade_atestado')->nullable()->after('classe');
        });
    }
};