'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from '@/app/components/Card';
import { Post } from '@/app/home/page';

export interface PostComment {
  id: string;
  content: string;
  created_at: string;
}

export default function BlogPost() {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/post/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-grow mx-[40.42px] mt-[34.83px]'>
      <div className='w-full'>
        <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
        <h2 className='text-lg font-semibold mb-2'>
          By {post.username} in {post.category}
        </h2>
        <p className='mb-4'>{post.content}</p>
        <h3 className='font-semibold'>Comments</h3>
        <div>
          {post.comments.map((comment) => (
            <div key={comment.id} className='border-b mb-2 pb-2'>
              <p>{comment.content}</p>
              <small>{new Date(comment.created_at).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
