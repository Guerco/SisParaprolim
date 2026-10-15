<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Cpf implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // https://gist.github.com/rafael-neri/ab3e58803a08cb4def059fce4e3c0e40

        $cpf = preg_replace('/\D/', '', (string) $value);
        $mensagem = 'O :attribute informado não é válido.';

        if (strlen($cpf) !== 11) {
            $fail($mensagem);
            return;
        }

        if (preg_match('/(\d)\1{10}/', $cpf)) {
            $fail($mensagem);
            return;
        }

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                $fail($mensagem);
                return;
            }
        }
    }
}