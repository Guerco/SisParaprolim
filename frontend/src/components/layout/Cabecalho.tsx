import { useEffect, useState } from 'react';
import LogoLink from './LogoLink';
import MenuLateral from './MenuLateral';

export default function Cabecalho() {
    const [menuAberto, setMenuAberto] = useState(false);

    function fecharMenu() {
        setMenuAberto(false);
    }

    useEffect(() => {
        if (!menuAberto) return;

        function aoTeclar(e: KeyboardEvent) {
            if (e.key === 'Escape') setMenuAberto(false);
        }

        document.addEventListener('keydown', aoTeclar);
        return () => document.removeEventListener('keydown', aoTeclar);
    }, [menuAberto]);

    return <>
        <header className="cabecalho">
            <LogoLink />

            <button
                type="button"
                className="botao-hamburguer"
                aria-label="Abrir menu"
                aria-expanded={menuAberto}
                aria-controls="menu-lateral"
                onClick={() => setMenuAberto(true)}
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M4 6h16M4 12h16M4 18h16"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </header>

        <div
            className={`menu-fundo${menuAberto ? ' aberto' : ''}`}
            aria-hidden="true"
            onClick={fecharMenu}
        />

        <MenuLateral aberto={menuAberto} aoFechar={fecharMenu} />
    </>;
}