import { useState } from "react";
import "./App.css";
import Header from './components/Header';
import Banner from './components/Banner';
import Cards from './components/Cards';
import { ArrayInicial, Produtos } from './data/Array.js';

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [search, setSearch] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

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
    setProdutoSelecionado(item)
    setCorSelecionada("")
  };

  const [corSelecionada, setCorSelecionada] = useState("")

  return (
    <div>
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
                <p> {produtoSelecionado.price}</p>
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

              <button className="fechar" onClick={() => setProdutoSelecionado(null)}>
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

              {itensFiltrados.map((item) => (
                <Cards
                  key={item.id}
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
            <h2 className="maisve">Smartphones e Televisões</h2>

            {itensProdutos.map((item) => (
              <Cards
                key={item.id}
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
          <h1>Lista de desejos</h1>
        )}

        {/* PERFIL */}
        {!produtoSelecionado && activeTab === "perfil" && (
          <h1>Perfil</h1>
        )}

      </main>
    </div>
  );
}

export default App;