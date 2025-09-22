import React from "react";
import dlIcon from "../image/dl.png"; // /src/image フォルダに dl.png を置いておく

/**
 * Download コンポーネント
 * @param {boolean} flag - true のときだけダウンロードアイコンを表示
 */
export default function Download({ isbn }) {
  if (!isbn) {
    // download が false のときは何も表示しない
    return null;
  }

  return (
    <a href={`https://wings.msn.to/index.php/-/A-07/${isbn}/`}>
      <img
        src={dlIcon}
        alt="download icon"
        width={20}
        height={20}
        style={{ marginLeft: 6, verticalAlign: "middle" }}
      />
    </a>
  );
}
