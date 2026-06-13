import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase.js';

function Squares({ post, onClick }) {
  return (
    <div onClick={onClick} style={{ padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '10px', marginBottom: '20px', cursor: 'pointer' }}>
      <strong style={{ fontSize: '2vh' }}>{post.value}</strong>
      <p style={{ fontSize: '1.5vh', margin: '5px 0 0 0' }}>{post.description}</p>
    </div>
  )
}

function AAA({ posts, onMakeSquareClick, onPostClick }) {
  return (
    <div style={{ width: '45vw', height: '80vh', borderRadius: '15px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <button style={{ fontSize: '5vh', border: 'none', cursor: 'pointer', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.7)', marginBottom: '50px' }} onClick={onMakeSquareClick}>+</button>
      <div className="custom-scroll" style={{ overflowY: 'auto', flexGrow: 1, paddingRight: '10px' }}>
        <style>{`
          .custom-scroll::-webkit-scrollbar { width: 8px; }
          .custom-scroll::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.05); border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 10px; }
        `}</style>
        {posts.map((post) => (
          <Squares key={post.id} post={post} onClick={() => onPostClick(post)} />
        ))}
      </div>
    </div>  
  )
}

function BBB({ onPostSuccess, focusRef }) {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim() || !description.trim()) return;

    const { error } = await supabase
      .from('square')
      .insert([{ value, description }]);

    if (!error) {
      setValue('');
      setDescription('');
      onPostSuccess();
    }
  }

  return (
    <div style={{ width: '45vw', height: '80vh', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '15px', padding: '30px', boxSizing: 'border-box' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <input 
          ref={focusRef}
          type="text" 
          placeholder="광장 제목을 입력하세요" 
          value={value} 
          onChange={(e) => setValue(e.target.value)} 
          style={{ fontSize: '2.5vh', padding: '15px', borderRadius: '10px', border: '1px solid #ccc', marginBottom: '20px', outline: 'none' }}
        />
        <textarea 
          placeholder="광장 설명을 입력하세요" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          style={{ fontSize: '2vh', padding: '15px', borderRadius: '10px', border: '1px solid #ccc', flexGrow: 1, marginBottom: '20px', resize: 'none', outline: 'none' }}
        />
        <button type="submit" style={{ fontSize: '2.5vh', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}>생성하기</button>
      </form>
    </div>  
  )
}


export default function Square() {
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('square')
      .select('*')
      .order('id', { ascending: false });
      
    if (!error && data) {
      setPosts(data);
    }
  }

  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/');
      } else {
        setEmail(user.email || '');
      }
    }

    checkAuth();
    fetchPosts();
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

  function handleMakeSquareClick() {
    setSelectedPost(null);
    setShowInput(true);
  }

  function handlePostClick(post) {
    setShowInput(false);
    setSelectedPost(post);
  }

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  function handlePostSuccess() {
    fetchPosts();
    setShowInput(false);
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
        <AAA posts={posts} onMakeSquareClick={handleMakeSquareClick} onPostClick={handlePostClick} />
        {showInput ? (
          <BBB onPostSuccess={handlePostSuccess} focusRef={inputRef} />
        ) : selectedPost ? (
          <div style={{ width: '45vw', height: '80vh', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '15px', padding: '30px', boxSizing: 'border-box' }}>
            <h2 style={{ fontSize: '3vh', margin: '0 0 20px 0' }}>{selectedPost.value}</h2>
            <div style={{ fontSize: '2vh', whiteSpace: 'pre-wrap' }}>{selectedPost.description}</div>
          </div>
        ) : (
          <div style={{ width: '45vw', height: '80vh' }}></div>
        )}
      </div>
    </>
  );
}
