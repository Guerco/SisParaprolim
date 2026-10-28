import { Link } from 'react-router';

const SRC_LOGO = '/logotipo.png';

interface LogoLinkProps {
    className?: string;
    aoClicar?: () => void;
}

export default function LogoLink({ className = '', aoClicar }: LogoLinkProps) {
    return <Link
        to="/"
        className={`logo-link ${className}`}
        title="Voltar ao início"
        onClick={aoClicar}
    >
        <img src={SRC_LOGO} alt="Paraprolim" />
    </Link>;
}