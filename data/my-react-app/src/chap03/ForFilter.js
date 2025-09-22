import React, { useMemo } from "react";

const MAX_PRICE = 3500; // ← ここだけ変えればしきい値変更OK

export default function ForFilter({ src }) {
  // 「3500円未満だけ」を厳密に抽出
  const filtered = useMemo(
    () => src.filter(b => Number(b.price) < MAX_PRICE),
    [src]
  );

  // デバッグ：本当に 3500 未満だけになっているか確認
  console.log("PRICES(<3500):", filtered.map(b => b.price));

  return (
    <dl style={{ margin: 0, padding: 16, lineHeight: 1.8 }}>
      {filtered.map((elem) => (
        <React.Fragment key={elem.isbn || elem.title}>
          <dt style={{ fontSize: 18, margin: "8px 0 0" }}>
            <a
              href={`https://wings.msn.to/index.php/-/A-03/${elem.isbn}/`}
              target="_blank"
              rel="noreferrer"
            >
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd style={{ margin: "2px 0 14px 24px", fontSize: 20 }}>
            {elem.summary}
          </dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
