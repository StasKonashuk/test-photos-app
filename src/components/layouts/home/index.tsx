import React, { ReactElement, useState } from 'react';
import { PhotoModal } from './photoModal';
import { useGetPhotosQuery } from '../../../api';
import { PhotosData } from '../../../api/types';

import './styles.scss';

export function HomeLayout(): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openedPhoto, setOpenedPhoto] = useState<PhotosData | null>(null);

  const { data: photos, isLoading } = useGetPhotosQuery({});

  const onOpenPhotoHandler = (id: string) => {
    const currentPhoto = photos?.results.find((p) => p.id === id);
    if (currentPhoto) {
      setIsModalOpen(true);
      setOpenedPhoto(currentPhoto);
    }
  };

  const photoCards = photos?.results.map((p) => {
    return (
      <button
        key={p.id}
        className="photo-card"
        onClick={() => onOpenPhotoHandler(p.id)}
        aria-label="photo-card"
        type="button">
        <img src={p.imgUrl} alt="img" />
      </button>
    );
  });

  const onCloseModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home-layout-wrapper">
      <div>
        <h1>Photos</h1>
      </div>
      {photos?.results.length && !isLoading ? (
        <div className="photos-wrapper">{photoCards}</div>
      ) : (
        <p className="no-photos-result">No photos</p>
      )}

      <PhotoModal closeModal={onCloseModalHandler} isOpen={isModalOpen} openedPhoto={openedPhoto} />
    </div>
  );
}
