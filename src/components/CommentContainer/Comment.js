import { useState, useRef } from 'react';
import classes from './Comment.module.scss';
import { Avatar } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import commentApi from '../../store/actions/api/comment';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export default function Comment({
  id,
  author,
  content,
  createdAt,
  getReplies,
  currentCardId,
  setAllComments,
  initialValue = '',
  likes,
}) {
  const navigate = useNavigate();
  const childComments = getReplies(id);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const editCommentInputRef = useRef(null);
  const [reply, setReply] = useState(initialValue);
  const replyCommentInputRef = useRef(null);
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  let isLikedInitialState = false;
  if (likes && likes.indexOf(userId) !== -1) {
    isLikedInitialState = true;
  } else {
    isLikedInitialState = false;
  }
  const [isLiked, setIsLiked] = useState(isLikedInitialState);

  const likeCommentHandler = () => {
    setIsLiked(true);
    setAllComments((prev) => {
      const cloneComments = [...prev];
      const index = cloneComments.findIndex((comment) => comment._id === id);
      cloneComments[index].likes.push(userId);

      return cloneComments;
    });
    commentApi.likeComment(id).catch((error) => {
      console.log(error);
      toast.error('Something went wrong. Please try again!', {
        theme: 'colored',
      });
    });
  };

  const unLikeCommentHandler = () => {
    setIsLiked(false);
    setAllComments((prev) => {
      const cloneComments = [...prev];
      const index = cloneComments.findIndex((comment) => comment._id === id);
      cloneComments[index].likes = cloneComments[index].likes.filter(
        (id) => id !== userId,
      );

      return cloneComments;
    });
    commentApi.unlikeComment(id).catch((error) => {
      console.log(error);
      toast.error('Something went wrong. Please try again!', {
        theme: 'colored',
      });
    });
  };

  const submitCommentReplyHandler = (e) => {
    e.preventDefault();
    if (!reply) {
      replyCommentInputRef.current.focus();
      return;
    }
    const payload = {};
    payload.content = reply;
    payload.card = currentCardId.toString();
    payload.parentId = id.toString();
    commentApi
      .createComment(payload)
      .then((data) => {
        setAllComments((prev) => {
          const cloneComments = [...prev];
          cloneComments.push(data.newComment);

          return cloneComments;
        });
        setReply(initialValue);
        setIsReplying(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again!', {
          theme: 'colored',
        });
      });
  };

  const submitEditCommentHandler = (e) => {
    e.preventDefault();
    if (!editContent || editContent === content) {
      editCommentInputRef.current.focus();
      setEditContent(content);
      return;
    }
    const payload = {};
    payload.content = editContent;
    commentApi
      .editComment(id, payload)
      .then((data) => {
        const { editedComment } = data;
        setAllComments((prev) => {
          const cloneComments = [...prev];
          const index = cloneComments.findIndex(
            (comment) => comment._id === id,
          );
          cloneComments[index].content = editedComment.content;

          return cloneComments;
        });
        setIsEditing(false);
        setEditContent(editedComment.content);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Something went wrong. Please try again!', {
          theme: 'colored',
        });
      });
  };

  const deleteCommentHandler = () => {
    setAllComments((prev) => {
      const cloneComments = [...prev].filter((comment) => comment._id !== id);

      return cloneComments;
    });
    commentApi.deleteComment(id).catch((error) => {
      console.log(error);
      toast.error('Something went wrong. Please try again!', {
        theme: 'colored',
      });
    });
  };

  return (
    <>
      <div className={classes['comment']}>
        <div className={classes['comment--author']}>
          <span>
            {!author.avatar ? (
              <Avatar
                onClick={() => {
                  if (author._id === userId) {
                    return navigate('/settings');
                  }
                  navigate(`/user/${author._id}`);
                }}
                sx={{ width: 30, height: 30, cursor: 'pointer' }}>
                {author.username[0].toUpperCase()}
              </Avatar>
            ) : (
              <Avatar
                alt="author-avatar"
                src={author.avatar}
                sx={{ width: 30, height: 30, cursor: 'pointer' }}
                onClick={() => {
                  if (author._id === userId) {
                    return navigate('/settings');
                  }
                  navigate(`/user/${author._id}`);
                }}
              />
            )}
          </span>
          <span>{author.username}</span>
        </div>
        <div className={classes['comment--feature']}>
          {isEditing ? (
            <CommentForm
              content={editContent}
              setContent={setEditContent}
              submitCommentHandler={submitEditCommentHandler}
              inputRef={editCommentInputRef}
            />
          ) : (
            <p className={classes['content']}>{content}</p>
          )}
          <div className={classes['feature']}>
            <span>
              {isLiked ? (
                <FavoriteIcon
                  sx={{ color: 'red' }}
                  onClick={unLikeCommentHandler}
                />
              ) : (
                <FavoriteBorderIcon
                  sx={{ color: 'red' }}
                  onClick={likeCommentHandler}
                />
              )}
            </span>
            <span>{likes.length}</span>
            <span>
              {!isReplying && (
                <ReplyIcon
                  color="primary"
                  onClick={() => {
                    setIsReplying((prev) => !prev);
                  }}
                />
              )}
              {isReplying && (
                <DoDisturbIcon
                  sx={{ color: 'red' }}
                  onClick={() => {
                    setIsReplying((prev) => !prev);
                  }}
                />
              )}
            </span>
            {userId === author._id && (
              <>
                <span>
                  {!isEditing && (
                    <EditIcon
                      onClick={() => {
                        setIsEditing((prev) => !prev);
                      }}
                      color="action"
                    />
                  )}
                  {isEditing && (
                    <EditOffIcon
                      onClick={() => {
                        setIsEditing((prev) => !prev);
                      }}
                      color="disabled"
                    />
                  )}
                </span>
                <span>
                  <DeleteIcon
                    color="disabled"
                    onClick={() => {
                      setDeleteModal(!deleteModal);
                    }}
                  />
                </span>
                <span>
                  {deleteModal && (
                    <div className={classes['modal']}>
                      <div className={classes['modal--header']}>
                        <h3>Delete comment?</h3>
                        <button onClick={() => setDeleteModal(false)}>
                          <CloseIcon />
                        </button>
                      </div>
                      <div className={classes['modal--body']}>
                        <p>
                          Are you sure you want to delete this comment? There is
                          no undo.
                        </p>
                      </div>
                      <div className={classes['modal--footer']}>
                        <button onClick={deleteCommentHandler}>
                          Delete comment
                        </button>
                      </div>
                    </div>
                  )}
                </span>
              </>
            )}
            <span className={classes['created-at']}>
              {moment(createdAt).fromNow()}
            </span>
            {childComments && childComments.length > 0 && (
              <span className={classes['show-replies-btn']}>
                {areChildrenHidden ? (
                  <button
                    onClick={() => {
                      setAreChildrenHidden(false);
                    }}>
                    Show Replies
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAreChildrenHidden(true);
                    }}>
                    Hide Replies
                  </button>
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {isReplying && (
        <CommentForm
          content={reply}
          setContent={setReply}
          submitCommentHandler={submitCommentReplyHandler}
          inputRef={replyCommentInputRef}
        />
      )}
      {childComments && childComments.length > 0 && !areChildrenHidden && (
        <>
          <div className={classes['nested-comments']}>
            <CommentList
              comments={childComments}
              getReplies={getReplies}
              currentCardId={currentCardId}
              setAllComments={setAllComments}
            />
          </div>
        </>
      )}
    </>
  );
}
