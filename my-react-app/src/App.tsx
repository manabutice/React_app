// src/App.jsx
import { useState } from "react";

// ① 小さな「表示だけのコンポーネント（Presentational）」
//   - 親から文字列を受け取って表示するだけ（Props）
function HelloMessage({ name }: { name: string }) {
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
            <li key={u}>{u}</li>   /* key を付けるのがReactの基本ルール */
          ))}
        </ul>
      </section>
    </main>
  );
}
