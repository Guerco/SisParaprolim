import { Routes, Route } from "react-router"

import AtletaListagemPage from "./AtletaListagemPage";
import CepListagemPage from "./CepListagemPage";
import DeficienciaListagemPage from "./DeficienciaListagemPage";
import ModalidadeListagemPage from "./ModalidadeListagemPage";
import TipoDeficienciaListagemPage from "./TipoDeficienciaListagemPage";

const ListagemRouter = () => (
    <Routes>
        <Route path="atletas" element={<AtletaListagemPage />} />
        <Route path="ceps" element={<CepListagemPage />} />
        <Route path="deficiencias" element={<DeficienciaListagemPage />} />
        <Route path="modalidades" element={<ModalidadeListagemPage />} />
        <Route path="tipos-deficiencias" element={<TipoDeficienciaListagemPage />} />
    </Routes>
);
export default ListagemRouter;