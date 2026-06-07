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
    <div style={{ display: 'flex', height: '8vh' }}>
      <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
        <div>
          <h1 style={{ fontSize: '3vh' }}>DEBATE!</h1>
        </div>
        <div>
          <a href="#" onClick={handleLogout} onMouseEnter={(e) => (e.target.style.color = 'red')} onMouseLeave={(e) => (e.target.style.color = '#000000')} style={{ color: '#000000', cursor: 'pointer', transition: 'color 0.3s', textDecoration: 'none' }}>로그아웃</a>
        </div>
      </div>
    </div>
  );
}
