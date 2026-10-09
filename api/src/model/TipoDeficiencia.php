<?php

class TipoDeficiencia {
    public function __construct(
        private ?string $tipo = '',
        private ?string $descricao = '',
    ){}

    public function getTipo(): ?string{
        return $this->tipo;
    }
    public function setTipo(string $tipo): void{
        $this->tipo = $tipo;
    }

    public function getDescricao(): ?string{
        return $this->descricao;
    }
    public function setDescricao(string $descricao): void{
        $this->descricao = $descricao;
    }
}

?>