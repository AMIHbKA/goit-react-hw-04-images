import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, webformatURL, tags, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const onShowModal = () => {
    setShowModal(state => !state);
  };

  return (
    <>
      <Item key={id} className="gallery-item">
        <img src={webformatURL} alt={tags} onClick={onShowModal} />
        {showModal &&
          createPortal(
            <Modal onActive={onShowModal}>
              <img src={largeImageURL} alt={tags} />
            </Modal>,
            document.body
          )}
      </Item>
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
