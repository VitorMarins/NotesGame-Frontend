import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import './CreateButton.css';
import { AuthContext } from './../contexts/contexts';

export default function CreateButton({ adicionarJogo }) {
    const { usuarioId } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoJogo, setNovoJogo] = useState({
        nome: '',
        imagem: '',
        descricao: '',
        status: '',
        categoria: '',
        plataforma: '',
        usuario: usuarioId,
    });
    const [erroValidacao, setErroValidacao] = useState([]);
    const token = localStorage.getItem('token');
    const abrirModal = () => setIsModalOpen(true);
    const fecharModal = () => setIsModalOpen(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoJogo((prev) => ({ ...prev, [name]: value }));
    };

    const validarFormulario = () => {
        const camposObrigatorios = ['nome', 'imagem', 'status', 'categoria', 'plataforma'];
        const camposVazios = camposObrigatorios.filter((campo) => !novoJogo[campo]);

        if (camposVazios.length > 0) {
            setErroValidacao(camposVazios);
            return false;
        }
        setErroValidacao([]);
        return true;
    };

    const salvarNovoJogo = async () => {
        if (!validarFormulario()) return;

        try {
            const response = await fetch('https://listajogos-backend.onrender.com/api/jogos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(novoJogo),
            });

            if (response.ok) {
                alert('Jogo adicionado com sucesso!');
                fecharModal();
                adicionarJogo();
            } else {
                const errorData = await response.json();
                alert(`Erro ao adicionar jogo: ${errorData.message || response.status}`);
            }
        } catch (error) {
            console.error('Erro ao salvar novo jogo:', error.message);
            alert('Erro ao salvar novo jogo. Tente novamente mais tarde.');
        }
    };


    return (
        <>
            <button className="create-button" onClick={abrirModal}>
                Adicionar Jogo
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Adicionar Novo Jogo</h2>

                        <label>
                            Nome:
                            <input
                                type="text"
                                name="nome"
                                value={novoJogo.nome}
                                onChange={handleChange}
                                aria-label="Nome do Jogo"
                            />
                        </label>

                        <label>
                            Imagem URL:
                            <input
                                type="text"
                                name="imagem"
                                value={novoJogo.imagem}
                                onChange={handleChange}
                                aria-label="URL da Imagem"
                            />
                        </label>

                        <label>
                            Status:
                            <select
                                name="status"
                                value={novoJogo.status}
                                onChange={handleChange}
                                aria-label="Status do Jogo"
                            >
                                <option value="">Selecione o status</option>
                                <option value="Jogando">Jogando</option>
                                <option value="Finalizado">Finalizado</option>
                                <option value="Planejando Jogar">Planejando Jogar</option>
                            </select>
                        </label>

                        <label>
                            Categoria:
                            <input
                                type="text"
                                name="categoria"
                                value={novoJogo.categoria}
                                onChange={handleChange}
                                aria-label="Categoria do Jogo"
                            />
                        </label>

                        <label>
                            Plataforma:
                            <input
                                type="text"
                                name="plataforma"
                                value={novoJogo.plataforma}
                                onChange={handleChange}
                                aria-label="Plataforma do Jogo"
                            />
                        </label>

                        {erroValidacao.length > 0 && (
                            <div className="error-message">
                                {erroValidacao.map((campo) => (
                                    <p key={campo}>O campo {campo} é obrigatório</p>
                                ))}
                            </div>
                            )}

                        <div className="modal-actions">
                            <button onClick={salvarNovoJogo} type="submit">
                                Salvar
                            </button>
                            <button onClick={fecharModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

CreateButton.propTypes = {
    adicionarJogo: PropTypes.func.isRequired,
};
