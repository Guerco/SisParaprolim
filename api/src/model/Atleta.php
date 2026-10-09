<?php

class Atleta {

    public function __construct(
        private ?int $id = 0,
        private ?string $numCad = '',
        private ?string $nome = '',
        private ?DateTime $dataNascimento = null,
        private ?string $ufNascimento = '',
        private ?string $sexo = '',
        private ?string $estadoCivil = '',
        private ?DateTime $dataAdmissao = null,
        private ?string $telefone1 = '',
        private ?string $telefone2 = '',
        private ?string $email = '',
        private ?string $nis = '',
        private ?string $cpf = '',
        private ?string $orgExpedidorDocumento = '',
        private ?string $ufRegistroDocumento = '',
        private ?DateTime $dataExpedicaoDocumento = null,
        private ?string $nomeMae = '',
        private ?string $nomePai = '',
        private ?string $responsavel = '',
        private ?string $cpfResponsavel = '',
        private ?string $endCep = '',
        private ?string $endLogradouro = '',
        private ?string $endNumero = '',
        private ?string $endComplemento = '',
        private ?string $endBairro = '',
        private ?string $endCidade = '',
        private ?string $endUf = '',
        private ?DateTime $validadeTermoImagem = null,
        private ?DateTime $validadeAtestado = null,
        private ?string $cuidadosEspeciais = '',
        private ?bool $estaAtivo = true,
        /** @var Deficiencia[] */
        private ?array $deficiencias = [],
        /** @var AtletaModalidade[] */
        private ?array $modalidades = []
    ){}

    public function getId(): ?int {
        return $this->id;
    }
    public function setId(?int $id): void {
        $this->id = $id;
    }

    public function getNumCad(): ?string {
        return $this->numCad;
    }
    public function setNumCad(?string $numCad): void {
        $this->numCad = $numCad;
    }

    public function getNome(): ?string {
        return $this->nome;
    }
    public function setNome(?string $nome): void {
        $this->nome = $nome;
    }

    public function getDataNascimento(): ?DateTime {
        return $this->dataNascimento;
    }
    public function setDataNascimento(?DateTime $dataNascimento): void {
        $this->dataNascimento = $dataNascimento;
    }

    public function getUfNascimento(): ?string {
        return $this->ufNascimento;
    }
    public function setUfNascimento(?string $ufNascimento): void {
        $this->ufNascimento = $ufNascimento;
    }

    public function getSexo(): ?string {
        return $this->sexo;
    }
    public function setSexo(?string $sexo): void {
        $this->sexo = $sexo;
    }

    public function getEstadoCivil(): ?string {
        return $this->estadoCivil;
    }
    public function setEstadoCivil(?string $estadoCivil): void {
        $this->estadoCivil = $estadoCivil;
    }

    public function getDataAdmissao(): ?DateTime {
        return $this->dataAdmissao;
    }
    public function setDataAdmissao(?DateTime $dataAdmissao): void {
        $this->dataAdmissao = $dataAdmissao;
    }

    public function getTelefone1(): ?string {
        return $this->telefone1;
    }
    public function setTelefone1(?string $telefone1): void {
        $this->telefone1 = $telefone1;
    }

    public function getTelefone2(): ?string {
        return $this->telefone2;
    }
    public function setTelefone2(?string $telefone2): void {
        $this->telefone2 = $telefone2;
    }

    public function getEmail(): ?string {
        return $this->email;
    }
    public function setEmail(?string $email): void {
        $this->email = $email;
    }

    public function getNis(): ?string {
        return $this->nis;
    }
    public function setNis(?string $nis): void {
        $this->nis = $nis;
    }

    public function getCpf(): ?string {
        return $this->cpf;
    }
    public function setCpf(?string $cpf): void {
        $this->cpf = $cpf;
    }

    public function getOrgExpedidorDocumento(): ?string {
        return $this->orgExpedidorDocumento;
    }
    public function setOrgExpedidorDocumento(?string $orgExpedidorDocumento): void {
        $this->orgExpedidorDocumento = $orgExpedidorDocumento;
    }

    public function getUfRegistroDocumento(): ?string {
        return $this->ufRegistroDocumento;
    }
    public function setUfRegistroDocumento(?string $ufRegistroDocumento): void {
        $this->ufRegistroDocumento = $ufRegistroDocumento;
    }

    public function getDataExpedicaoDocumento(): ?DateTime {
        return $this->dataExpedicaoDocumento;
    }
    public function setDataExpedicaoDocumento(?DateTime $dataExpedicaoDocumento): void {
        $this->dataExpedicaoDocumento = $dataExpedicaoDocumento;
    }

    public function getNomeMae(): ?string {
        return $this->nomeMae;
    }
    public function setNomeMae(?string $nomeMae): void {
        $this->nomeMae = $nomeMae;
    }

    public function getNomePai(): ?string {
        return $this->nomePai;
    }
    public function setNomePai(?string $nomePai): void {
        $this->nomePai = $nomePai;
    }

    public function getResponsavel(): ?string {
        return $this->responsavel;
    }
    public function setResponsavel(?string $responsavel): void {
        $this->responsavel = $responsavel;
    }

    public function getCpfResponsavel(): ?string {
        return $this->cpfResponsavel;
    }
    public function setCpfResponsavel(?string $cpfResponsavel): void {
        $this->cpfResponsavel = $cpfResponsavel;
    }

    public function getEndCep(): ?string {
        return $this->endCep;
    }
    public function setEndCep(?string $endCep): void {
        $this->endCep = $endCep;
    }

    public function getEndLogradouro(): ?string {
        return $this->endLogradouro;
    }
    public function setEndLogradouro(?string $endLogradouro): void {
        $this->endLogradouro = $endLogradouro;
    }

    public function getEndNumero(): ?string {
        return $this->endNumero;
    }
    public function setEndNumero(?string $endNumero): void {
        $this->endNumero = $endNumero;
    }

    public function getEndComplemento(): ?string {
        return $this->endComplemento;
    }
    public function setEndComplemento(?string $endComplemento): void {
        $this->endComplemento = $endComplemento;
    }

    public function getEndBairro(): ?string {
        return $this->endBairro;
    }
    public function setEndBairro(?string $endBairro): void {
        $this->endBairro = $endBairro;
    }

    public function getEndCidade(): ?string {
        return $this->endCidade;
    }
    public function setEndCidade(?string $endCidade): void {
        $this->endCidade = $endCidade;
    }

    public function getEndUf(): ?string {
        return $this->endUf;
    }
    public function setEndUf(?string $endUf): void {
        $this->endUf = $endUf;
    }

    public function getValidadeTermoImagem(): ?DateTime {
        return $this->validadeTermoImagem;
    }
    public function setValidadeTermoImagem(?DateTime $validadeTermoImagem): void {
        $this->validadeTermoImagem = $validadeTermoImagem;
    }

    public function getValidadeAtestado(): ?DateTime {
        return $this->validadeAtestado;
    }
    public function setValidadeAtestado(?DateTime $validadeAtestado): void {
        $this->validadeAtestado = $validadeAtestado;
    }

    public function getCuidadosEspeciais(): ?string {
        return $this->cuidadosEspeciais;
    }
    public function setCuidadosEspeciais(?string $cuidadosEspeciais): void {
        $this->cuidadosEspeciais = $cuidadosEspeciais;
    }

    public function getEstaAtivo(): ?bool {
        return $this->estaAtivo;
    }
    public function setEstaAtivo(?bool $estaAtivo): void {
        $this->estaAtivo = $estaAtivo;
    }

    /** @return Deficiencia[]|null */
    public function getDeficiencias(): ?array {
        return $this->deficiencias;
    }
    /** @param Deficiencia[]|null $deficiencias */
    public function setDeficiencias(?array $deficiencias): void {
        $this->deficiencias = $deficiencias;
    }

    /** @return AtletaModalidade[]|null */
    public function getModalidades(): ?array {
        return $this->modalidades;
    }
    /** @param AtletaModalidade[]|null $modalidades */
    public function setModalidades(?array $modalidades): void {
        $this->modalidades = $modalidades;
    }
}

?>