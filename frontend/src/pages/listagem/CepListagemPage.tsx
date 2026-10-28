import ListagemCep from "../../components/listagem/cep/ListagemCep";
import { listarCeps } from "../../services/CepService";
import type { ParamsCepIndex } from "../../api/rotas";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTitulo } from "../../hooks/useTitulo";

export default function CepListagemPage() {
    const [aplicado, setAplicado] = useState<ParamsCepIndex>({});

    const { data, isLoading } = useQuery({
        queryKey: ["ceps", aplicado],
        queryFn: () => listarCeps(aplicado),
    });

    useTitulo("Listagem de CEPs");

    return data
        ? <ListagemCep
            paginacao={data}
            aplicado={aplicado}
            aoAplicar={setAplicado}
            carregando={isLoading}
        />
        : <p className="carregando" role="status">Carregando...</p>
        ;
}