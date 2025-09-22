
# React入門ノート

**テーマ：`map`で配列をカード化して表示（ポケモン版）**
※本ノートは、そのまま Notion にコピペして使えます。見出し／コードブロック／チェックリスト構成。

---

## 1. ゴール（完成イメージ）

* ポケモンの「名前／タイプ／HP／わざ／画像」を**カード**として並べて表示
* 配列→`map`→JSX要素の配列→レンダリング、の流れを体験
* React Developer Tools で State/Props を確認できる

---

## 2. 前提環境

* Node.js（推奨：18 以降）

  * バージョン確認：`node -v`
* パッケージマネージャ：npm（または yarn/pnpm）
* ブラウザ：Chrome（React Developer Tools 拡張推奨）

---

## 3. プロジェクト作成（未作成の場合）

```bash
# 例：Create React App（CRA）
npx create-react-app my-react-map-app
cd my-react-map-app
npm start
```

> 既存プロジェクトがある方はこの章をスキップしてください。

---

## 4. フォルダ構成（今回追加するファイル）

```
src/
├── chap03/
│   ├── pokemons.js               # ← データ配列
│   ├── ForPokemonCardList.js     # ← UI（カード一覧）
│   ├── PokemonCard.css           # ← カード用スタイル
│   └── index.js                  # ← chap03のエントリ
└── index.js                      # ← ここからchap03を呼び出す
```

---

## 5. 実装

### 5.1 `src/chap03/pokemons.js`（データ配列）

```js
// ポケモンのカードに載せるサンプルデータ
const pokemons = [
  {
    id: 25,
    name: "ピカチュウ",
    type: "でんき",
    hp: 60,
    moves: ["でんきショック", "10まんボルト"],
    image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
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
];

export default pokemons;
```

---

### 5.2 `src/chap03/ForPokemonCardList.js`（カードUI）

```jsx
import React from "react";
import "./PokemonCard.css";

// タイプごとのアクセントカラー
const TYPE_COLORS = {
  "でんき": "#F7D02C",
  "ほのお": "#EE8130",
  "みず":   "#6390F0",
  "くさ":   "#7AC74C",
  "ノーマル": "#A8A77A"
};

// 単体カード（1匹分）
function PokemonCard({ p }) {
  const accent = TYPE_COLORS[p.type] ?? "#DADADA";
  // HP(0-120)を%に正規化（最大HPは適宜変更OK）
  const hpPercent = Math.min(100, Math.max(0, (p.hp / 120) * 100));

  return (
    <div className="card" style={{ borderColor: accent }}>
      <div className="card-header" style={{ background: accent }}>
        <span className="card-name">{p.name}</span>
        <span className="card-hp">HP {p.hp}</span>
      </div>

      <img
        className="card-image"
        src={p.image}
        alt={p.name}
        onError={(e) => { e.currentTarget.src = "https://placehold.co/150x150?text=No+Img"; }}
      />

      <div className="card-type">タイプ：{p.type}</div>

      <div className="hpbar">
        <div className="hpbar-fill" style={{ width: `${hpPercent}%`, background: accent }} />
      </div>

      <div className="moves">
        <div className="moves-title">わざ</div>
        <ul className="moves-list">
          {p.moves.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 一覧（配列→mapでカード化）
export default function ForPokemonCardList({ src }) {
  return (
    <div className="card-container">
      {src.map((p) => (
        <PokemonCard key={p.id} p={p} />
      ))}
    </div>
  );
}
```

---

### 5.3 `src/chap03/PokemonCard.css`（スタイル）

```css
/* 一覧レイアウト */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: stretch;
  padding: 16px;
}

/* カード本体 */
.card {
  width: 240px;
  border: 3px solid #dadada;
  border-radius: 16px;
  background: #fffdf7;
  box-shadow: 0 6px 18px rgba(0,0,0,.12);
  overflow: hidden;
  transition: transform .15s, box-shadow .15s;
}
.card:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 22px rgba(0,0,0,.18);
}

/* 見出し帯 */
.card-header {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  color: #1a1a1a;
  font-weight: 700;
}
.card-name { font-size: 16px; }
.card-hp   { font-size: 14px; }

/* 画像 */
.card-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  display: block;
  margin: 10px auto 0;
}

/* タイプ表示 */
.card-type {
  text-align: center;
  margin: 6px 12px 4px;
  color: #444;
}

/* HPバー */
.hpbar {
  height: 10px;
  background: #eee;
  border-radius: 6px;
  margin: 0 12px 10px;
  overflow: hidden;
}
.hpbar-fill {
  height: 100%;
  width: 0;
  background: #81c784;
}

/* わざ */
.moves { padding: 6px 12px 14px; }
.moves-title { font-weight: 700; margin-bottom: 4px; }
.moves-list { margin: 0; padding-left: 18px; line-height: 1.5; }
```

---

### 5.4 `src/chap03/index.js`（章のエントリ）

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import pokemons from "./pokemons";
import ForPokemonCardList from "./ForPokemonCardList";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ForPokemonCardList src={pokemons} />);
```

---

### 5.5 `src/index.js`（章切替）

```js
// chap03 を起動する
import "./chap03/index";
```

---

## 6. 実行コマンド

```bash
npm start
# ブラウザ自動起動（http://localhost:3000）
```

---

## 7. 学びのポイント（超要点）

* **配列 → `map` → JSX配列**：データを画面用の要素に変換してレンダリング
* **`key` は必須**：繰り返し要素の差分更新のため（ここでは `id` を使用）
* **見た目の分離**：構造は JSX、装飾は CSS へ
* **Props で分割**：`ForPokemonCardList`（一覧）と `PokemonCard`（単体）の責務を分離

---

## 8. カスタマイズ例（必要に応じてNotionで折りたたみ）

### 8.1 フィルタ（例：タイプで絞り込み）

```jsx
const onlyFire = pokemons.filter(p => p.type === "ほのお");
root.render(<ForPokemonCardList src={onlyFire} />);
```

### 8.2 ソート（例：HP降順）

```jsx
const byHpDesc = [...pokemons].sort((a,b) => b.hp - a.hp);
root.render(<ForPokemonCardList src={byHpDesc} />);
```

### 8.3 画像のフォールバック

* `onError` で `placehold.co` に差し替え済み（ネットワーク不調やID不明の保険）

### 8.4 タイプ色の追加

```js
const TYPE_COLORS = {
  "でんき": "#F7D02C",
  "ほのお": "#EE8130",
  "みず":   "#6390F0",
  "くさ":   "#7AC74C",
  "エスパー": "#F95587",   // ← 追加例
};
```

---

## 9. React Developer Tools（確認手順）

1. Chrome拡張「React Developer Tools」をインストール
2. DevTools（F12）→ タブ「⚛ Components」を開く
3. ツリーで `ForPokemonCardList` → `PokemonCard` を選択
4. 右側に `props.p` が表示（`name`, `type`, `hp`, `moves`, `image`）
5. 値を直接編集 → その場でUIが変わる（デバッグに便利）

> もしタブが見えない：拡張が未インストール／ブラウザ再起動／開発モードで起動（`npm start`）か確認。

---

## 10. よくあるエラー & 対処

* **白画面（何も出ない）**
  → コンソール（DevTools）にエラーがないか確認／`src/index.js` が `./chap03/index` を import しているか再確認

* **画像が表示されない**
  → ネットワーク／URLタイプミス／`onError` でプレースホルダーに切替済み

* **コンポーネントが違うものを描画**
  → 以前のコンポーネント（例：StateBasic）を `root.render` していないかチェック

* **map の警告（key が無い）**
  → 繰り返し要素に `key` を必ず付与（`id` or 一意の識別子）

---

## 11. 章切替のコツ（運用パターン）

複数章を同居させる場合は、`src/index.js` で切り替えるだけにしておくと便利。

```js
// src/index.js
// import "./chap02/index";
import "./chap03/index";
// import "./chap04/index";
```

---

## 12. 参考用：`map` の最小例（JSX）

```jsx
const arr = ["A", "B", "C"];
<ul>
  {arr.map((x, i) => <li key={i}>{x}</li>)}
</ul>
```

* 「配列 → `map` → `<li>`の配列」に変換して、そのまま描画。

---

## 13. チェックリスト（提出前確認）

* [ ] `src/chap03/` の4ファイルがある
* [ ] `src/index.js` が `./chap03/index` を import
* [ ] 起動コマンド `npm start` で表示OK
* [ ] React DevTools で Props/配列を確認
* [ ] `map` に `key` を付けている
* [ ] 画像フォールバックは動作する

---

## 14. 追加発展アイデア

* 「レア度」「弱点／抵抗」「エネルギーコスト」UIを追加
* HP を State にして、ボタンでダメージを与える（`useState`）
* 検索ボックスで名前フィルタ（`useState` + `filter`）
* JSON を外部から fetch して表示（`useEffect` + `fetch`）

---



Success! Created my-react at /Users/murakamimanabu/React_app/data/my-react
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd my-react
  npm start

Happy hacking!# React_app
