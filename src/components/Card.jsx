import { useState } from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card({ jogo, atualizarJogos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jogoEditado, setJogoEditado] = useState({ 
        nome: jogo.nome || '', 
        status: jogo.status || '', 
        plataforma: jogo.plataforma || '', 
        genero: jogo.genero || '' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(null); // 'success' ou 'error'

    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJogoEditado((prev) => ({ ...prev, [name]: value }));
    };

    const salvarAlteracoes = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token ausente');
            return;
        }

        setIsLoading(true); // Ativa o indicador de carregamento
        setUpdateStatus(null); // Reseta o status de atualização antes de enviar

        try {
            const response = await fetch(`https://listajogos-backend.onrender.com/api/jogos/${jogo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(jogoEditado),
            });

            if (!response.ok) {
                setUpdateStatus('error');
                console.error(`Erro ao atualizar jogo: ${response.status}`);
                return;
            }

            setUpdateStatus('success');
            console.log('Jogo atualizado com sucesso!');
            fecharModal();
            atualizarJogos(); // Atualiza a lista de jogos
        } catch (error) {
            setUpdateStatus('error');
            console.error('Erro ao salvar alterações:', error);
        } finally {
            setIsLoading(false); // Desativa o indicador de carregamento
        }
    };

    const excluirJogo = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token ausente');
            return;
        }
        try {
            const response = await fetch(`https://listajogos-backend.onrender.com/api/jogos/${jogo._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                console.error(`Erro ao excluir jogo: ${response.status}`);
                return;
            }
            console.log('Jogo excluido com sucesso!');
            fecharModal();
            atualizarJogos();
        } catch (error) {
            console.error('Erro ao excluir jogo:', error);
            
        }
    }

    const fecharModalNoFundo = (e) => {
        if (e.target.className === 'modal') {
            fecharModal();
        }
    };

    return (
        <>
            <button className="card" title={jogo.nome} onClick={abrirModal}>
                <img src={jogo.imagem} alt={`Imagem de ${jogo.nome}`} />
                <h2>{jogo.nome}</h2>
                <h3>{`Status: ${jogo.status}`}</h3>
                <p>{`Plataforma: ${jogo.plataforma}`}</p>
                <p>{`Gênero: ${jogo.genero}`}</p>
            </button>

            {isModalOpen && (
                <div className="modal" onClick={fecharModalNoFundo}>
                    <div className="modal-content">
                        <h2>Editar Jogo</h2>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                value={jogoEditado.nome}
                                onChange={handleChange}
                                aria-label="Título do jogo"
                            />
                        </label>
                        <label>
                            Status:
                            <select
                                name="status"
                                value={jogoEditado.status}
                                onChange={handleChange}
                                aria-label="Status do Jogo"
                            >
                                <option value="">Selecione o status</option>
                                <option value="Planejando Jogar">Planejando Jogar</option>
                                <option value="Jogando">Jogando</option>
                                <option value="Finalizado">Finalizado</option>
                            </select>
                        </label>
                        <label>
                            Plataforma:
                            <input
                                type="text"
                                name="plataforma"
                                value={jogoEditado.plataforma}
                                onChange={handleChange}
                                aria-label="Plataforma do jogo"
                            />
                        </label>
                        <label>
                            Gênero:
                            <input
                                type="text"
                                name="genero"
                                value={jogoEditado.genero}
                                onChange={handleChange}
                                aria-label="Gênero do jogo"
                            />
                        </label>

                        <div className="modal-actions">
                            <button disabled={isLoading} onClick={salvarAlteracoes}>
                                {isLoading ? 'Salvando...' : 'Salvar'}
                            </button>
                            <button onClick={excluirJogo}>Excluir</button>
                            <button onClick={fecharModal}>Cancelar</button>
                        </div>
                        
                        {updateStatus === 'success' && <div className="success-message">Jogo atualizado com sucesso!</div>}
                        {updateStatus === 'error' && <div className="error-message">Erro ao atualizar o jogo.</div>}
                    </div>
                </div>
            )}
        </>
    );
}

Card.propTypes = {
    jogo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        nome: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        plataforma: PropTypes.string.isRequired,
        genero: PropTypes.string.isRequired,
        imagem: PropTypes.string.isRequired
    }),
    atualizarJogos: PropTypes.func.isRequired,
};
