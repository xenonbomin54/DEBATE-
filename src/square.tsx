import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase.js';

function Squares({ post }) {
  return (
    <div style={{ padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px', marginBottom: '10px' }}>
      <strong style={{ fontSize: '2vh' }}>{post.title}</strong>
      <p style={{ fontSize: '1.5vh', margin: '5px 0 0 0' }}>{post.content}</p>
    </div>
  )
}

function AAA({ posts }) {
  return (
    <div style={{ width: '45vw', height: '80vh', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
      <button style={{ fontSize: '5vh', border: 'none', cursor: 'pointer', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)', marginBottom: '10px' }} onClick={makeSquare}>+</button>
      <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        {posts.map((post) => (
          <Squares key={post.id} post={post} />
        ))}
      </div>
    </div>  
  )
}

function makeSquare() {
  alert('광장 만들기');
}

function BBB() {
  return (
    <div style={{ width: '45vw', height: '80vh', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '15px' }}></div>  
  )
}

export default function Square() {
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
      } else {
        setEmail(user.email || '');
      }
    }
    
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false });
        
      if (!error && data) {
        setPosts(data);
      }
    }

    checkAuth();
    fetchPosts();
  }, [navigate]);

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('로그아웃 실패:', error.message);
    } else {
      navigate('/');
    }
  }
 
  return (
    <>
      <div style={{ display: 'flex', height: '8vh' }}>
        <div style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', width: '100vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
          <div>
            <h1 style={{ fontSize: '3vh', cursor: 'pointer' }} onClick={() => navigate('/square')}>DEBATE!</h1>
          </div>
          <div>
            <a onMouseEnter={(e) => ((e.target as HTMLElement).style.scale = '1.1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.scale = '1')} style={{ margin: '0 10px', color: '#000000', cursor: 'pointer', transition: '0.3s', textDecoration: 'none', scale: '1', display: 'inline-block' }}>비둘기</a>
            <a onMouseEnter={(e) => ((e.target as HTMLElement).style.scale = '1.1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.scale = '1')} style={{ margin: '0 10px', color: '#000000', cursor: 'pointer', transition: '0.3s', textDecoration: 'none', scale: '1', display: 'inline-block' }}>광장</a>
            <a onMouseEnter={(e) => ((e.target as HTMLElement).style.scale = '1.1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.scale = '1')} style={{ margin: '0 10px', color: '#000000', cursor: 'pointer', transition: '0.3s', textDecoration: 'none', scale: '1', display: 'inline-block' }}>항아리투표</a>
            <a onMouseEnter={(e) => ((e.target as HTMLElement).style.scale = '1.1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.scale = '1')} style={{ margin: '0 10px', color: '#000000', cursor: 'pointer', transition: '0.3s', textDecoration: 'none', scale: '1', display: 'inline-block' }}>마이페이지</a>
            <a href="#" onClick={handleLogout} onMouseEnter={(e) => ((e.target as HTMLElement).style.scale = '1.1')} onMouseLeave={(e) => ((e.target as HTMLElement).style.scale = '1')} style={{ margin: '0 10px', color: '#ff0000', cursor: 'pointer', transition: '0.3s', textDecoration: 'none', scale: '1', display: 'inline-block' }}>로그아웃</a>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '92vh' }} >
        <AAA posts={posts} />
        <BBB />
      </div>
    </>
  );
}
