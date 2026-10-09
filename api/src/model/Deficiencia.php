<?php

class Deficiencia {
    public function __construct(
        private ?int $id = 0,
        private ?string $cid10 = '',
        private ?TipoDeficiencia $tipoDeficiencia = null,
        private ?string $descricaoDeficiencia = '',
    ){}

   public function getId(): ?int{
        return $this->id;
    }
    public function setId(int $id): void{
        $this->id = $id;
    }

    public function getCid10(): ?string{
        return $this->cid10;
    }
    public function setCid10(string $cid10): void{
        $this->cid10 = $cid10;
    }

    public function getTipoDeficiencia(): ?TipoDeficiencia{
        return $this->tipoDeficiencia;
    }
    public function setTipoDeficiencia(TipoDeficiencia $tipoDeficiencia): void{
        $this->tipoDeficiencia = $tipoDeficiencia;
    }

    public function getDescricaoDeficiencia(): ?string{
        return $this->descricaoDeficiencia;
    }
    public function setDescricaoDeficiencia(string $descricaoDeficiencia): void{
        $this->descricaoDeficiencia = $descricaoDeficiencia;
    } 
}


?>