# 📄 React × TypeScript「お問い合わせフォーム」導入手順（現状の構成）

## 🎯 目的

* 名前／メールの入力値を保持（state）
* 入力時に `onChange` で state を更新
* 送信時に未入力チェックをしてアラート表示

---

## 📂 フォルダ／ファイル構成

```text
my-ts-project/
├─ components/
│  └─ container/                  # フォーム関連の全ファイルを集約
│     ├─ ContactForm.tsx          # フォーム全体を管理する親コンポーネント
│     ├─ InputComp.tsx            # テキスト入力部品
│     ├─ TextareaComp.tsx         # 複数行入力部品
│     ├─ CheckboxContainer.tsx    # チェックボックス部品（Chackbox→修正済み）
│     ├─ RadioGroup.tsx           # ラジオボタン部品
│     └─ FormItem.tsx             # ラベル＋必須バッジ部品
└─ pages/
   └─ index.tsx                   # ContactForm を呼び出すページ
```

---

## 🧩 コード一覧（抜粋）

### 1) `components/container/ContactForm.tsx`

```tsx
import React, { useState } from "react";
import InputComp from "./InputComp";

export default function ContactForm() {
  const [state, setState] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitAlert = (e: React.MouseEvent) => {
    e.preventDefault();
    const hasEmpty = Object.values(state).some(v => v.length === 0);
    alert(hasEmpty ? "未入力項目があります" : "送信します");
  };

  return (
    <form>
      <InputComp name="name" value={state.name} onChange={handleChange} />
      <InputComp name="email" value={state.email} onChange={handleChange} />
      <button onClick={submitAlert}>送信</button>
    </form>
  );
}
```

---

### 2) `components/container/InputComp.tsx`

```tsx
import React, { FC } from "react";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComp: FC<Props> = ({ name, value, onChange }) => {
  return <input type="text" name={name} value={value} onChange={onChange} />;
};

export default InputComp;
```

---

### 3) `pages/index.tsx`

```tsx
import React from "react";
import ContactForm from "../components/container/ContactForm";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>お問い合わせフォーム</h1>
      <ContactForm />
    </div>
  );
}
```

---

## ✅ 注意点

* **ファイル名は PascalCase** に統一（`InputComp.tsx`, `CheckboxContainer.tsx`）
* `ChackboxContainer.tsx` は **CheckboxContainer.tsx** に修正
* import パスはすべて `./` でつながる（例: `import InputComp from "./InputComp";`）
* エラーが残る場合はキャッシュ削除

  ```bash
  rm -rf .next
  npm run dev
  ```

---

## 🗒 Notion 記載のおすすめ見出し

1. 目的（入力保持・検証・送信アラート）
2. フォルダ構成（上記ツリー）
3. コード例（ContactForm / InputComp / index）
4. 注意点（PascalCase、import、キャッシュクリア）
