import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
            console.log(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const newRepository = {
            "url": "https://github.com/shuttzz/desafio-react-conceitos",
            "title": "Desafio da parte de conceitos do ReactJS do nível 1 -  Bootcamp GoStack12",
            "techs": ["Node"],
            "likes": 0
        }

        const response = await api.post('/repositories', newRepository);
        if (response.status === 200) {
            const newRepositoy = response.data;
            setRepositories([...repositories, newRepositoy]);
        }
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`/repositories/${id}`);
        if (response.status === 204) {
            const repositoriesResult = repositories.filter(repository => repository.id !== id);
            setRepositories(repositoriesResult);
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {
                    repositories.map(repository => {
                        return (
                            <li key={repository.id}>
                                {repository.title}
                                <button onClick={() => handleRemoveRepository(repository.id)}>
                                    Remover
                                </button>
                            </li>
                        );
                    })
                }
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
