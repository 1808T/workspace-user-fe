import classes from './CommentForm.module.scss';

export default function CommentForm({
  content,
  setContent,
  submitCommentHandler,
  inputRef,
}) {
  return (
    <form onSubmit={submitCommentHandler} className={classes['comment-form']}>
      <textarea
        value={content}
        ref={inputRef}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
      <button>Post</button>
    </form>
  );
}
