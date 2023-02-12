import Comment from './Comment';

export default function CommentList({
  comments,
  getReplies,
  currentCardId,
  setAllComments,
}) {
  return (
    <>
      {comments &&
        comments.length > 0 &&
        comments.map((rootComment) => (
          <div key={rootComment._id}>
            <Comment
              id={rootComment._id}
              author={rootComment.author[0]}
              content={rootComment.content}
              createdAt={rootComment.createdAt}
              getReplies={getReplies}
              currentCardId={currentCardId}
              setAllComments={setAllComments}
              likes={rootComment.likes}
            />
          </div>
        ))}
    </>
  );
}
