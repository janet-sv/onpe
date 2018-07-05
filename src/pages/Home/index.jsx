import React, { PureComponent } from 'react';
import { loadState } from 'utils/localStorage';
import onpeService from 'services/onpe';
import { Link } from 'react-router-dom';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import logo from 'assets/images/logo.png';
import './styles.scssm';

class Home extends PureComponent {
  state = {
    session: loadState('session') || null,
    denied: 0,
    accepted: 0,
    done: 0,
    inProcess: 0,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }

    this.fetchStatistics();
  };

  fetchStatistics = async () => {
    try {
      this.setState(await onpeService.getProceduresStatistics(), async () => {
        try {
          await onpeService.getUser();
        } catch(error) {
          console.log(error);
        }
      });
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      denied,
      accepted,
      done,
      inProcess,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <h2 styleName="subtitle">ESTADÍSTICAS DE MIS TRÁMITES</h2>
          <div styleName="cards">
            <Link to="/mis-tramites">
              <div styleName="card" className="has-shadow">
                <div styleName="card-content" className="absolute-vertical-align">
                  <div styleName="number">{done}</div>
                  <div styleName="label">Trámites realizados</div>
                </div>
              </div>
            </Link>
            <Link to="/mis-tramites">
              <div styleName="card" className="has-shadow">
                <div styleName="card-content" className="absolute-vertical-align">
                  <div styleName="number">{accepted}</div>
                  <div styleName="label">Trámites aprobados</div>
                </div>
              </div>
            </Link>
            <Link to="/mis-tramites">
              <div styleName="card" className="has-shadow">
                <div styleName="card-content" className="absolute-vertical-align">
                  <div styleName="number">{inProcess}</div>
                  <div styleName="label">Trámites en proceso</div>
                </div>
              </div>
            </Link>
            <Link to="/mis-tramites">
              <div styleName="card" className="has-shadow">
                <div styleName="card-content" className="absolute-vertical-align">
                  <div styleName="number">{denied}</div>
                  <div styleName="label">Trámites rechazados</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
