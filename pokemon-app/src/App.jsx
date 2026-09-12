import { useState } from "react";
import "./App.css";


function App() {
  const [nome, setNome] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarPokemon() {
    if (!nome.trim()) return;

    try {
      setCarregando(true);
      setErro("");
      setPokemon(null); // Limpa o anterior

      const nomeNormalizado = nome.trim().toLowerCase();
      const resposta = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${nomeNormalizado}`
      );
      
      if (!resposta.ok) {
        throw new Error("Não encontrado");
      }
      
      const dados = await resposta.json();
      setPokemon(dados);
    } catch (error) {
      setErro("Pokémon não encontrado.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <h1>Pokédex</h1>
      <div>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite um Pokémon"
        />
        <button disabled={!nome.trim() || carregando} onClick={buscarPokemon}>
          {carregando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      {pokemon && (
        <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
          <h2 style={{ textTransform: 'capitalize' }}>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Número: {pokemon.id}</p>
          <p>Altura: {pokemon.height / 10} m</p>
          <p>Peso: {pokemon.weight / 10} kg</p>
        </div>
      )}
    </div>
  );
}

export default App;