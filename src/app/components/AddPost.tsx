import React, { useState } from 'react';

interface AddPostProps {
  onClose: () => void;
}

interface PostData {
  title: string;
  content: string;
  category: string;
}

export const AddPost: React.FC<AddPostProps> = ({ onClose }) => {
  const [postData, setPostData] = useState<PostData>({
    title: '',
    content: '',
    category: 'Others',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/post/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      onClose(); // ปิดโมดัลเมื่อโพสต์สำเร็จ
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative w-[346px]  bg-white rounded-xl p-6 z-10 transition-transform duration-300'>
        <div className='text-black font-inter'>Add Post</div>
        <input
          name='title'
          value={postData.title}
          onChange={handleChange}
          placeholder='Title'
          className='w-full mt-[20px] border border-gray-300 p-2 rounded'
        />
        <textarea
          name='content'
          value={postData.content}
          onChange={handleChange}
          placeholder='Content'
          className='w-full mt-[20px] h-[120px] border border-gray-300 p-2 rounded'
        ></textarea>
        <select
          name='category'
          value={postData.category}
          onChange={handleChange}
          className='w-full mt-[20px] border border-gray-300 p-2 rounded'
        >
          <option value='Food'>Food</option>
          <option value='History'>History</option>
          <option value='Pets'>Pets</option>
          <option value='Health'>Health</option>
          <option value='Fashion'>Fashion</option>
          <option value='Exercise'>Exercise</option>
          <option value='Others'>Others</option>
        </select>
        <div className='flex flex-col mt-[30px] gap-[10px]'>
          <button
            onClick={onClose}
            className='bg-white text-success rounded-lg border-[1px] border-success w-full h-[40px] font-semibold'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSubmit(); // เรียกใช้ handleSubmit เมื่อกดปุ่ม
            }}
            className='bg-success text-white rounded-lg border-[1px] border-success w-full h-[40px] font-semibold'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
