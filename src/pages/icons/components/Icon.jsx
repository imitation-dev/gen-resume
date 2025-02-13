import React from 'react'

export default function Icon(props) {
  const {
    name,
    html,
    handleClick,
  } = props

  return (
    <li
      className='icon-item'
      onClick={() => {
        if (handleClick) {
          handleClick(name)
        }
      }}
    >
      <i
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      <div className='name'>{name}</div>
    </li>
  )
}

Icon.propTypes = {
  name: String,
  html: String,
  handleClick: Function,
}
