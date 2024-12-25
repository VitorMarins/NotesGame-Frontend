import { useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Certifique-se de que está importando corretamente
import PropTypes from 'prop-types';
import './createButton.css';

export default function CreateButton({ adicionarJogo }) {
    const decoded = jwtDecode(localStorage.getItem('token')); // Decodifica o token para obter o ID do usuário
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoJogo, setNovoJogo] = useState({
        nome: '', // Campo obrigatório
        imagem: '', // Campo obrigatório
        descricao: '', // Campo opcional
        status: '', // Campo obrigatório
        categoria: '', // Campo obrigatório
        plataforma: '', // Campo obrigatório
        usuario: decoded.id, // Relacionado ao usuário autenticado
    });

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
            alert(`Preencha os campos obrigatórios: ${camposVazios.join(', ')}`);
            return false;
        }
        return true;
    };

    const salvarNovoJogo = async () => {
        if (!validarFormulario()) return;

        try {
            const response = await fetch('https://listajogos-backend.onrender.com/api/jogos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(novoJogo),
            });

            if (!response.ok) {
                console.error(`Erro ao adicionar jogo: ${response.status}`);
                return;
            }

            console.log('Jogo adicionado com sucesso!');
            fecharModal();
            adicionarJogo(); // Atualiza a lista de jogos na página inicial
        } catch (error) {
            console.error('Erro ao salvar novo jogo:', error);
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
                            Descrição:
                            <textarea
                                name="descricao"
                                value={novoJogo.descricao}
                                onChange={handleChange}
                                aria-label="Descrição do Jogo"
                                rows="4"
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
