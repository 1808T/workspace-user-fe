import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './BoardMembers.module.scss';
import { Avatar } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddIcon from '@mui/icons-material/Add';
import boardApi from '../../store/actions/api/board';

export default function BoardMembersForm({
  owner,
  members,
  setMembers,
  onMembersFormShow,
  setBoard,
}) {
  const { id } = useParams();
  const [newMember, setNewMember] = useState('');
  const newMemberRef = useRef(null);

  const memberChangeHandler = (e) => {
    setNewMember(e.target.value);
  };

  const addMemberHandler = async (e) => {
    e.preventDefault();
    if (!newMember) {
      newMemberRef.current.focus();
      return;
    }
    const payload = {
      boardId: id,
      email: newMember,
    };
    await boardApi
      .addMember(payload)
      .then((data) => {
        if (!data) {
          return;
        }
        const { members } = data;
        setMembers(members);
        setBoard((prev) => {
          const updatedBoard = { ...prev };
          updatedBoard.members = members;

          return updatedBoard;
        });
      })
      .finally(() => {
        setNewMember('');
      });
  };

  const removeMemberHandler = (memberId) => {
    const payload = {
      boardId: id,
      memberId,
    };
    boardApi.removeMember(payload).then((data) => {
      if (!data) {
        return;
      }
      setMembers((prev) => {
        const prevMembers = [...prev].filter(
          (member) => member._id !== memberId,
        );
        return prevMembers;
      });
      setBoard((prev) => {
        const updatedBoard = { ...prev };
        const updatedMembers = { ...prev.members };
        updatedBoard.members = updatedMembers.filter(
          (member) => member._id !== memberId,
        );

        return updatedBoard;
      });
    });
  };

  return (
    <React.Fragment>
      <div className={classes['backdrop']} onClick={onMembersFormShow}></div>
      <form
        className={classes['members--container']}
        onSubmit={addMemberHandler}>
        <h3>Members</h3>
        <div className={classes['input-group']}>
          <input
            type="text"
            value={newMember}
            onChange={memberChangeHandler}
            placeholder="Enter email..."
            ref={newMemberRef}
            autoFocus
          />
          <button type="submit">
            <AddIcon />
          </button>
        </div>
        <div className={classes['owner']}>
          {!owner.avatar ? (
            <Avatar>{owner.username[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar alt="user-avatar" src={owner.avatar} />
          )}
          <span>{owner.username} (Owner)</span>
        </div>
        {members.map((member) => {
          return (
            <div key={member._id} className={classes['member']}>
              {!member.avatar ? (
                <Avatar>{member.username[0].toUpperCase()}</Avatar>
              ) : (
                <Avatar alt="user-avatar" src={member.avatar} />
              )}
              <span>{member.username}</span>
              <button
                className={classes['clear-btn']}
                type="button"
                onClick={() => {
                  removeMemberHandler(member._id);
                }}>
                <CancelRoundedIcon />
              </button>
            </div>
          );
        })}
      </form>
    </React.Fragment>
  );
}
