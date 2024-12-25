import { useEffect, useState, useCallback } from 'react';
import './PaginaHome.css';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import CreateButton from '../../components/CreateButton';

function PaginaHome() {
  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJogos = async () => {
    try {
      const response = await fetch('https://listajogos-backend.onrender.com/api/jogos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        console.error(`Erro HTTP: ${response.status}`);
        return [];
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
      return [];
    }
  };

  const carregarJogos = useCallback(async () => {
    setIsLoading(true);
    const jogosData = await fetchJogos();
    setJogos(jogosData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    carregarJogos();
  }, [carregarJogos]);

  return (
    <>
      <Header />
      <main>
        <CreateButton adicionarJogo={carregarJogos} />
        <section id="cards-container">
          {isLoading ? (
            <div className="loader"></div>
          ) : jogos.length > 0 ? (
            jogos.map((jogo) => (
              <Card
                key={jogo._id}
                id={jogo._id}
                imagem={jogo.imagem}
                titulo={jogo.nome}
                status={jogo.status}
                plataforma={jogo.plataforma}
                genero={jogo.categoria}
                atualizarJogos={carregarJogos} // Passa a função para o Card
              />
            ))
          ) : (
            <p>Nenhum jogo encontrado.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PaginaHome;
