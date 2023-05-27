import { useState, useEffect } from 'react';
import { CloseButton, ModalStyled, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onActive, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      onActive();
    }
  };

  useEffect(() => {
    const onEscKey = event => {
      if (event.code !== 'Escape') {
        return;
      }

      onActive();
    };

    document.addEventListener('keydown', onEscKey);
    document.documentElement.style.overflowY = 'hidden';
    setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => {
      document.removeEventListener('keydown', onEscKey);
      document.documentElement.style.overflowY = 'auto';
    };
  }, [onActive]);

  const modalClassName = isOpen ? 'modal-open' : '';

  return (
    <Overlay onClick={handleClick}>
      <ModalStyled className={modalClassName}>{children}</ModalStyled>
      <CloseButton width={48} height={48} type="button" onClick={handleClick} />
    </Overlay>
  );
};

Modal.propTypes = {
  onActive: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
