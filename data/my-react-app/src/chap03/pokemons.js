// ポケモンのカードに載せるサンプルデータを配列で用意          // ← 配列=箱
const pokemons = [                                                // ← 配列の開始
  {                                                               // ← 1匹目: オブジェクト開始
    id: 25,                                                       // ← 一意のID（Reactのkey用）
    name: "ピカチュウ",                                           // ← 名前
    type: "でんき",                                               // ← タイプ
    hp: 60,                                                       // ← HP
    moves: ["でんきショック", "10まんボルト"],                      // ← 技の配列（2つ）
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" // ← 画像URL
  },                                                              // ← 1匹目終わり
  {
    id: 4,
    name: "ヒトカゲ",
    type: "ほのお",
    hp: 70,
    moves: ["ひのこ", "かえんほうしゃ"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
  },
  {
    id: 7,
    name: "ゼニガメ",
    type: "みず",
    hp: 70,
    moves: ["みずでっぽう", "ハイドロポンプ"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
  },
  {
    id: 1,
    name: "フシギダネ",
    type: "くさ",
    hp: 70,
    moves: ["つるのムチ", "ソーラービーム"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  }
];                                                                 // ← 配列の終了

export default pokemons;                                           // ← 他ファイルから使えるように公開
