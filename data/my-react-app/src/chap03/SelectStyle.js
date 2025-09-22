import './SelectStyle.css';

export default function SelectStyle({ mode }) {
  return (
    <div className={`box ${mode === 'light' ? 'light' : 'dark'}`}>
      こんにちは世界！
    </div>
  );
}
