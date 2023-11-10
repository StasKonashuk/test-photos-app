import React, { ReactElement, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PhotosData } from '../../../../api/types';
import { Input, Button, CustomModal } from '../../../common';
import { postCommentSchema } from '../../../../validators';
import { useLazyGetParticularPhotoQuery, usePostPhotoCommentMutation } from '../../../../api';
import { snackActions } from '../../../../utils';
import { PhotoComment } from '../photoComment';

import './styles.scss';

interface PhotoModalProps {
  closeModal: () => void;
  isOpen: boolean;
  openedPhoto: PhotosData | null;
}

type FormValues = {
  text: string;
};

export function PhotoModal(props: PhotoModalProps): ReactElement {
  const { closeModal, isOpen, openedPhoto } = props;

  const [postPhotoComment, { isLoading }] = usePostPhotoCommentMutation();

  const [getParticularQuery, { data: photoData, isLoading: isGetParticularLoading }] =
    useLazyGetParticularPhotoQuery();

  useEffect(() => {
    if (openedPhoto?.id) {
      getParticularQuery({ id: openedPhoto.id });
    }
  }, [openedPhoto?.id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      text: '',
    },
    resolver: yupResolver(postCommentSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData): Promise<void> => {
    try {
      const { text } = formData;

      if (openedPhoto) {
        const result = await postPhotoComment({ text, photoId: openedPhoto.id }).unwrap();

        if (result) {
          snackActions.success(result.message);
          reset();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const photoComments = photoData?.comments.map((c) => {
    return <PhotoComment comment={c} key={c.id} />;
  });
  return (
    <CustomModal isOpen={isOpen} closeModal={closeModal} title="Photo">
      {!isGetParticularLoading && (
        <div className="modal-content">
          <div className="photo-wrapper">
            <img src={openedPhoto?.imgUrl} alt="img" />
          </div>
          {photoData?.comments.length ? (
            <div>
              <p className="comments-header">Comments:</p>
              <div className="comments-wrapper">{photoComments}</div>
            </div>
          ) : (
            <p className="no-results">No comments</p>
          )}
          <form className="post-comment-form" onSubmit={handleSubmit(onSubmit)}>
            <Input
              register={register}
              name="text"
              type="text"
              errorMsg={errors.text?.message}
              id="text"
              placeholder="Put your comment"
            />

            <Button
              type="submit"
              aria-label="post-comment"
              disabled={!dirtyFields.text || isLoading}
              value="Post comment"
              className="post-comment-button"
            />
          </form>
        </div>
      )}
    </CustomModal>
  );
}
