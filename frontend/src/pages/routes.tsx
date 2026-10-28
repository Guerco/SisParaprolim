import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "../components/layout/Layout";
import ListagemRouter from "./listagem/routes";

const AppRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Navigate to="/listagem/atletas" replace />} />
                <Route path="/listagem/*" element={<ListagemRouter />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
export default AppRouter;