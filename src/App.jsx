import { useState, useEffect } from "react";
import "./App.css";
import Header from './components/Header';
import Banner from './components/Banner';
import Cards from './components/Cards';
import Footer from './components/Footer'; 
import { ArrayInicial, Produtos } from './data/array.js';
import AOS from 'aos'; 
import "aos/dist/aos.css"; 

// 1. Importações do React Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [corSelecionada, setCorSelecionada] = useState("");
  const [desejos, setDesejos] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  // filtro HOME
  const itensFiltrados = ArrayInicial.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // filtro PRODUTOS
  const itensProdutos = Produtos.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  
  // ABRIR MODAL
  const abrirProduto = (item) => {
    setProdutoSelecionado(item);
    setCorSelecionada("");
  };

  const adicionarDesejo = (produto) => {
    // Substituído por toast.warning
    if (!corSelecionada) {
      toast.warn("Selecione uma cor primeiro!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const produtoComCor = {
      ...produto,
      corEscolhida: corSelecionada,
    };

    const existe = desejos.find(
      (item) =>
        item.name === produto.name &&
        item.corEscolhida === corSelecionada
    );

    if (!existe) {
      setDesejos([...desejos, produtoComCor]);
      // Substituído por toast.success
      toast.success(`${produto.name} (${corSelecionada}) adicionado aos desejos!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      // Substituído por toast.info
      toast.info("Este produto com esta cor já está na sua lista!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const removerDesejo = (produto) => {
    setDesejos(
      desejos.filter((item) => !(item.name === produto.name && item.corEscolhida === produto.corEscolhida))
    );
    toast.error("Produto removido dos desejos.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div>
      {/*config dos negocio do toast ai*/}
      <ToastContainer theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable />

      <div className="cabecalho-app">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <main className='Meio-app'>

        {/* MODAL */}
        {produtoSelecionado && (
          <div className="overlay">
            <div className="modal">
              <img
                src={produtoSelecionado.banner}
                alt={produtoSelecionado.name}
              />

              <h2>{produtoSelecionado.name}</h2>
              <p>{produtoSelecionado.desc}</p>

              {produtoSelecionado.price && (
                <p>{produtoSelecionado.price}</p>
              )}
              
              {/* VERIFICAÇÃO DE COR */}
              {produtoSelecionado.cores && (
                <>
                  <p>Selecione a cor</p>

                  <div className="cores">
                    {produtoSelecionado.cores.map((cor) => (
                      <button
                        key={cor}
                        onClick={() => setCorSelecionada(cor)}
                        className={`cor ${corSelecionada === cor ? "ativo" : ""}`}
                      >
                        {cor}
                      </button>
                    ))}
                  </div>

                  {!corSelecionada && (
                    <p style={{ color: "red" }}>
                      Selecione uma cor
                    </p>
                  )}
                </>
              )}

              <button
                className="desejo"
                onClick={() => adicionarDesejo(produtoSelecionado)}
              >
                Clique aqui para adicionar aos desejos!
              </button>

              <button
                className="fechar"
                onClick={() => setProdutoSelecionado(null)}
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        {/* HOME */}
        {!produtoSelecionado && activeTab === "home" && (
          <>
            <Banner />
            <br /><br />

            <div className="grid">
              <h2 className="maisve">Mais vendido!</h2>

              {itensFiltrados.map((item, index) => (
                <Cards
                  key={item.id}
                  index={index}
                  banner={item.banner}
                  title={item.name}
                  category={item.desc}
                  onClick={() => abrirProduto(item)}
                />
              ))}
            </div>
          </>
        )}

        {/* PRODUTOS */}
        {!produtoSelecionado && activeTab === "produtos" && (
          <div className="grid">
            <h2 className="maisve">Produtos</h2>

            {itensProdutos.map((item, index) => (
              <Cards
                key={item.id}
                index={index}
                banner={item.banner}
                title={item.name}
                category={item.desc}
                onClick={() => abrirProduto(item)}
              />
            ))}
          </div>
        )}
        
        {/* DESEJOS */}
        {!produtoSelecionado && activeTab === "desejos" && (
          <>
            <h1 className="lista2">Sua lista de desejos!</h1>

            <div className="grid">
              {desejos.length === 0 ? (
                <h2>Nenhum produto adicionado.</h2>
              ) : (
                desejos.map((item, index) => (
                  <Cards
                    key={`${item.id}-${item.corEscolhida}`}
                    index={index}
                    banner={item.banner}
                    title={item.name}
                    category={item.desc}
                    price={item.price}
                    corEscolhida={item.corEscolhida}
                    onClick={() => abrirProduto(item)}
                  />
                ))
              )}
            </div>
          </>
        )}

        {/* PERFIL */}
        {!produtoSelecionado && activeTab === "perfil" && (
          <h1 className="lista2">Perfil</h1>
        )}

      </main>

      <footer>
        <Footer />
      </footer>

    </div>
  );
}

export default App;