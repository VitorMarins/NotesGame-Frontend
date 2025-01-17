import { useEffect, useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaginaHome.css';
import { Header, Footer, CreateButton, Card } from './../../imports/importsComponents.jsx';
import { AuthContext } from './../../contexts/contexts';


function PaginaHome() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { usuarioId } = useContext(AuthContext);
  const [jogos, setJogos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarJogos = useCallback(async () => {
    if (!usuarioId) return; // Verifica se usuarioId está definido
    setIsLoading(true);
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
      setJogos(data);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    } finally {
      setIsLoading(false);
    }
  }, [token, usuarioId]);

  useEffect(() => {
    carregarJogos();
  }, [carregarJogos]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  
    

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
                  jogo={jogo}
                  key={jogo._id}
                  atualizarJogos={carregarJogos} // Passa a função para o Card
                />
              ))
            ) : (
              <p id="no-jogos-message">Nenhum jogo encontrado.</p>
            )}
          </section>
      </main>
      <Footer />
    </>
  );
}

export default PaginaHome;