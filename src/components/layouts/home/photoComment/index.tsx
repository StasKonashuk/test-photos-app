import React, { ReactElement } from 'react';
import { useAppSelector } from '../../../../hooks';
import { parseJwt, snackActions } from '../../../../utils';
import { useDeletePhotoCommentMutation } from '../../../../api';
import { DeleteIcon } from '../../../common';

import './styles.scss';

interface Comment {
  id: string;
  text: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
}

interface PhotoCommentProps {
  comment: Comment;
}

type TokenInfo = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export function PhotoComment(props: PhotoCommentProps): ReactElement {
  const { comment } = props;

  const [deletePhotoComment, { isLoading: isDeletePhotoCommentLoading }] =
    useDeletePhotoCommentMutation();

  const onDeleteCommentHandler = async (id: string) => {
    const result = await deletePhotoComment({ commentId: id }).unwrap();

    if (result) {
      snackActions.success(result.message);
    }
  };

  const { token } = useAppSelector((store) => store.userReducer);

  const userInfo = parseJwt(token) as TokenInfo;
  return (
    <div className="comment">
      <div className="comment-content-wrapper">
        <p className="comment-author">{comment.author.name}</p>
        <p className="comment-text">{comment.text}</p>
      </div>
      {userInfo && userInfo.id === comment.author.id && (
        <div>
          <button
            disabled={isDeletePhotoCommentLoading}
            onClick={() => onDeleteCommentHandler(comment.id)}
            type="button"
            aria-label="delete-icon"
            className="delete-comment-button">
            <DeleteIcon width={20} height={20} fill="#de0000" />
          </button>
        </div>
      )}
    </div>
  );
}
