// src/App.jsx
import { useState } from 'react';

// 자식 컴포넌트: 박스
function MenuBox({ title, color }) {
  return (
    <div style={{
      width: '120px',
      height: '100px',
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgb(0, 0, 0)'
    }}>
      {title}
    </div>
  );
}

// 메인 부모 컴포넌트
export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h1>DEBATE!</h1>
      <div style={{ border: '1px solid #000000', padding: '20px', borderRadius: '8px', backgroundColor: '#ffffff', width: '300px', textAlign: 'center' }}>
        <h2>로그인</h2>
      </div>
    </div>
  );
}

