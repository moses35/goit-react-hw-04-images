import PropTypes from 'prop-types';
import { useState } from 'react';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [openModal, setOpenModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ img: null, tags: '' });

  const modalOpen = (largeImageUrl, tags) => {
    setOpenModal(true);
    setModalInfo({ img: largeImageUrl, tags: tags });
  };

  const modalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <GalleryItem className="gallery-item">
        <img
          src={webformatURL}
          alt={tags}
          onClick={() => {
            modalOpen(largeImageURL, tags);
          }}
        />
      </GalleryItem>
      {openModal && <Modal imageUrl={modalInfo} closeModal={modalClose} />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
