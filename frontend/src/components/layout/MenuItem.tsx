import { useId, useState } from 'react';
import { NavLink } from 'react-router';
import type { ItemMenu } from './itensMenu';

interface MenuItemProps {
    item: ItemMenu;
    aoNavegar: () => void;
}

export default function MenuItem({ item, aoNavegar }: MenuItemProps) {
    const [expandido, setExpandido] = useState(false);
    const idSubmenu = useId();

    if (!('subitens' in item)) {
        return <li>
            <NavLink to={item.rota} className="menu-link" onClick={aoNavegar}>
                {item.descricao}
            </NavLink>
        </li>;
    }

    return <li>
        <button
            type="button"
            className="menu-link menu-expansor"
            aria-expanded={expandido}
            aria-controls={idSubmenu}
            onClick={() => setExpandido((atual) => !atual)}
        >
            <span>{item.descricao}</span>
            <span className="menu-seta" aria-hidden="true">▾</span>
        </button>

        <div id={idSubmenu} className={`submenu${expandido ? ' aberto' : ''}`}>
            <ul className="menu-itens">
                {item.subitens.map((sub) => (
                    <MenuItem key={sub.descricao} item={sub} aoNavegar={aoNavegar} />
                ))}
            </ul>
        </div>
    </li>;
}