import './Header.css';
import { FaSearch } from "react-icons/fa";
import devkeycerto from "../assets/devkeycerto.png";
import devkeytech from "../assets/devkeytech.png"

function Header(props) {
    // CORREÇÃO: Adicionado 'user' na desestruturação das props vindas do App.jsx
    const { activeTab, setActiveTab, search, setSearch, user } = props;

    return (
        <header className='header'>
            <div className='Header-app'>
               <img src={devkeytech} alt="Logodevkey" className="imagem" />
            </div>

            <div className='Bemvindo'>
                {/* CORREÇÃO: Removido o nome estático e colocado o estado dinâmico {user?.name} */}
                <h2>Bem vindo, <span className='nomeUsuario'>{user ? user.name : "Visitante"}! 👋🏻</span></h2>
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
                        Carrinho
                    </button>

                </div>
            </div>

            <div className='input-container'>
                <FaSearch className='search-icon' />
                <input 
                    type="text" 
                    className='inputt'  
                    placeholder='Buscar no DevKey Tech...' 
                    value={search || ""} 
                    onChange={(e) => setSearch(e.target.value)}
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