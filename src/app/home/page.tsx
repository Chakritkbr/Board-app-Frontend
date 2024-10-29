'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { AddPost } from '../components/AddPost';

interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  category: string;
  updated_at: string;
  comments: PostComment[];
}

export interface PostComment {
  id: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAddPostOpen, setIsAddPostOpen] = useState<boolean>(false); // State สำหรับการแสดงโมดัล

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/post/');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data: Post[] = await response.json();
        const sortedPosts = data.sort((a, b) => {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        });
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleAddPostClose = () => {
    setIsAddPostOpen(false); // ฟังก์ชันเพื่อปิดโมดัล
  };

  return (
    <div className='flex flex-grow mx-[40.42px] mt-[34.83px]'>
      <div className='w-full'>
        <SearchBar setIsAddPostOpen={setIsAddPostOpen} />
        <div className='flex justify-center'>
          <div className='w-full'>
            {posts.map((post) => (
              <Card
                key={post.id}
                author={post.username}
                category={post.category}
                title={post.title}
                snippet={post.content}
                comments={post.comments}
                postId={post.id} // ส่ง id ไปด้วย
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsAddPostOpen(true)} // เปิดโมดัลเมื่อคลิกปุ่ม
          className='bg-success text-white rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[105px] mt-4'
        >
          Create +
        </button>

        {/* แสดงโมดัล AddPost หาก isAddPostOpen เป็น true */}
        {isAddPostOpen && <AddPost onClose={handleAddPostClose} />}
      </div>
    </div>
  );
}
