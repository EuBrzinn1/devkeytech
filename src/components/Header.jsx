import './Header.css';
import { FaSearch } from "react-icons/fa";

function Header({ activeTab, setActiveTab }) {
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
                    
                    <button 
                        className={`Botao ${activeTab === "home" ? "ativo" : ""}`}
                        onClick={() => setActiveTab("home")}
                    >
                        Inicio
                    </button>

                    <button 
                        className={`Botao ${activeTab === "produtos" ? "ativo" : ""}`}
                        onClick={() => setActiveTab("produtos")}
                    >
                        Produtos
                    </button>

                    <button 
                        className={`Botao ${activeTab === "desejos" ? "ativo" : ""}`}
                        onClick={() => setActiveTab("desejos")}
                    >
                        Desejos
                    </button>

                </div>
            </div>

            <div className='input-container'>
                <FaSearch className='search-icon' />
                <input 
                    type="text" 
                    className='inputt'  
                    placeholder='Buscar no DevKey Tech...' 
                />
            </div>

            <div className='header-bars'>
                <h3 
                    className='perfil'
                    onClick={() => setActiveTab("perfil")}
                    style={{ cursor: "pointer" }}
                >
                    Meu Perfil
                </h3>
            </div>
        </header>
    );
}

export default Header;