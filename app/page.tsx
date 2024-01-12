'use client';

import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [task, setTask] = useState<string>('');
  const [userAttempts, setUserAttempts] = useState<number>(0);
  const [code, setCode] = useState<string>('');
  const [submissionResult, setSubmissionResult] = useState<boolean | null>(null);
  const [id, setId] = useState<string>('1');

  const handleClick = (id: string): void => {
    setId(id);
    setSubmissionResult(null);
    setCode('');
    setTask('');
  };

  useEffect(() => {
    const fetchTask = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`/api/lesson/${id}`);
        const data = await response.json();
        setTask(data.task);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`/api/submission/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();

      console.log(data);

      setSubmissionResult(data.submissionResult);
      setUserAttempts((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2 '>
        <div className='mb-4'>
          <div className='flex gap-2 flex-wrap mb-5'>
            <button
              className='block w-100 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleClick('1')}>
              Html lesson
            </button>
            <button
              className='block w-50 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleClick('2')}>
              Css lesson
            </button>
            <button
              className='block w-50 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => handleClick('3')}>
              JS lesson
            </button>
          </div>

          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='assignment'>
            Assignment
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='assignment'
            placeholder='Loading...'
            value={task}
            readOnly></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='text'>
            Code
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='text'
            type='text'
            placeholder='Your code here...'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50'
            type='button'
            onClick={handleSubmit}
            disabled={!code || loading}>
            Submit
          </button>

          {userAttempts > 0 && <span className='text-green-500'>Attemps {userAttempts}</span>}
          {submissionResult !== null && (
            <span className={submissionResult ? 'text-green-500' : 'text-red-500'}>
              {submissionResult ? 'Success' : 'Failed'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
