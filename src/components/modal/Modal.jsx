import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseECC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseECC);
  }

  handleCloseECC = e => {
    const { onCloseModal } = this.props;

    if (e.key === 'Escape') {
      onCloseModal();
    }
  };

  handleCloseBackdrop = e => {
    const { onCloseModal } = this.props;

    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  render() {
    const { largeImage, tags } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleCloseBackdrop}>
        <div className={css.Modal}>
          <img
            className={css.ImgModal}
            src={largeImage}
            alt={tags}
            width="1000"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
