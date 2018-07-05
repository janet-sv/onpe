import React from 'react';
import Modal from 'components/Modal';
import Button from 'components/Button';
import formatDate from 'utils/formatDate';
import iconClose from 'assets/images/close-blue.svg';
import './styles.scssm';

const DetailModal = ({
  onClose,
  active,
  procedure,
}) => (
  <Modal handleClose={onClose} active={active}>
    {
      procedure
      && <div styleName="content">
          <span styleName="close" style={{ backgroundImage: `url(${iconClose})` }} onClick={onClose}></span>
          <h2 styleName="title">
            {procedure.name}
          </h2>
          <div>
            <div><strong>Fecha de registro:</strong> {formatDate(procedure.registerDate)}</div>
            <div styleName={`status has-code-${procedure.codeStatus}`}>{procedure.status}</div>
          </div>
          <div styleName="description">
            {procedure.statusDescription}
          </div>
          <div style={{textAlign: 'center'}}>
            <Button onClick={onClose}>
              ACEPTAR
            </Button>
          </div>
        </div>
    }
  </Modal>
);

export default DetailModal;