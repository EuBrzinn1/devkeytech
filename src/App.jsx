import { useState, useEffect } from "react";
import "./App.css";
import Header from './components/Header';
import Banner from './components/Banner';
import Cards from './components/Cards';
import Footer from './components/Footer';
import Profile from './components/Profile'; // Seu componente importado aqui
import { ArrayInicial, Produtos } from './data/Array.js';
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

  const [user, setUser] = useState({
    name: "Rafael",
    fidelidade: "Bronze",
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      easing: "ease-in-out",
    });
  }, []);

  // filtro HOME
  const itensFiltrados = ArrayInicial.filter((item) => {
    const nome = item.name || item.title || item.Title || "";
    return nome.toLowerCase().includes(search.toLowerCase());
  });

  // filtro PRODUTOS
  const itensProdutos = Produtos.filter((item) => {
    const nome = item.name || item.title || item.Title || "";
    return nome.toLowerCase().includes(search.toLowerCase());
  });
  
  // ABRIR MODAL
  const abrirProduto = (item) => {
    setProdutoSelecionado(item);
    setCorSelecionada("");
  };

  // Converte a string "R$ 5.999" para o número 5999 puro para podermos multiplicar
  const converterPrecoParaNumero = (precoString) => {
    if (!precoString) return 0;
    const apenasNumeros = precoString.replace(/\D/g, "");
    return parseFloat(apenasNumeros) || 0;
  };

  // Formata o número calculado de volta para a string bonita no formato "R$ X.XXX"
  const formatarPrecoBr = (valor) => {
    return "R$ " + valor.toLocaleString("pt-BR");
  };

  const adicionarDesejo = (produto) => {
    if (!corSelecionada) {
      toast.warn("Selecione uma cor primeiro!", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const nomeAtual = produto.name || produto.title || produto.Title || "Produto";

    // Busca se já existe um item com o mesmo nome E com a mesma cor no carrinho
    const indexExiste = desejos.findIndex(
      (item) =>
        (item.name === produto.name || item.title === produto.title || item.Title === produto.Title) &&
        item.corEscolhida === corSelecionada
    );

    if (indexExiste !== -1) {
      // Se já existe, cria uma cópia do array e aumenta a quantidade dele em +1
      const copiaDesejos = [...desejos];
      copiaDesejos[indexExiste].quantidade += 1;
      setDesejos(copiaDesejos);

      toast.success(`Mais um ${nomeAtual} (${corSelecionada}) adicionado! Total: ${copiaDesejos[indexExiste].quantidade}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      // Se for o primeiro, insere o item configurando o contador de quantidade em 1
      const produtoComCor = {
        ...produto,
        corEscolhida: corSelecionada,
        quantidade: 1
      };
      setDesejos([...desejos, produtoComCor]);

      toast.success(`${nomeAtual} (${corSelecionada}) adicionado ao seu carrinho!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const removerDesejo = (produto) => {
    const nomeAtual = produto.name || produto.title || produto.Title;
    setDesejos(
      desejos.filter((item) => !((item.name === nomeAtual || item.title === nomeAtual || item.Title === nomeAtual) && item.corEscolhida === produto.corEscolhida))
    );
    toast.error("Produto removido dos desejos.", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div>
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
  user={user}
/>
      </div>

      <main className='Meio-app'>

        {/* MODAL */}
        {produtoSelecionado && (
          <div className="overlay">
            <div className="modal">
              <img
                src={produtoSelecionado.banner}
                alt={produtoSelecionado.name || produtoSelecionado.title || produtoSelecionado.Title}
              />

              <h2>{produtoSelecionado.name || produtoSelecionado.title || produtoSelecionado.Title}</h2>
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
                Clique aqui para adicionar ao carrinho!
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
                  key={item.id || index}
                  index={index}
                  banner={item.banner}
                  title={item.name || item.title || item.Title}
                  category={item.desc}
                  price={item.price}
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
                key={item.id || index}
                index={index}
                banner={item.banner}
                title={item.name || item.title || item.Title}
                category={item.desc}
                price={item.price}
                onClick={() => abrirProduto(item)}
              />
            ))}
          </div>
        )}

     {/* CARRINHO / COMPRAS */}
{!produtoSelecionado && activeTab === "desejos" && (
  <>
    <h1 className="lista2">Seu carrinho!</h1>

    {/* Container principal */}
    <div className="carrinho-container">
      
      {/* Lado Esquerdo: Lista de Produtos */}
      <div className="carrinho-produtos-grid">
        {desejos.length === 0 ? (
          <h2>Nenhum produto adicionado.</h2>
        ) : (
          desejos.map((item, index) => {
            const valorUnitario = converterPrecoParaNumero(item.price);
            const valorTotalCalculado = valorUnitario * item.quantidade;
            const precoFinalMultiplicado = valorUnitario > 0 ? formatarPrecoBr(valorTotalCalculado) : item.price;

            return (
              <Cards
                key={`${item.id || index}-${item.corEscolhida}`}
                index={index}
                banner={item.banner}
                title={item.name || item.title || item.Title}
                category={item.desc}
                price={precoFinalMultiplicado}
                corEscolhida={item.corEscolhida}
                quantidade={item.quantidade}
                onClick={() => abrirProduto(item)}
                onRemover={() => removerDesejo(item)} // <-- PASSANDO A FUNÇÃO DE REMOVER AQUI
              />
            );
          })
        )}
      </div>

      {/* Lado Direito: Caixa de Preço Total Estilizada */}
      {desejos.length > 0 && (
        <div className="resumo-carrinho">
          <h3 className="resumo-titulo">Resumo do Pedido</h3>
          
          <div className="resumo-detalhes">
            <p className="resumo-linha">
              <span>Total de itens:</span> 
              <strong className="resumo-qtd-destaque">
                {desejos.reduce((acc, item) => acc + item.quantidade, 0)}x
              </strong>
            </p>
          </div>

          <div className="resumo-total-secao">
            <span className="resumo-total-label">Valor Total</span>
            <h2 className="resumo-total-valor">
              {formatarPrecoBr(
                desejos.reduce((acumulador, item) => {
                  return acumulador + (converterPrecoParaNumero(item.price) * item.quantidade);
                }, 0)
              )}
            </h2>
          </div>

          {/* Botão do WhatsApp */}
          <button 
            className="btn-whatsapp"
            onClick={() => {
              const numeroWhats = "5515997952060"; // Número do teu rodapé
              
              const itensTexto = desejos.map(item => {
                const nome = item.name || item.title || item.Title;
                return `- ${item.quantidade}x ${nome} (${item.corEscolhida})`;
              }).join('\n');

              const totalWhats = formatarPrecoBr(
                desejos.reduce((acc, item) => acc + (converterPrecoParaNumero(item.price) * item.quantidade), 0)
              );

              const mensagem = encodeURIComponent(
                `Olá DevKey Tech! Gostaria de finalizar meu pedido:\n\n${itensTexto}\n\n*Total: ${totalWhats}*`
              );
              
              window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`, '_blank');
            }}
          >
            <span className="icon-whats">💬</span> Enviar para o WhatsApp
          </button>
        </div>
      )}

    </div>
  </>
)}

        {/* PERFIL */}
{!produtoSelecionado && activeTab === "perfil" && (
  <Profile
    user={user}
    setUser={setUser}
  />
)}

      </main>

      <footer>
        <Footer />
      </footer>

    </div>
  );
}

export default App;