import ListagemTipoDeficiencia from "../../components/listagem/tipoDeficiencia/ListagemTipoDeficiencia";
import { listarTiposDeficiencias } from "../../services/TipoDeficienciaService";
import type { ParamsTipoDeficienciaIndex } from "../../api/rotas";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTitulo } from "../../hooks/useTitulo";

export default function TipoDeficienciaListagemPage() {
    const [aplicado, setAplicado] = useState<ParamsTipoDeficienciaIndex>({});

    const { data, isFetching  } = useQuery({
        queryKey: ["tiposDeficiencias", aplicado],
        queryFn: () => listarTiposDeficiencias(aplicado),
    });

    useTitulo("Listagem de Tipos de Deficiência");

    return data
        ? <ListagemTipoDeficiencia
            paginacao={data}
            aplicado={aplicado}
            aoAplicar={setAplicado}
            carregando={isFetching}
        />
        : <p className="carregando" role="status">Carregando...</p>
        ;
}