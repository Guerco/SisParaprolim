import LogoLink from './LogoLink';
import MenuItem from './MenuItem';
import { ITENS_MENU } from './itensMenu';

interface MenuLateralProps {
    aberto: boolean;
    aoFechar: () => void;
}

export default function MenuLateral({ aberto, aoFechar }: MenuLateralProps) {
    return <aside
        id="menu-lateral"
        className={`menu-lateral${aberto ? ' aberto' : ''}`}
        aria-label="Menu principal"
    >
        <div className="menu-topo">
            <LogoLink aoClicar={aoFechar} />

            <button
                type="button"
                className="botao-hamburguer"
                aria-label="Fechar menu"
                onClick={aoFechar}
            >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                        d="M6 6l12 12M18 6 6 18"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>

        <nav>
            <ul className="menu-itens">
                {ITENS_MENU.map((item) => (
                    <MenuItem key={item.descricao} item={item} aoNavegar={aoFechar} />
                ))}
            </ul>
        </nav>
    </aside>;
}