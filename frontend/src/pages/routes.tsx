import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import ListagemRouter from "./listagem/routes";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route index element={<Navigate to="/listagem/atletas" replace />} />
            <Route path="/listagem/*" element={<ListagemRouter />} />
        </Routes>
    </BrowserRouter>
);
export default AppRouter;