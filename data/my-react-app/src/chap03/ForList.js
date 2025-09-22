// ForList.js  ― 写真（本のサンプル）風レイアウト
import React from "react";

export default function ForList({ src }) {
  return (
    <dl>
      {src.map((elem) => (
        <React.Fragment key={elem.isbn || elem.title}>
          <dt>
            <a
              href={`https://wings.msn.to/index.php/-/A-03/${elem.isbn}/`}
              target="_blank"
              rel="noreferrer"
            >
              {elem.title}（{elem.price}円）
            </a>
          </dt>
          <dd>{elem.summary}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
