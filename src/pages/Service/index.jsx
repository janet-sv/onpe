import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { loadState } from 'utils/localStorage';

import Button from 'components/Button';
import Header from 'components/Header';
import contractIcon from 'assets/images/check-blue.svg';
import nextIcon from 'assets/images/next-blue.svg';
import './styles.scssm';

class Service extends PureComponent {
  state = {
    session: loadState('session') || null,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <div>
            <div styleName="logo-wrapper" className="has-shadow">
              <img src={contractIcon} alt="Logo"/>
            </div>
            <h1 styleName="title">SERVICIOS</h1>
            <p styleName="message">Por el momento contamos con los siguientes trámites vía web:</p>
          </div>
          <div styleName="cards">
            <Link to="/solicitud-excusa-justificacion-miembro-mesa">
              <div styleName="card" className="has-shadow">
                <span styleName="name">
                  Solicitar Excusa o Justificación al cargo de miembro de mesa
                </span>
                <span styleName="next" style={{ backgroundImage: `url(${nextIcon})` }}></span>
              </div>
            </Link>
            <Link to="/expedicion-constancia-sufragio">
              <div styleName="card" className="has-shadow">
                <span styleName="name">
                  Expedición de constancia de sufragio y/o de haber ejercido el cargo de miembro de mesa
                </span>
                <span styleName="next" style={{ backgroundImage: `url(${nextIcon})` }}></span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Service;
