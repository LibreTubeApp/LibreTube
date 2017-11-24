import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router'

import ErrorMessage from '../ErrorMessage';
import styles from './styles';

export default class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: null,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  setRef = ref => this.formRef = ref;

  handleSubmit = async event => {
    const { username, password } = this.state;
    event.preventDefault();

    this.setState({ submitting: true, error: null });

    try {
      const result = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
        },
      });

      if (result.status === 403) {
        this.setState({
          error: 'The username and password you\'ve given doesn\'t match any ' +
            'account. Try again',
          submitting: false,
        });
        return;
      }
      if (!result.ok) {
        this.setState({
          error: 'An unknown error occured logging you in. Check the logs',
          submitting: false,
        });
      }

      Router.push('/');
    } catch (error) {
      this.setState({ error, submitting: false });
    }
  };

  render() {
    const { submitting, error } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit} ref={this.setRef}>
          <style jsx>{styles}</style>
          <label>
            Username
            <input
              name="username"
              type="text"
              required
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              required
              minLength={6}
              onChange={this.handleChange}
            />
          </label>

          <button className="primary-btn" disabled={submitting}>
            Login
          </button>

          {error && <p>{`${error}`}</p>}
          {submitting && <p>Please wait...</p>}
        </form>
      </div>
    );
  }
}
