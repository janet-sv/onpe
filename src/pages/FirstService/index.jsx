import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { loadState } from 'utils/localStorage';
import onpeService from 'services/onpe';
import Button from 'components/Button';
import Input from 'components/Input';
import Header from 'components/Header';
import ConfirmModal from 'components/ConfirmModal';
import contractIcon from 'assets/images/file-blue.svg';
import nextIcon from 'assets/images/next-blue.svg';
import './styles.scssm';

class FirstService extends PureComponent {
  state = {
    session: loadState('session') || null,
    checked: 'a',
    excuse: null,
    optionAList: [{
      id: 1,
      name:'Ser candidato o personero de una organización política',
    }, {
      id: 2,
      name:'Ser funcionario o empleado de los organismos que conforman el Sistema Electoral Peruano',
    }, {
      id: 3,
      name:'Ser miembro del Ministerio Público que, durante la jornada electoral, realizan funciones relacionadas con la prevención e investigación de los delitos electorales',
    }, {
      id: 4,
      name:'Ser funcionario de la Defensoría del Pueblo que realiza supervisión electoral',
    }, {
      id: 5,
      name:'Ser autoridad política',
    }, {
      id: 6,
      name:'Ser autoridad política',
    }, {
      id: 7,
      name:'Ser ciudadano que integra los comités directivos de las organizaciones políticas inscritas en el Jurado Nacional de Elecciones',
    }, {
      id: 8,
      name:'Ser elector temporalmente ausente de la República, de acuerdo con las relaciones correspondientes que remita el Registro Nacional de Identificación y Estado Civil',
    }, {
      id: 9,
      name:'Ser cónyuge o pariente del segundo grado de consanguinidad o afinidad entre miembros de una misma mesa',
    }],
    isConfirmModalOpened: false,
  };

  componentDidMount() {
    if (!this.state.session) {
      this.props.history.push('/login');
    }
  };

  setChecked = (e) => {
    this.setState({
      checked: e.target.value,
      excuse: e.target.value === 'a' ? this.state.excuse : null,
    });
  };

  sendEmail = () => {
    this.setState({
      isConfirmModalOpened: true,
    });
  };

  setExcuse = (value) => {
    this.setState({
      excuse: value,
    });
  };

  sendCode = async () => {
    const {
      excuse,
      checked,
    } = this.state;

    try {
      await onpeService.registerProcedure({
        id: 1,
        name: 'Solicitar Excusa o Justificación al cargo de miembro de mesa',
        type: checked === 'a' ? 'Excusa' : 'Justificación',
        entity: this.refs.entityInput.getValue(),
        party: this.refs.partyInput.getValue(),
        phone: this.refs.phoneInput.getValue(),
        tableNumber: this.refs.tableNumberInput.getValue(),
        excuse: excuse,
        justify: checked === 'b' && this.refs.justifyInput.getValue() || null,
      });
    } catch(error) {
      console.log(error);
    }
  };

  render() {
    const {
      excuse,
      checked,
      optionAList,
      isConfirmModalOpened,
    } = this.state;

    return (
      <div styleName="page">
        <Header hasMenu/>
        <div styleName="content">
          <div>
            <div styleName="logo-wrapper" className="has-shadow">
              <img src={contractIcon} alt="Logo"/>
            </div>
            <h1 styleName="title">NUEVO TRÁMITE</h1>
            <p styleName="message"><strong>Nombre de trámite: </strong>Solicitar Excusa o Justificación al cargo de miembro de mesa</p>
          </div>
          <div styleName="cards">
            <div styleName="card" className="has-shadow">
              <p styleName="text"><strong>Para realizar esta solictud Ud. deberá llenar el siguiente formulario:</strong></p>
              <Input ref="entityInput" label="Dependencia que atiende al usuario (indicar nombre de la ODPE respectiva y/o Área de Atención al Ciudadano y Trámite Documentario)" required/>
              <Input ref="partyInput" label="Nombre de la elección o consulta popular objeto de excusa o justificación" required/>
              <Input ref="phoneInput" label="Teléfono" required/>
              <Input ref="tableNumberInput" label="Miembro de la Mesa de Sufragio número" required/>
              <p style={{fontWeight: '500', margin: '10px 0'}}>Seleccione tipo de solicitud</p>
              <div styleName="options">
                <div>
                  <input type="radio" value="a" name="cause" id="option-a" checked={checked === 'a'} onChange={this.setChecked} /> <label htmlFor="option-a">Excusa</label>
                </div>
                <div>
                  <input type="radio" value="b" name="cause" id="option-b" checked={checked === 'b'} onChange={this.setChecked} /> <label htmlFor="option-b">Justificación</label>
                </div>
              </div>
              {
                checked === 'a'
                && <div>
                  <p style={{fontWeight: '500', margin: '10px 0'}}>Causal por la que solicita excusa</p>
                  <div>
                    {
                      optionAList.map(option => (
                        <div key={`excuse-${option.id}`} style={{margin: '15px 0'}}>
                          <input
                            id={`excuse-${option.id}`}
                            type="radio" value={`excuse-${option.id}`} name="excuse"
                            onChange={() => {this.setExcuse(option.id)}}
                            checked={excuse === option.id}
                          /> <label htmlFor={`excuse-${option.id}`}>{option.name}</label>
                        </div>
                      ))
                    }
                  </div>
                </div>
              }
              {
                checked === 'b'
                && <div>
                  <Input ref="justifyInput" label="Causal por la que solicita justificación en proceso electoral o consulta popular" required/>
                </div>
              }
              <div style={{marginTop: '20px', textAlign: 'center'}}>
                <Button onClick={this.sendEmail}>
                  CONTINUAR
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ConfirmModal
          active={isConfirmModalOpened}
          onClose={() => { this.setState({isConfirmModalOpened: false}) }}
          onSubmit={this.sendCode}
        />
      </div>
    );
  }
}

export default FirstService;
