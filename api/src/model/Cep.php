<?php

class Cep {
    public function __construct(
        private ?string $cep = '',
        private ?string $logradouro = '',
        private ?string $bairro = '',
        private ?string $cidade = '',
        private ?string $uf = ''
    ){}

    public function getCep(): ?string{
        return $this->cep;
    }

    public function setCep(string $cep): void{
        $this->cep = $cep;
    }

    public function getLogradouro(): ?string{
        return $this->logradouro;
    }

    public function setLogradouro(string $logradouro): void{
        $this->logradouro = $logradouro;
    }

    public function getBairro(): ?string{
        return $this->bairro;
    }

    public function setBairro(string $bairro): void{
        $this->bairro = $bairro;
    }

    public function getCidade(): ?string{
        return $this->cidade;
    }

    public function setCidade(string $cidade): void{
        $this->cidade = $cidade;
    }

    public function getUf(): ?string{
        return $this->uf;
    }

    public function setUf(string $uf): void{
        $this->uf = $uf;
    }
}

?>