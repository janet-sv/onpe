import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import logo from 'assets/images/short-logo.png';
import logoAdmin from 'assets/images/short-logo-admin.png';
import name from 'assets/images/name-logo.png';
import nameAdmin from 'assets/images/name-logo-admin.png';
import menu from 'assets/images/menu-blue.svg';
import close from 'assets/images/close-blue.svg';
import './styles.scssm';

class Header extends PureComponent {
  state = {
    isMenuOpened: false,
  };

  toggleMenu = () => {
    const {
      isMenuOpened,
    } = this.state;

    this.setState({ isMenuOpened: !isMenuOpened });
  };

  render() {
    const {
      isMenuOpened,
    } = this.state;

    const {
      hasMenu,
      isAdmin,
    } = this.props;

    const icon = isMenuOpened ? close : menu;

    return (
      <div styleName="header" className="has-shadow">
        <div styleName="wrapper">
          <Link to={!isAdmin ? '/' : '/admin'}>
            <div styleName="logo-container">
              <div styleName="logo-wrapper">
                {
                  !isAdmin
                  ? <img src={logo} alt="Logo"/>
                  : <img src={logoAdmin} alt="Logo"/>
                }
              </div>
              <div styleName="logo-wrapper has-name">
                {
                  !isAdmin
                  ? <img src={name} alt="Name"/>
                  : <img src={nameAdmin} alt="Name"/>
                }
              </div>
            </div>
          </Link>
          {
            hasMenu && !isAdmin
            && <div styleName="toggle-button" onClick={this.toggleMenu}>
                <img src={icon} alt="Menu"/>
              </div>
          }
          {
            isMenuOpened
            && <ul styleName="menu" className="has-shadow">
                <Link to="/" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">INICIO</li>
                </Link>
                <Link to="/mis-tramites" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">MIS TRÁMITES</li>
                </Link>
                <Link to="/servicios" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">SERVICIOS</li>
                </Link>
                <Link to="/mi-perfil" styleName="link" onClick={this.toggleMenu}>
                  <li styleName="menu-item">PERFIL</li>
                </Link>
              </ul>
          }
          {
            hasMenu && !isAdmin
            && <ul styleName="menu is-desktop">
                <Link to="/" styleName="link">
                  <li styleName="menu-item">INICIO</li>
                </Link>
                <Link to="/mis-tramites" styleName="link">
                  <li styleName="menu-item">MIS TRÁMITES</li>
                </Link>
                <Link to="/servicios" styleName="link">
                  <li styleName="menu-item">SERVICIOS</li>
                </Link>
                <Link to="/mi-perfil" styleName="link">
                  <li styleName="menu-item">PERFIL</li>
                </Link>
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default Header;