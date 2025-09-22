// src/chap03/ForSort.js
import React, { useMemo, useState } from "react";
import Download from "./Download"; // ← dl.png を表示する小コンポーネント

export default function ForSort({ src }) {
  // 並び替え対象キーと順序
  const [sortKey, setSortKey] = useState("price"); // 'price' | 'title'
  const [order, setOrder] = useState("asc");       // 'asc' | 'desc'

  // 比較関数
  const getComparator = (key, ord) => (a, b) => {
    let av = a[key];
    let bv = b[key];

    if (key === "price") {
      av = Number(av);
      bv = Number(bv);
    } else {
      av = String(av).toLowerCase();
      bv = String(bv).toLowerCase();
    }

    if (av < bv) return ord === "asc" ? -1 : 1;
    if (av > bv) return ord === "asc" ? 1 : -1;

    // 同値時の安定ソート用タイブレーク
    const ai = String(a.isbn || a.title || "");
    const bi = String(b.isbn || b.title || "");
    if (ai < bi) return -1;
    if (ai > bi) return 1;
    return 0;
  };

  // 並び替え結果を計算
  const sorted = useMemo(() => {
    const list = Array.isArray(src) ? [...src] : [];
    list.sort(getComparator(sortKey, order));
    return list;
  }, [src, sortKey, order]);

  return (
    <div style={{ padding: 16, lineHeight: 1.8 }}>
      {/* 操作UI */}
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label>
          並び替え対象：
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            style={{ marginLeft: 6 }}
          >
            <option value="price">価格</option>
            <option value="title">タイトル</option>
          </select>
        </label>
        <label>
          順序：
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            style={{ marginLeft: 6 }}
          >
            <option value="asc">昇順（小→大 / あ→ん）</option>
            <option value="desc">降順（大→小 / ん→あ）</option>
          </select>
        </label>
        <span style={{ color: "#666" }}>（{sorted.length} 件）</span>
      </div>

      {/* リスト表示 */}
      <dl style={{ margin: 0 }}>
        {sorted.map((elem) => (
          <React.Fragment key={elem.isbn || elem.title}>
            <dt
              style={{
                fontSize: 18,
                margin: "8px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <a
                href={`https://wings.msn.to/index.php/-/A-03/${elem.isbn}/`}
                target="_blank"
                rel="noreferrer"
              >
                {elem.title}（{elem.price}円）
              </a>
              {/* download が true の本だけアイコン表示 */}
              <Download flag={elem.download} />
            </dt>
            <dd style={{ margin: "2px 0 14px 24px", fontSize: 20 }}>
              {elem.summary}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}
