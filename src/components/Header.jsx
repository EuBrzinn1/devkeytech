import './Header.css';
import { FaSearch } from "react-icons/fa";

function Header() {
    return (
        <header className='header'>
            <div className='Header-app'>
                <h2>DevKey Tech</h2>
            </div>

            <div className='Bemvindo'>
                <h3>Bem vindo, <span>Bolsonaro!</span></h3>
            </div>

            <div className='barrasdetarefa'>
                <div className='home'>
                    <button className='Botao'>Inicio</button>
                    <button className='Botao'>Produtos</button>
                    <button className='Botao'>Desejos</button>
                </div>
            </div>

            {/* 🔥 INPUT COM ÍCONE */}
            <div className='input-container'>
                <FaSearch className='search-icon' />
                <input 
                    type="text" 
                    className='inputt'  
                    placeholder='Buscar no DevKey Tech...' 
                />
            </div>

            <div className='header-bars'>
                <h3 className='perfil'>Perfil</h3>
            </div>
        </header>
    );
}

export default Header;