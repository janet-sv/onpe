import React, { PureComponent } from 'react';
import onpeService from 'services/onpe';
import { loadState, saveState } from 'utils/localStorage';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import logo from 'assets/images/logo.png';
import Loader from 'components/Loader';
import './styles.scssm';

class Login extends PureComponent {
  state = {
    session: loadState('session') || null,
    loaderShowed: false,
  };
  componentDidMount() {
    if (this.state.session) {
      this.props.history.push('/');
    }
  };

  login = async () => {
    try {
      this.setState({ loaderShowed: true});

      const credentials = {
        dni: this.refs.inputDni.getValue(),
        password: this.refs.inputPass.getValue(),
      };

      const session = this.setState(await onpeService.login(credentials), () => {
        saveState('session', this.state.session);
        this.setState({ loaderShowed: false});

        this.props.history.push('/');
      });

    } catch(error) {
      console.log(error);
    };
  };

  render() {
    const {
      loaderShowed,
    } = this.state;

    return (
      <div styleName="page">
        <Header />
        <div styleName="content">
          <div styleName="form">
            <div>
              <div styleName="logo-wrapper" className="has-shadow">
                <img src={logo} alt="Logo"/>
              </div>
            </div>
            <div styleName="card" className="has-shadow">
              <Input label="DNI" ref="inputDni" />
              <Input typeInput="password" label="Clave" ref="inputPass"/>
              <div styleName="button-wrapper">
                <Button onClick={this.login}>
                  INGRESAR
                </Button>
              </div>
              <div styleName="link-wrapper">
                <Link to="/">Olvidé mi contraseña</Link>
              </div>
            </div>
          </div>
        </div>
        <Loader isActive={loaderShowed}/>
      </div>
    );
  }
}

export default Login;
