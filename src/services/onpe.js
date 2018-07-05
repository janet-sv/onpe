import switchcase from 'utils/switchcase';
import { loadState, saveState } from 'utils/localStorage';

class onpeService {
  endpoint = process.env.REACT_APP_ONPE_URL;

  async login(credentials) {
    const url = `${this.endpoint}/api-token-auth/`;

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: credentials.dni,
        password: credentials.password,
      }),
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      session: {
        token: data.token
      },
    };
  }

  async registerProcedure(form) {
    const url = `${this.endpoint}/api/v1/user/`;

    const session = loadState('session');

    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${session.token}`
      },
      body: JSON.stringify({
        user: session.user.id,
        id: form.id,
        name: form.name,
        type: form.type,
        entity: form.entity,
        party: form.party,
        phone: form.phone,
        table_number: form.tableNumber,
        excuse: form.excuse,
        justify: form.justify,
      }),
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      status: 'success',
    };
  }

  async getProceduresStatistics() {
    const url = `${this.endpoint}/api/v1/user/me/procedure-statistics/`;

    const session = loadState('session');

    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${session.token}`
      },
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    return {
      done: data.done,
      accepted: data.accepted,
      denied: data.denied,
      inProcess: data.in_process,
    };
  }

    async getProcedures() {
    const url = `${this.endpoint}/api/v1/user/me/procedures/`;

    const session = loadState('session');

    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${session.token}`
      },
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const procedures = data.map(element => ({
      id: element.id,
      name: element.name,
      status: element.status,
      type: element.type,
      statusDescription: element.status_description,
      registerDate: element.created,
      codeStatus: element.status_code,
    }));

    return {
      procedures: procedures
    };
  }

  async getUser() {
    const url = `${this.endpoint}/api/v1/user-custom/me/`;

    const session = loadState('session');

    const response = await fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${session.token}`
      },
    });

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const user = {
      id: data.id,
      name: data.first_name,
      firstLastname: data.last_name,
      secondLastname: data.second_last_name,
      address: data.address,
      district: data.district,
      province: data.province,
      department: data.department,
      bithdate: data.birthdate,
      urlSign: data.url_sign,
      isDonor: data.is_donor,
      dni: data.dni,
      email: data.email,
    };

    saveState('session', {
      token: session.token,
      user: user,
    });

    return user;
  }

  async getAllProcedure(form) {
    const url = `${this.endpoint}/api/v1/user/`;

    const session = loadState('session');

    const response = await fetch(url);

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const procedures = data.map(element => ({
      id: element.id,
      type: element.type,
      name: element.name,
      registerDate: element.created,
      status: element.status,
      statusCode: element.status_code,
    }));

    return {
      list: procedures
    };
  }

  async getHistory(id) {
    const url = `${this.endpoint}/api/v1/user/${id}/history`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = switchcase({
        '404': 'The username given does not exist'
      })('An unexpected error ocurred')(response.status);

      throw new Error(error);
    }

    const data = await response.json();

    if (data.Error) {
      throw new Error(`There was an error in the response ${data.Error}`);
    }

    const procedure = {
      id: data.id,
      name: data.name,
      type: data.type,
      history: data.history && data.history.map(element => ({
        registerDate: element.register_date,
        status: element.status,
        statusCode: element.status_code,
      })),
    };

    return {
      procedure: procedure,
    };
  }
}

export default new onpeService();
