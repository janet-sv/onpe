import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Input from 'components/Input';
import iconClose from 'assets/images/close-blue.svg';
import './styles.scssm';

const ConfirmModal = ({
  onClose,
  onSubmit,
  active,
}) => (
  <Modal handleClose={onClose} active={active}>
    <div styleName="content">
      <span styleName="close" style={{ backgroundImage: `url(${iconClose})` }} onClick={onClose}></span>
      <h2 styleName="title">
        Se le ha enviado un código de confirmación a su correo. Para finalizar el registro del trámite, ingresar el código.
      </h2>
      <Input typeInput="password"/>
      <div style={{textAlign: 'center'}}>
        <Button onClick={onSubmit}>
          CONFIRMAR
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;