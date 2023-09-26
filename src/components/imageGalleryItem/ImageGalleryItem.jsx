// import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

// import Modal from '../modal/Modal';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <li className={css.ImageGalleryItem}>
      <div onClick={() => onOpenModal(largeImageURL, tags)}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </div>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
