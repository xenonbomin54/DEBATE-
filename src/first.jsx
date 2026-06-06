import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase.js';

export default function First() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
      } else {
        setEmail(user.email);
      }
    }
    checkAuth();
  }, [navigate]);

  async function handleLogout(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패:', error.message);
    } else {
      navigate('/');
    }
  }
 
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ padding: '20px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.7)', width: '300px', textAlign: 'center' }}>
        <h1>논쟁의 즐거움, DEBATE!</h1>
        <p>환영합니다 "{email}"님<br />지금 바로 토론을 시작해보세요</p>
        <button style={{
      marginTop: '10px',
      padding: '10px 20px',
      borderRadius: '4px',
      backgroundColor: '#00c8ff',
      color: '#FFFFFF',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    }}>광장 만들기</button><br />
        <button style={{
      marginTop: '10px',
      marginBottom: '20px',
      padding: '10px 20px',
      borderRadius: '4px',
      backgroundColor: '#00c8ff',
      color: '#FFFFFF',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    }}>광장 참여하기</button>
        <br />
        <a href="#" onClick={handleLogout} style={{ color: '#000000', textDecoration: 'underline' }}>로그아웃</a>
      </div>
    </div>
  );
}
