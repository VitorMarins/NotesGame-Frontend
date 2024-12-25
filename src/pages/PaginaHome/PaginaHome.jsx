import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './PaginaHome.css';
import { Header, Footer, CreateButton, Card } from './../../imports/importsComponents.jsx';

function PaginaHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let usuarioId = null;
  if (token) {
        try {
            const decoded = jwtDecode(token);
            usuarioId = decoded.id;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
        }
    }

  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarJogos = useCallback(async () => {
    setIsLoading(true);
    const fetchJogos = async () => {
      try {
        const response = await fetch(`https://listajogos-backend.onrender.com/api/jogos/usuario/${usuarioId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
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
    const jogosData = await fetchJogos();
    setJogos(jogosData);
    setIsLoading(false);
  }, [token, usuarioId]);

  useEffect(() => {
    carregarJogos();
  }, [carregarJogos]);

  if (!token) {
    return (
      <>
        <Header />
        <main>
          <p className="login-message">Você precisa estar logado para acessar essa página.</p>
          <button className="login-button" onClick={() => navigate('/login')}>Entrar</button>
        </main>
        <Footer />
      </>
    );
  };

  return (
    <>
      <Header />
      <main>
        <h1>Seus Jogos</h1>
        <div id="create-button-container">
          <CreateButton adicionarJogo={carregarJogos} />
        </div>
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
};

export default PaginaHome;
