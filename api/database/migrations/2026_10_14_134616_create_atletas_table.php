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
        Schema::create('atletas', function (Blueprint $table) {
            $table->id();

            $table->char('num_cad', 6)->unique()->nullable();
            $table->string('nome', 200);
            $table->date('data_nascimento')->nullable();
            $table->char('uf_nascimento', 2)->nullable();
            $table->enum('sexo', ['M', 'F']);
            $table->char('estado_civil', 1)->nullable();
            $table->date('data_admissao')->default(DB::raw('CURRENT_DATE'));
            $table->string('telefone_1', 11)->nullable();
            $table->string('telefone_2', 11)->nullable();
            $table->string('email', 100)->nullable();
            $table->char('nis', 11)->unique()->nullable();
            $table->char('cpf', 11)->unique();
            $table->string('org_expedidor_documento', 50)->nullable();
            $table->char('uf_registro_documento', 2)->nullable();
            $table->date('data_expedicao_documento')->nullable();
            $table->string('nome_mae', 200)->nullable();
            $table->string('nome_pai', 200)->nullable();
            $table->string('responsavel', 20)->nullable();
            $table->char('cpf_responsavel', 11)->nullable();
            $table->char('endereco_cep', 8)->nullable();
            $table->string('endereco_logradouro', 200)->nullable();
            $table->string('endereco_numero', 20)->nullable();
            $table->string('endereco_complemento', 200)->nullable();
            $table->string('endereco_bairro', 200)->nullable();
            $table->string('endereco_cidade', 200)->nullable();
            $table->char('endereco_uf', 2)->nullable();
            $table->date('validade_termo_imagem')->nullable();
            $table->string('cuidados_especiais', 300)->nullable();
            $table->boolean('esta_ativo')->default(true);
            $table->timestamp('inativado_em')->nullable();

            // $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('atletas');
    }
};
