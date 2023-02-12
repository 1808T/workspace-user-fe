import { useEffect, useMemo, useState, useRef } from 'react';
import classes from './CommentContainer.module.scss';
import CommentIcon from '@mui/icons-material/Comment';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import Loading from '../Loading/Loading';
import commentApi from '../../store/actions/api/comment';
import { toast } from 'react-toastify';

export default function CommentContainer({ currentCardId, initialValue = '' }) {
  const [allComments, setAllComments] = useState([]);
  const [content, setContent] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const commentInputRef = useRef(null);

  const submitCommentHandler = (e) => {
    e.preventDefault();
    if (!content) {
      commentInputRef.current.focus();
      return;
    }
    const payload = {};
    payload.content = content;
    payload.card = currentCardId.toString();
    commentApi
      .createComment(payload)
      .then((data) => {
        setAllComments((prev) => {
          const cloneComments = [...prev];
          cloneComments.push(data.newComment);

          return cloneComments;
        });
        setContent(initialValue);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again!', {
          theme: 'colored',
        });
      });
  };

  useEffect(() => {
    setLoading(true);
    commentApi
      .getComments(currentCardId)
      .then((data) => setAllComments(data.allComments))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentCardId]);

  const commentsByParentId = useMemo(() => {
    if (!allComments) return [];
    const group = {};
    allComments.forEach((comment) => {
      if (!group[comment.parentId]) {
        group[comment.parentId] = [];
      }
      group[comment.parentId].push(comment);
    });

    return group;
  }, [allComments]);

  const rootComments = commentsByParentId[null];
  const getReplies = (parentId) => commentsByParentId[parentId];

  return (
    <div className={classes['comments']}>
      <div className={classes['comments--title']}>
        <CommentIcon />
        <h4>Comments</h4>
      </div>
      <div className={classes['comments--container']}>
        <CommentForm
          content={content}
          setContent={setContent}
          submitCommentHandler={submitCommentHandler}
          inputRef={commentInputRef}
        />
        {loading && (
          <div className={classes['loading']}>
            <Loading />
          </div>
        )}
        {!loading && rootComments && rootComments.length > 0 && (
          <div>
            <CommentList
              comments={rootComments}
              getReplies={getReplies}
              currentCardId={currentCardId}
              setAllComments={setAllComments}
            />
          </div>
        )}
      </div>
    </div>
  );
}
