import React, { useEffect, useRef, useState } from 'react';
import axios from '../../../../../../apis/axios';
import LatestGalleryUI from './LatestGallery.presenter';

export default function LatestGallery() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [cursorId, setCursorId] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const loader = useRef(null);

  const fetchPostData = async (cursor, size = 6) => {
    try {
      const res = await axios.get(`/profile/view`, {
        params: {
          cursorId: cursor, // cursorId보다 id가 작은 게시글을 가져옴.
          size, // 가져올 게시글의 개수.
          sort: 'desc',
        },
      });
      const { values, hasNext: newHasNext } = res.data;
      setLatestPosts((prevPosts) => [...prevPosts, ...values]);
      // 마지막 reviewId를 cursorId로 설정
      if (values.length > 0) {
        const lastPostId = values[values.length - 1].reviewId;
        setCursorId(lastPostId);
      }
      setHasNext(newHasNext);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };
  useEffect(() => {
    fetchPostData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNext) {
          fetchPostData(cursorId, 2); // 추가로 가져오는 데이터
        }
      },
      { threshold: 1 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [cursorId, hasNext]);

  return (
    <>
      <LatestGalleryUI latestPosts={latestPosts} />
      <div ref={loader} style={{ height: '20px' }} />
    </>
  );
}
