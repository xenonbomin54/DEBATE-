import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase.js';

function Inputt({ title, color, type, id }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <input
      id={id}
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

async function lgn(navigate) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: document.getElementById('username1').value, 
    password: document.getElementById('password1').value  
  })
  if (error) {
    console.error('로그인 실패:', error.message)
  } else {
    console.log('로그인 성공:', data)
    navigate('/first')
  }
}

async function sgu(setIsLogin) {
  if (document.getElementById('password2').value !== document.getElementById('password3').value) {
    console.error('비밀번호가 일치하지 않습니다.')
    return
  } else {
    const { data, error } = await supabase.auth.signUp({
      email: document.getElementById('username2').value, 
      password: document.getElementById('password2').value  
    })
    if (error) {
      console.error('회원가입 실패:', error.message)
    } else {
      console.log('회원가입 성공:', data)
      setIsLogin(true)
    }
  }
}

function GO({ vvalue, onClick }) {
  return (
    <button onClick={onClick} style={{
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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      console.log('연결 시도 중인 URL:', import.meta.env.VITE_SUPABASE_URL);

      const { data, error } = await supabase
        .from('user')
        .select('*');
      
      if (error) {
        console.error('에러 발생:', error);
      } else {
        console.log('데이터 정상 로드 성공!:', data);
      }
    }

    fetchData();
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }}>
      <img src="/Union.png" alt="로고" style={{ width: '150px', height: '150px', marginBottom: '50px', marginTop: '20px' }} />

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
              <Inputt title="아이디" color="#000000" type="text" id="username1" />
              <Inputt title="비밀번호" color="#000000" type="password" id="password1" />
              <p style={{ fontSize: '14px', marginTop: '10px', color: '#555555' }}>
                계정이 없으신가요? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} style={{ color: '#00c8ff', textDecoration: 'underline' }}>회원가입</a>
              </p>
              <GO vvalue="로그인" onClick={() => lgn(navigate)} />
            </div>
          </div>
        ) : (
          <div>
            <h2>회원가입</h2>
            <div>
              <Inputt title="아이디" color="#000000" type="text" id="username2" />
              <Inputt title="비밀번호" color="#000000" type="password" id="password2" />
              <Inputt title="비밀번호 확인" color="#000000" type="password" id="password3" />
              <p style={{ fontSize: '14px', marginTop: '10px', color: '#555555' }}>
                이미 계정이 있으신가요? <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} style={{ color: '#00c8ff', textDecoration: 'underline' }}>로그인</a>
              </p>
              <GO vvalue="회원가입" onClick={() => sgu(setIsLogin)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
