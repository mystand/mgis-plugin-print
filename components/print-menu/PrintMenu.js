import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import print from 'core/frontend/client/client-menu/icons/print.svg'
import Menu from 'core/frontend/common/menu/Menu'
import styles from 'core/frontend/client/client-menu/client-menu.styl'
import * as modalActions from 'core/frontend/actions/modal-actions'

const PrintMenu = (props) => {
  const { onClick } = props

  return (
    <Menu
      icon={ print }
      title={ 'Print' }
      className={ styles.menu }
      titleClassName={ styles.menuTitle }
      onClick={ onClick }
      childContainerClassName={ styles.childContainer }
    />
  )
}

PrintMenu.propTypes = {
  onClick: PropTypes.func
}

export default connect(() => ({}), dispatch => ({
  onClick: () => dispatch(modalActions.toggle('print', true))
}))(PrintMenu)
