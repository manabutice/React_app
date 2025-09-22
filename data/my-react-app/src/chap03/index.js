// import React from "react";
// import ReactDOM from "react-dom/client";
// import pokemons from "./pokemons";
// import ForPokemonCardList from "./ForPokemonCardList";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<ForPokemonCardList src={pokemons} />);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import books from "./books";
// import ForSort from "./ForSort";
// import Download from "./Download";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<ForSort src={books} />);

import React from "react";
import { createRoot } from 'react-dom/client';
import SelectStyle from "./SelectStyle";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(<SelectStyle mode="light" />);