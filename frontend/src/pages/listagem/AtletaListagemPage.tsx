import ListagemAtleta from "../../components/listagem/atleta/ListagemAtleta";
import { listarAtletas } from "../../services/AtletaService";
import type { ParamsAtletaIndex } from "../../api/rotas";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTitulo } from "../../hooks/useTitulo";

export default function AtletaListagemPage() {
    const [aplicado, setAplicado] = useState<ParamsAtletaIndex>({});

    const { data, isLoading } = useQuery({
        queryKey: ["atletas", aplicado],
        queryFn: () => listarAtletas(aplicado),
    });

    useTitulo("Listagem de Atletas");
    
    return data
        ? <ListagemAtleta
            paginacao={data}
            aplicado={aplicado}
            aoAplicar={setAplicado}
            carregando={isLoading}
        />
        : <p className="carregando" role="status">Carregando...</p>;
}