import { useState } from "react";
import "./App.css"; 
import Header from './components/Header';
import Banner from './components/Banner';

function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div>
      <div className="cabecalho-app">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className='Meio-app'>

        {activeTab === "home" && <Banner />}
        {activeTab === "produtos" && <h1> Produtos</h1>}
        {activeTab === "desejos" && <h1> Lista de desejos</h1>}
        {activeTab === "perfil" && <h1> Perfil</h1>}

      </main>
    </div>
  );
}

export default App;