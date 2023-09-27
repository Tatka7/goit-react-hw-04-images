import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Please, enter search request.');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.btn}>
          <Icon icon="flat-color-icons:search" height="24" />
        </button>

        <input
          onChange={handleChange}
          value={search}
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

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
