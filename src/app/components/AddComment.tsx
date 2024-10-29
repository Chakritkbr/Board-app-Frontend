interface AddCommentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  onPost: () => void; // เพิ่มฟังก์ชัน onPost
  onClose: () => void;
}

export const AddComment: React.FC<AddCommentProps> = ({
  comment,
  setComment,
  onPost,
  onClose,
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300'>
      <div
        className='absolute inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative w-[346px] h-[346px] bg-white rounded-xl p-6 z-10 transition-transform duration-300'>
        <div className='text-black font-inter'>Add comment</div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)} // เก็บค่าใน state
          placeholder='What is on your mind'
          className='w-full mt-[20px] h-[120px] border border-gray-300 p-2 rounded'
        ></textarea>
        <div className='flex flex-col mt-[30px] gap-[10px]'>
          <button
            onClick={onClose}
            className='bg-white text-success rounded-lg border-[1px] border-success w-full h-[40px] font-semibold'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onPost(); // เรียกใช้ onPost เมื่อกดปุ่ม
              onClose(); // ปิด AddComment
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
