import React, { Component } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Please, enter search request.');
    }
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.btn}>
            <Icon icon="flat-color-icons:search" height="24" />
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.search}
            name="search"
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
