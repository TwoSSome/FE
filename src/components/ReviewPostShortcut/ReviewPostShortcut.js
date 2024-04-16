function ReviewPostShortcut({ post, onPostClick, onMouseEnter, onMouseLeave }) {
  return (
    <div>
      <h3>{post.title}</h3> {/** 프로필 사진 */}
      <button type="button" onClick={() => onPostClick(post)} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <p>{post.excerpt}</p>
      </button>
    </div>
  );
}

export default ReviewPostShortcut;
