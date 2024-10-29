'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { formatTimeAgo } from '@/app/utils/timeUtils';
import { AddComment } from '@/app/components/AddComment';

interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  category: string;
  updated_at: string;
  comments: PostComment[];
}

interface PostComment {
  id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    username: string;
  };
}

const PostPage = () => {
  const [showAddComment, setShowAddComment] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<string>('');

  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3000/post/${slug}`);
        if (!response.ok) throw new Error('Failed to fetch post data');

        const data: Post = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  const handleAddComment = async () => {
    if (!comment) return;

    try {
      const response = await fetch(
        `http://localhost:3000/comment/${post?.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // ใช้ token ที่เก็บใน localStorage
          },
          body: JSON.stringify({ content: comment }), // ส่งข้อความคอมเมนต์
        }
      );
      console.log(response);
      console.log(localStorage.getItem('token'));

      if (!response.ok) throw new Error('Failed to add comment');

      // รีเฟรชโพสต์เพื่อแสดงคอมเมนต์ใหม่
      const updatedPost = await response.json();
      setPost(updatedPost);
      setComment(''); // เคลียร์ข้อความคอมเมนต์
      setShowAddComment(false); // ปิด AddComment
      router.push(`/home`);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className='mt-[24.52px] bg-white h-full rounded-l-xl'>
      <button
        onClick={() => router.back()}
        className='border rounded-xl bg-green-100 text-green-500 mt-[5px] ml-[5px]'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18'
          />
        </svg>
      </button>

      <div className='mt-[40px] px-5'>
        <div className='flex flex-col'>
          <div className='flex text-gray-500 text-end h-[31.3px] text-[14px] gap-2.5 items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-8 text-gray-500'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
              />
            </svg>
            {post.username}
          </div>
          <div className='w-[55px] text-[12px] h-[39px] text-center'>
            <div className='bg-gray-100 text-gray-600 mt-[15px] rounded-xl'>
              {post.category}
            </div>
          </div>
          <div className='flex flex-col h-[82px] mt-[5px]'>
            <div className='text-[16px] font-semibold'>{post.title}</div>
            <div className='text-[12px] overflow-hidden text-ellipsis pb-[2]'>
              {post.content}
            </div>
          </div>
          <div className='flex flex-row mt-[10px] text-gray-500 items-center justify-start gap-[5px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z'
              />
            </svg>
            <div className='text-[12px]'>
              {post.comments?.length || 0} Comments
            </div>
          </div>
        </div>
      </div>

      <div className='flex mt-[28px] px-5'>
        <button
          onClick={() => {
            setShowAddComment(true);
            handleAddComment(); // เรียกใช้ฟังก์ชันเพื่อส่งคอมเมนต์
          }}
          className='bg-white text-success rounded-lg py-2.5 px-4 border-[1px] border-solid border-success w-[150px] h-[40px] relative leading-[20px] font-ibm-plex-semibold-sm font-semibold ml-4'
        >
          add comment
        </button>
      </div>

      {/* แสดง AddComment */}
      {showAddComment && (
        <AddComment
          comment={comment}
          setComment={setComment}
          onPost={handleAddComment} // ส่ง handleAddComment
          onClose={() => setShowAddComment(false)}
        />
      )}

      {/* คอมเมนต์ */}
      <div className='my-[24px] px-[16px]'>
        {post.comments && post.comments.length > 0 ? (
          post.comments.map((comment) => (
            <div key={comment.id} className='my-[12px]'>
              <div className='flex gap-[10px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-8 text-gray-500'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                  />
                </svg>
                <div className='flex flex-col'>
                  <div className='text-[14px] font-semibold'>
                    {comment.user.username}
                  </div>
                  <div className='text-[12px]'>{comment.content}</div>
                </div>
              </div>
              <div className='text-gray-500 text-end text-[12px]'>
                {formatTimeAgo(comment.created_at)}
              </div>
            </div>
          ))
        ) : (
          <div>No comments yet.</div> // แสดงข้อความเมื่อไม่มีคอมเมนต์
        )}
      </div>
    </div>
  );
};

export default PostPage;
