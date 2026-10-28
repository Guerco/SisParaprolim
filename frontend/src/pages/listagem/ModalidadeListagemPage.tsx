import ListagemModalidade from "../../components/listagem/modalidade/ListagemModalidade";
import { listarModalidades } from "../../services/ModalidadeService";
import type { ParamsModalidadeIndex } from "../../api/rotas";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTitulo } from "../../hooks/useTitulo";

export default function ModalidadeListagemPage() {
    const [aplicado, setAplicado] = useState<ParamsModalidadeIndex>({});

    const { data, isLoading } = useQuery({
        queryKey: ["modalidades", aplicado],
        queryFn: () => listarModalidades(aplicado),
    });

    useTitulo("Listagem de Modalidades");

    return data
        ? <ListagemModalidade
            paginacao={data}
            aplicado={aplicado}
            aoAplicar={setAplicado}
            carregando={isLoading}
        />
        : <p className="carregando" role="status">Carregando...</p>
        ;
}