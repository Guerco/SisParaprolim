import ListagemDeficiencia from "../../components/listagem/deficiencia/ListagemDeficiencia";
import { listarDeficiencias } from "../../services/DeficienciaService";
import type { ParamsDeficienciaIndex } from "../../api/rotas";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTitulo } from "../../hooks/useTitulo";

export default function DeficienciaListagemPage() {
    const [aplicado, setAplicado] = useState<ParamsDeficienciaIndex>({});

    const { data, isLoading } = useQuery({
        queryKey: ["deficiencias", aplicado],
        queryFn: () => listarDeficiencias(aplicado),
    });

    useTitulo("Listagem de Deficiências");

    return data
        ? <ListagemDeficiencia
            paginacao={data}
            aplicado={aplicado}
            aoAplicar={setAplicado}
            carregando={isLoading}
        />
        : <p className="carregando" role="status">Carregando...</p>
        ;
}