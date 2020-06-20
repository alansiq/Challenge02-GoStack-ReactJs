import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

const [repositories, setRepositories] = useState([]);

useEffect(()=>{
  api.get('repositories').then(response => {
    setRepositories(response.data);
  })
}, []);


  function handleAddRepository() {
    api.post('repositories', {
      "title": `Novo repositório ${Date.now()}`,
      "url": "https://alansiqueira.com",
      "techs": ["ReactJs", "NodeJS"]}).then(response => {

        const repository = response.data;
        setRepositories([...repositories, repository])

      } )
  }

  async function handleRemoveRepository(id) {
     
     await api.delete(`/repositories/${id}`).then(response => {

      api.get('repositories').then(response => {
        setRepositories(response.data);
      })

     })


     
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button onClick={()=> handleRemoveRepository(repository.id)} >Remover </button>
        </li>

      ))}
      <button onClick={handleAddRepository}>Adicionar</button>
      </ul>

    </div>
  );
}

export default App;


