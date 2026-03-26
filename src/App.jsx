import "./App.css"; 
import Header from './components/Header';
import Banner from './components/Banner'; // Importando o componente Banner

function App() {
  return (
    <div>
      <div className="cabecalho-app">
        <Header />
      </div>
      <main className='Meio-app'>
        <Banner />
      </main>
    </div>
  );
}

export default App;