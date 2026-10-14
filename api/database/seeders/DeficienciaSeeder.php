<?php

namespace Database\Seeders;

use App\Models\Deficiencia;
use Illuminate\Database\Seeder;

class DeficienciaSeeder extends Seeder
{
    private const TIPO_DF = 1;
    private const TIPO_DA = 2;
    private const TIPO_DV = 3;
    private const TIPO_DI = 4;

    public function run(): void
    {
        $deficiencias = [
            // Deficiências Intelectuais
            ['cid_10' => 'F70',   'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Deficiência intelectual leve'],
            ['cid_10' => 'F71.0', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Retardo mental leve'],
            ['cid_10' => 'F71.1', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Retardo mental leve'],
            ['cid_10' => 'F71.8', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Retardo mental moderado'],
            ['cid_10' => 'F79.0', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'TDAH'],
            ['cid_10' => 'F79.9', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Retardo mental não especificado'],
            ['cid_10' => 'F81.9', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Retardo mental leve com TDAH'],
            ['cid_10' => 'F84.0', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Autismo (TEA)'],
            ['cid_10' => 'F84.5', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Síndrome de Asperger'],
            ['cid_10' => 'F84.9', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Transtorno do espectro autista'],
            ['cid_10' => 'F90.0', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Transtorno hipercinético'],
            ['cid_10' => 'F91.3', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Transtorno desafiador e de opositor'],
            ['cid_10' => 'Q90',   'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Síndrome de Down'],
            ['cid_10' => 'Q90.0', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Síndrome de Down'],
            ['cid_10' => 'Q90.9', 'tipo_deficiencia_id' => self::TIPO_DI, 'descricao_deficiencia' => 'Síndrome de Down'],

            // Deficiências Visuais
            ['cid_10' => 'H18.6', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Ceratocone'],
            ['cid_10' => 'H50.0', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Estrabismo convergente'],
            ['cid_10' => 'H54.0', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Cegueira em ambos os olhos'],
            ['cid_10' => 'H54.1', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Cegueira em um olho'],
            ['cid_10' => 'H54.2', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Baixa visão em ambos os olhos'],
            ['cid_10' => 'H54.4', 'tipo_deficiencia_id' => self::TIPO_DV, 'descricao_deficiencia' => 'Cegueira monocular'],

            // Deficiências Auditivas
            ['cid_10' => 'H90.3', 'tipo_deficiencia_id' => self::TIPO_DA, 'descricao_deficiencia' => 'Perda de audição bilateral'],

            // Deficiências Físicas
            ['cid_10' => 'B91',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de poliomielite'],
            ['cid_10' => 'B91.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de poliomielite'],
            ['cid_10' => 'C50.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Neoplasia maligna da mama'],
            ['cid_10' => 'C71.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Neoplasia maligna do encéfalo'],
            ['cid_10' => 'G04.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paraplegia espástica tropical'],
            ['cid_10' => 'G11.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Ataxia hereditária não especificada'],
            ['cid_10' => 'G20.8', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Outras formas de parkinsonismo'],
            ['cid_10' => 'G36',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paresia crural bilateral'],
            ['cid_10' => 'G54',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Transtornos das raízes e dos plexos nervosos'],
            ['cid_10' => 'G60.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Atrofia peroneira'],
            ['cid_10' => 'G71.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Transtornos primários dos músculos'],
            ['cid_10' => 'G80.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Encefalopatia crônica'],
            ['cid_10' => 'G80.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paralisia cerebral'],
            ['cid_10' => 'G80.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paralisia cerebral hemiplegica espástica'],
            ['cid_10' => 'G80.3', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paralisia cerebral distônica'],
            ['cid_10' => 'G80.8', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Outras formas de paralisia cerebral'],
            ['cid_10' => 'G81',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Hemiparesia à esquerda'],
            ['cid_10' => 'G81.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Hemiplegia não especificada'],
            ['cid_10' => 'G82.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paraplegia flácida'],
            ['cid_10' => 'G82.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paraplegia espástica'],
            ['cid_10' => 'G82.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Paraplegia não especificada'],
            ['cid_10' => 'G82.4', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Tetraparesia espástica'],
            ['cid_10' => 'G82.5', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Tetraparesia'],
            ['cid_10' => 'G83',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Diplegia dos membros superiores'],
            ['cid_10' => 'G83.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Monoplegia do membro superior'],
            ['cid_10' => 'G91.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Hidrocefalia'],
            ['cid_10' => 'I69.3', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de infarto cerebral'],
            ['cid_10' => 'I69.4', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de acidente vascular cerebral'],
            ['cid_10' => 'M21.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Desigualdade de membro inferior'],
            ['cid_10' => 'M41.4', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Escoliose neuromuscular'],
            ['cid_10' => 'M95.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Deformidade adquirida do sistema osteomuscular'],
            ['cid_10' => 'N16.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Raquitismo'],
            ['cid_10' => 'P14.3', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Lesão do plexo braquial ao nascimento'],
            ['cid_10' => 'P14.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Lesão do sistema nervoso periférico ao nascimento'],
            ['cid_10' => 'Q02.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Microcefalia'],
            ['cid_10' => 'Q05',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Espinha bífida'],
            ['cid_10' => 'Q05.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Espinha bífida cervical'],
            ['cid_10' => 'Q05.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Espinha bífida lombar com hidrocefalia'],
            ['cid_10' => 'Q05.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Espinha bífida não especificada'],
            ['cid_10' => 'Q66',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Deformidades congênitas dos pés'],
            ['cid_10' => 'Q71.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Ausência congênita de membro superior'],
            ['cid_10' => 'Q72.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Ausência congênita da coxa e da perna com pé presente'],
            ['cid_10' => 'Q72.4', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Agenesia de membro inferior'],
            ['cid_10' => 'Q72.5', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Encurtamento congênito de membro inferior'],
            ['cid_10' => 'Q74',   'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Malformação congênita de membro'],
            ['cid_10' => 'Q74.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Malformação congênita dos membros'],
            ['cid_10' => 'Q74.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Malformação congênita não especificada'],
            ['cid_10' => 'Q77.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Nanismo'],
            ['cid_10' => 'Q78.6', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Exostoses congênitas múltiplas'],
            ['cid_10' => 'Q93.6', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Monossomias e deleções'],
            ['cid_10' => 'S06.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Lesão axonal difusa'],
            ['cid_10' => 'S14.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Traumatismo raquimedular'],
            ['cid_10' => 'S14.3', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Lesão do plexo braquial'],
            ['cid_10' => 'S22.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Fratura da coluna torácica'],
            ['cid_10' => 'S48.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática do braço'],
            ['cid_10' => 'S66.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Lesão do plexo braquial'],
            ['cid_10' => 'S78.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática do quadril'],
            ['cid_10' => 'S78.9', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática do quadril e coxa'],
            ['cid_10' => 'S82.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação supra-patelar'],
            ['cid_10' => 'S84.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação transtibial'],
            ['cid_10' => 'S88.0', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática da perna'],
            ['cid_10' => 'S88.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática entre o joelho e o tornozelo'],
            ['cid_10' => 'T05.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática dos membros superiores'],
            ['cid_10' => 'T11.6', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática do membro superior'],
            ['cid_10' => 'T13.6', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação traumática do membro inferior'],
            ['cid_10' => 'T90.5', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de traumatismo intracraniano'],
            ['cid_10' => 'T91.1', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de fratura da coluna vertebral'],
            ['cid_10' => 'T91.3', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de lesão medular'],
            ['cid_10' => 'T93.2', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de fratura do membro inferior'],
            ['cid_10' => 'T93.4', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Sequela de lesão de nervo do membro inferior'],
            ['cid_10' => 'Y83.5', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Amputação de membro'],
            ['cid_10' => 'Z89.6', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Ausência de membro inferior'],
            ['cid_10' => 'Z89.8', 'tipo_deficiencia_id' => self::TIPO_DF, 'descricao_deficiencia' => 'Ausência de membros'],
        ];

        foreach ($deficiencias as $dados) {
            Deficiencia::create($dados);
        }
    }
}