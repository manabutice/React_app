

# 0) ゴール（このドキュメントでできること）

* `npm create vite@latest` から **最小のReactアプリ** を起動
* **標準的なフォルダ構成** と各ファイルの役割を理解
* **コンポーネント・Props・State・イベント** を使った超基本の画面を実装
* 開発中の **ホットリロード**、**本番ビルド**、**デプロイ準備** の流れを把握

---

# 1) 前提（準備するもの）

* **Node.js** 18 以上推奨（LTS）

  * 未インストールなら [https://nodejs.org/ja](https://nodejs.org/ja) から LTS を入れてください
* パッケージマネージャは **npm**（デフォルト）でOK

  * yarn / pnpm 派なら読み替え可

---

# 2) プロジェクト作成（Vite + React）

ターミナルで作業したいフォルダに移動して、次を実行：

**JavaScript 版（初心者向け）**

```bash
# ① 雛形作成
npm create vite@latest my-react-app -- --template react

# ② 依存パッケージのインストール
cd my-react-app
npm install

# ③ 開発サーバ起動（ホットリロード）
npm run dev
```

**TypeScript 版（将来も見据えるならこちら）**

```bash
npm create vite@latest my-react-app -- --template react-swc-ts
cd my-react-app
npm install
npm run dev
```

起動後に表示されるローカルURL（例：`http://localhost:5173`）をブラウザで開くと、初期画面が見られます。

---

# 3) フォルダ構成（最小・わかりやすい形）

作成直後の最小構成はこんなイメージです（JS 版例）：

```
my-react-app/
├─ node_modules/            # 依存パッケージ（自動生成）
├─ public/                  # 静的ファイル（そのまま配信）
│  └─ favicon.svg
├─ src/                     # アプリ本体
│  ├─ assets/               # 画像・フォントなど
│  │  └─ react.svg
│  ├─ App.jsx               # 画面の中心コンポーネント
│  ├─ App.css               # App用のCSS
│  ├─ main.jsx              # エントリポイント（rootに描画）
│  └─ index.css             # グローバルCSS
├─ .gitignore
├─ index.html               # ルートHTML（Viteがここにバンドル差し込み）
├─ package.json             # スクリプトや依存関係の定義
├─ README.md
└─ vite.config.js           # Vite 設定（必要に応じて編集）
```

> 役割の要点

* **index.html**: アプリの土台。`<div id="root"></div>` にReactを差し込みます。
* **src/main.jsx**: Reactの「起動ファイル」。`createRoot(...).render(<App />)` を実行。
* **src/App.jsx**: 画面の中心（最上位）コンポーネント。
* **src/components/**（自分で作る）: 再利用する小さなUI部品を置く場所。
* **public/**: 画像などをパス直指定で配信したい時に利用。

> （おすすめ）自分で少し整理したフォルダ構成

```
src/
├─ components/         # 再利用コンポーネント（Button.jsx など）
├─ pages/              # 画面単位（Home.jsx など）
├─ hooks/              # カスタムフック（useSomething.js）
├─ styles/             # CSS や CSS Modules
├─ assets/             # 画像・アイコン
├─ App.jsx
├─ main.jsx
└─ index.css
```

最初は最小構成でOK。規模が大きくなったら徐々に分割しましょう。

---

# 4) 最小アプリのコード（学びやすいサンプル）

## 4-1) `main.jsx`（Reactを起動してDOMに描画）

```jsx
// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## 4-2) `App.jsx`（コンポーネント / Props / State / イベントを一気に体験）

```jsx
// src/App.jsx
import { useState } from "react";

// ① 小さな「表示だけのコンポーネント（Presentational）」
//   - 親から文字列を受け取って表示するだけ（Props）
function HelloMessage({ name }) {
  return <p>こんにちは、{name} さん！</p>;
}

// ② クリック回数を数えるコンポーネント（State & イベント）
function CounterButton({ label = "カウント" }) {
  const [count, setCount] = useState(0);      // State（状態）
  const handleClick = () => setCount(c => c + 1); // イベントハンドラ
  return (
    <button onClick={handleClick} style={{ padding: "8px 12px" }}>
      {label}: {count}
    </button>
  );
}

// ③ 親（App）で子を使う：Propsの受け渡し
export default function App() {
  const users = ["田中", "佐藤", "鈴木"]; // 配列のレンダリング

  return (
    <main style={{ maxWidth: 640, margin: "32px auto", fontFamily: "system-ui" }}>
      <h1>React 超入門ミニアプリ</h1>

      <section>
        <h2>1) Propsで表示を差し替える</h2>
        <HelloMessage name="チセ" />
        <HelloMessage name="マナブ" />
      </section>

      <section>
        <h2>2) Stateとイベントでインタラクション</h2>
        <CounterButton label="クリック数" />
      </section>

      <section>
        <h2>3) 配列レンダリング（map）</h2>
        <ul>
          {users.map((u) => (
            <li key={u}>{u}</li>   {/* key を付けるのがReactの基本ルール */}
          ))}
        </ul>
      </section>
    </main>
  );
}
```

> ここで学べる要点（React Learn の基本に対応）

* **コンポーネント**: 関数でUIを作る最小単位
* **Props**: 親 → 子へ渡す読み取り専用のデータ
* **State**: コンポーネント内で変わる「状態」（`useState`）
* **イベント**: `onClick` などでユーザー操作に反応
* **配列レンダリング**: `array.map()` ＋ **key** が必須

---

# 5) スクリプトの使い方（開発～ビルド）

`package.json` に自動で入っているスクリプト（Viteの標準）：

```jsonc
{
  "scripts": {
    "dev": "vite",           // 開発サーバ（ホットリロード）
    "build": "vite build",   // 本番ビルド（dist/ 生成）
    "preview": "vite preview"// ビルド結果をローカルで確認
  }
}
```

* 開発中: `npm run dev`
* 本番ビルド: `npm run build` → `dist/` が出力
* ビルド確認: `npm run preview`

---

# 6) よくある質問（超要点だけ）

**Q1. CSS はどこに書く？**

* 全体共通は `src/index.css`、コンポーネント専用なら同階層に `Button.css` などを置くのがわかりやすいです。
* 慣れてきたら **CSS Modules** や **Tailwind CSS** も選択肢。

**Q2. 画像は？**

* `src/assets` に入れて `import img from './assets/sample.png'` で使えます。
* そのまま配信したい静的ファイルは `public/` に置き、`/logo.png` のように参照。

**Q3. ルーティング（ページ切替）は？**

* SPA なら **react-router-dom** を追加：`npm i react-router-dom`
* サーバサイドやSEOも見据えるなら最初から **Next.js** も検討（下記）

---

# 7) もう一歩：Next.js で始めるなら（超簡潔）

* SSR/SSG、ファイルベースルーティング、画像最適化などが最初から使えます。

```bash
npx create-next-app@latest my-next-app
cd my-next-app
npm run dev
```

* 迷ったら：**小さく学ぶ→Vite**、**実サービス志向→Next.js** のイメージでOK。

---

# 8) 開発体験をよくする小ワザ

* **ESLint/Prettier** を入れておくとコードが揃って読みやすくなります。

  ```bash
  npm i -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks
  ```
* VS Code の **ESLint** / **Prettier**拡張機能を入れて「保存時に整形」をON。

---

# 9) つまずきやすいポイント（最初に知っておくと楽）

* JSX 内で JavaScript を使うときは `{ ... }` で囲む
* 配列レンダリングには**必ず `key`** を付ける
* State を更新すると**自動で再描画**される（直接代入はNG、`setState` を使う）
* Propsは**読み取り専用**（子は直接変更しない）

---