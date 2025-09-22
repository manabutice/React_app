import React from "react";

export default function ForPokemonList({ src }) {
  return (
    <ul>
      {src.map((p) => (
        <li key={p.id}>
          {p.name} は <strong>{p.type}</strong> タイプ！
        </li>
      ))}
    </ul>
  );
}
