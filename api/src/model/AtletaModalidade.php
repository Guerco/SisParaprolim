<?php

class AtletaModalidade{
    public function __construct(
        private ?int $id = 0,
        private ?Modalidade $modalidade = null,
        private ?Atleta $atleta = null,
        private ?string $classe = '',
    ){}

    public function getId(): ?int{
        return $this->id;
    }

    public function setId(int $id): void{
        $this->id = $id;
    }

    public function getModalidade(): ?Modalidade{
        return $this->modalidade;
    }

    public function setModalidade(Modalidade $modalidade): void{
        $this->modalidade = $modalidade;
    }

    public function getAtleta(): ?Atleta{
        return $this->atleta;
    }

    public function setAtleta(Atleta $atleta): void{
        $this->atleta = $atleta;
    }

    public function getClasse(): ?string{
        return $this->classe;
    }

    public function setClasse(string $classe): void{
        $this->classe = $classe;
    }
}

?>