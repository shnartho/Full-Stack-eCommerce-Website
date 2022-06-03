import React from 'react'
import { useState } from 'react/cjs/react.production.min'

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault()

    if (keyword) {
      if (keyword.toLowerCase() == 'samsung') {
        history.push(`/categori/1`)
      } else if (keyword.toLowerCase() == 'iphone') {
        history.push('/categori/2')
      } else if (keyword.toLowerCase() == 'oneplus') {
        history.push('/categori/3')
      } else {
        history.push('/categori/4')
      }
    } else {
      history.push('/')
    }
  }
  return (
    <form onSubmit={searchHandler}>
      <div className='input-group'>
        <input
          type="text"
          id="search_field"
          className='form_control'
          placeholder='Enter Product name ...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className='input-group-append'>
          <button id='search_btn' className='btn'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </button>

        </div>
      </div>
    </form>
  )
}

export default Search