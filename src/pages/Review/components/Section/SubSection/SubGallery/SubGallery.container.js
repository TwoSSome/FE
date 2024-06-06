import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import useModal from '../../../../../../hooks/useModal';
import SubGalleryUI from './SubGallery.presenter';

const fetchPosts = async () => {
  const response = await axios.get(`/subscribe?page=1&size=5`);
  return response.data.values;
};

const transformData = (data) => {
  return data.map((item) => ({
    profilePhotoPath: item.profilePhotoPath,
    nickname: item.nickname,
    subscribeId: item.subscribeId,
    followingMemberId: item.followingMemberId,
    subscribeDate: item.subscribeDate,
  }));
};

export default function SubGallery() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery('posts', fetchPosts, {
    select: transformData,
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();

  const handlePostClick = (post) => {
    setSelectedPost(post);
    openModal();
  };

  const handleConfirmPost = (post) => {
    console.log('포스트 확인:', post.nickname);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching posts</div>;
  }

  return (
    <SubGalleryUI
      posts={posts}
      handlePostClick={handlePostClick}
      handleConfirmPost={handleConfirmPost}
      selectedPost={selectedPost}
      isModalOpen={isModalOpen}
      closeModal={closeModal}
    />
  );
}
