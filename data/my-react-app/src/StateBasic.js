import React, { useState } from 'react';

export default function StateEffect({ init = 0 }) {
  const [count, setCount] = useState(init);
  console.log('count is ${count},');

  const handlClick = () => setCount((c) => c + 1);

  return (
    <>
      <button onClick={handlClick}>カウント</button>
      <p>{count}回、クリックされました。</p>
    </>
  );
}