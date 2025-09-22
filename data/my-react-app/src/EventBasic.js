import { useState } from 'react';

export default function StateBasic({ init = 0 }) {
  const [count, setCount] = useState(init);
  const handleClick = () => setCount(count + 1);

  return (
    <>
      <button onClick={handleClick}>カウント</button>
      <p>{count}回、クリックされました。</p>
    </>
  );
}

// export default function EventBasic({ type = 'datetime' }) {
//   const current = () => {
//     const d = new Date();
//     switch (type) {
//       case 'date':
//         return d.toLocaleDateString();
//       case 'time':
//         return d.toLocaleTimeString();
//       default:
//         return d.toLocaleString();
//         break;
//     }
//   };

//   return (
//     <div style={{ padding: 16 }}>
//       {/* ボタンクリック時に　current 関数を呼び出し */}
//     </div>
//   );
// }