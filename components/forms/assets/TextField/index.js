import React from 'react'
import styles from './styles.module.scss'

export default function TextField({
  type="text", 
  label, 
  placeholder="here",
  value,
  onChange=() => {},
}) {

  const id = label
    .toLowerCase()
    .split(" ")
    .map(word => word.replace(/^[a-z]+/g))
    .join('-');

  return (
    <div className={styles.input_container}>
      <label htmlFor={id}>
        {label}
      </label>

      <input 
        className={styles.input}
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value, e)}
        value={value}
      />
    </div>
   
  )
}