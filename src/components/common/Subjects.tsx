'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getCategoriesServer } from '@/src/_lib/actions/action';


interface Subject {
  _id: string;
  icon: string | null;
  name: string;
}

function Subjects(): JSX.Element {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();



  const getCategories = async (pageNumber: number): Promise<void> => {
    if (isLoading) return;
  
    setIsLoading(true);
  
    try {
      const result = await getCategoriesServer(pageNumber);
  
      if (!result.subjects.length) {
        setHasMore(false);
        return;
      }
  
      setSubjects((prevSubjects) => {
        const uniqueSubjects = new Set(
          [...prevSubjects, ...result.subjects].map((s) => JSON.stringify(s))
        );
        return Array.from(uniqueSubjects).map((s) => JSON.parse(s));
      });
  
      setPage(pageNumber + 1);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };
  

  const loadMore = (): void => {
    if (!isLoading && hasMore) {
      getCategories(page);
    }
  };

  useEffect(() => {
    if ( subjects.length === 0) {
      getCategories(1);
    }
  }, [ session, subjects.length]);

  useEffect(() => {
    return () => {
      setSubjects([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
    };
  }, []);

  return (
    <InfiniteScroll
      dataLength={subjects.length}
      next={loadMore}
      scrollThreshold={0.1}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className='subjects flex flex-wrap gap-3 '>
        {subjects.map((subject) => (
          <div key={subject._id} className='subject-card w-full md:w-[31%] relative'>
            <Image
              src={subject.icon || ''}
              alt={subject.name}
              width={500}
              height={300}
            />

            <h3 className=' bg-[#1935CA66] backdrop-blur-lg p-3 rounded-lg absolute bottom-3 w-11/12 m-auto -right-[-4%]  text-white'>
            <span>
            {subject.name}
            </span>
            </h3>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default Subjects;
