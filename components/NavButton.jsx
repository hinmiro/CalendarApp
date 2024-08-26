import React from 'react'
import styles from '../styles/myStyle';


const NavButton = ({name}) => {

  return (
    <button style={styles.navButton}>{name}</button>
  )
}

export default NavButton