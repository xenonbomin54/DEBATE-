import { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

export default function First() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getUserEmail() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email);
      }
    }
    getUserEmail();
  }, []);
 
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>첫 페이지</h1>
      <p>환영합니다. 당신의 아이디는 "{email}"입니다.</p>
    </div>
  );
}
