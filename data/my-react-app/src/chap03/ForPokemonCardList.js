import React from "react";                                         // ← Reactの読み込み
import "./PokemonCard.css";                                        // ← カード用CSSの読み込み

// タイプごとのアクセントカラー表（ないタイプはデフォルト色に） // ← 色の辞書
const TYPE_COLORS = {                                              // ← オブジェクト開始
  "でんき": "#F7D02C",
  "ほのお": "#EE8130",
  "みず":   "#6390F0",
  "くさ":   "#7AC74C",
  "ノーマル": "#A8A77A"
};                                                                 // ← オブジェクト終了

// 単体カード用の小コンポーネント                               // ← 1匹分の表示
function PokemonCard({ p }) {                                      // ← props p に1匹分のデータ
  const accent = TYPE_COLORS[p.type] ?? "#DADADA";                 // ← タイプ色（なければ灰色）
  const hpPercent = Math.min(100, Math.max(0, (p.hp / 120) * 100));// ← HPバー用に0-100%へ正規化

  return (                                                         // ← 表示するJSXの開始
    <div className="card" style={{ borderColor: accent }}>         {/* ← 枠色にタイプ色 */}
      <div className="card-header" style={{ background: accent }}> {/* ← 見出しの帯色 */}
        <span className="card-name">{p.name}</span>                {/* ← 名前表示 */}
        <span className="card-hp">HP {p.hp}</span>                 {/* ← HP数値 */}
      </div>

      <img                                                         // ← 公式スプライト画像
        className="card-image"
        src={p.image}
        alt={p.name}
        onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=No+Img"; }} // ← 画像なければ代替
      />

      <div className="card-type">タイプ：{p.type}</div>            {/* ← タイプ文字 */}

      <div className="hpbar">                                      {/* ← HPバーの外枠 */}
        <div className="hpbar-fill" style={{ width: `${hpPercent}%`, background: accent }} /> {/* ← 中身 */}
      </div>

      <div className="moves">                                      {/* ← 技リスト見出し */}
        <div className="moves-title">わざ</div>
        <ul className="moves-list">                                {/* ← 箇条書き */}
          {p.moves.map((m, i) => (                                // ← mapで技を1つずつ表示
            <li key={i}>{m}</li>                                   // ← インデックスをkeyに（簡易）
          ))}
        </ul>
      </div>
    </div>
  );                                                               // ← JSX終了
}

// リスト全体を並べるコンポーネント                              // ← 配列→カード群
export default function ForPokemonCardList({ src }) {               // ← src に配列が渡される
  return (                                                          // ← JSX開始
    <div className="card-container">                                {/* ← グリッド/並べる箱 */}
      {src.map((p) => (                                             // ← 配列をmapで1匹ずつ
        <PokemonCard key={p.id} p={p} />                            // ← 子カードに渡す（key必須）
      ))}
    </div>
  );                                                                // ← JSX終了
}
