import { useRouter } from 'next/navigation';
import { PostComment } from '../home/page';
interface PostCardProps {
  postId: string;
  author: string;
  category: string;
  title: string;
  snippet: string;
  comments: PostComment[]; // Use PostComment instead of Comment
}

export default function Card({
  postId,
  author,
  category,
  title,
  snippet,
  comments,
}: PostCardProps) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/post/${postId}`);
  };
  return (
    <div onClick={handleCardClick} className='cursor-pointer mt-24px md-20px '>
      <div className=' bg-white w-full flex flex-col rounded-t-xl'>
        <div className='h-[200px] border-b-2 border-grey-100'>
          <div className='flex flex-col px-5 py-[21.49px] '>
            <div className='flex flex-col w-[102.3px] h-[70.03px]'>
              <div className='flex text-grey-100 text-end h-[31.3px] text-[14px] gap-2.5 items-center'>
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

                {author}
              </div>
              <div className='w-[55px] text-[12px] h-[39px] text-center'>
                <div className='bg-grey-100 text-grey-600 mt-[15px] rounded-xl'>
                  {category}
                </div>
              </div>
            </div>
            <div className='flex flex-col h-[82px] mt-[5px]'>
              <div className='flex flex-col h-[58px]'>
                <div className='text-[16px] font-semibold'>{title}</div>
                <div className='text-[12px] overflow-hidden text-ellipsis line-clamp-2 pb-[2]'>
                  {snippet}
                </div>
              </div>
              <div className='flex flex-row mt-[10px] text-grey-100 items-center justify-start gap-[5px]'>
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
                <div className='text-[12px]'>{comments.length}</div>
                <div className='text-[12px]'>Comments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
