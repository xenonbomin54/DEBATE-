import { useState } from 'react';

function Inputt({ title, color, type }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <input
      type={type}
      placeholder={title}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)} 
      style={{
        color: color,
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        fontSize: '16px' ,
        margin: '10px',
        outline: isFocused ? '2px solid #00c8ff' : '2px solid rgba(0,0,0,0.1)',
        transition: 'outline 0.3s ease',
      }}
    />
  );
}

function GO({ vvalue }) {
  return (
    <button style={{
      marginTop: '30px', 
      padding: '10px 20px', 
      borderRadius: '4px', 
      backgroundColor: '#00c8ff', 
      color: '#FFFFFF', 
      border: 'none', 
      fontSize: '16px', 
      cursor: 'pointer' 
    }}>
      {vvalue}
    </button>
  );
}

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '20px'
    }}>
      <img src="./public/Union.png" alt="로고" style={{ width: '150px', height: '150px', marginBottom: '50px', marginTop: '20px' }} />
      
      <div style={{ 
        padding: '20px', 
        borderRadius: '8px', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        width: '300px', 
        textAlign: 'center' 
      }}>
        {isLogin ? (
          <div>
            <h2>로그인</h2>
            <div>
              <Inputt title="아이디" color="#000000" type="text" />
              <Inputt title="비밀번호" color="#000000" type="password" />
              <p style={{ fontSize: '14px', marginTop: '10px', color: '#555555' }}>
                계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} style={{ color: '#00c8ff', textDecoration: 'underline' }}>회원가입</a>
              </p>
              <GO vvalue="로그인" />
            </div>
          </div>
        ) : (
          <div>
            <h2>회원가입</h2>
            <div>
              <Inputt title="아이디" color="#000000" type="text" />
              <Inputt title="비밀번호" color="#000000" type="password" />
              <Inputt title="비밀번호 확인" color="#000000" type="password" />
              <p style={{ fontSize: '14px', marginTop: '10px', color: '#555555' }}>
                이미 계정이 있으신가요? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} style={{ color: '#00c8ff', textDecoration: 'underline' }}>로그인</a>
              </p>
              <GO vvalue="회원가입" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
