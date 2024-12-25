import { useState } from 'react';
import PropTypes from 'prop-types';
import './card.css';

export default function Card({ id, imagem, titulo, status, plataforma, genero, atualizarJogos }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jogoEditado, setJogoEditado] = useState({ titulo, status, plataforma, genero });

    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJogoEditado((prev) => ({ ...prev, [name]: value }));
    };

    const salvarAlteracoes = async () => {
        try {
            const response = await fetch(`https://listajogos-backend.onrender.com/api/jogos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(jogoEditado),
            });

            if (!response.ok) {
                console.error(`Erro ao atualizar jogo: ${response.status}`);
                return;
            }

            console.log('Jogo atualizado com sucesso!');
            fecharModal();
            atualizarJogos(); // Atualiza a lista de jogos na página inicial
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    return (
        <>
            <button className="card" title={titulo} onClick={abrirModal}>
                <img src={imagem} alt={`Imagem de ${titulo}`} />
                <h2>{titulo}</h2>
                <h3>{`Status: ${status}`}</h3>
                <p>{`Plataforma: ${plataforma}`}</p>
                <p>{`Gênero: ${genero}`}</p>
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Jogo</h2>
                        <label>
                            Título:
                            <input
                                type="text"
                                name="titulo"
                                value={jogoEditado.titulo}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Status:
                            <input
                                type="text"
                                name="status"
                                value={jogoEditado.status}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Plataforma:
                            <input
                                type="text"
                                name="plataforma"
                                value={jogoEditado.plataforma}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Gênero:
                            <input
                                type="text"
                                name="genero"
                                value={jogoEditado.genero}
                                onChange={handleChange}
                            />
                        </label>
                        <div className="modal-actions">
                            <button onClick={salvarAlteracoes}>Salvar</button>
                            <button onClick={fecharModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

Card.propTypes = {
    id: PropTypes.string.isRequired,
    imagem: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    plataforma: PropTypes.string.isRequired,
    genero: PropTypes.string.isRequired,
    atualizarJogos: PropTypes.func.isRequired,
};
