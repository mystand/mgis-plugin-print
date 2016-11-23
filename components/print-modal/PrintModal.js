import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Modal from 'core/frontend/components/shared/modal/Modal' //eslint-disable-line
import TextInput from 'core/frontend/common/inputs/text/TextInput' //eslint-disable-line
import { getMap } from 'core/frontend/plugin/api'
import * as modalActions from 'core/frontend/actions/modal-actions'

import * as actions from '../../actions'

const PrintModal = (props) => {
  const { printMap, fields, handleSubmit, onClose } = props
  const onSubmit = handleSubmit(values => printMap(parseFloat(values.zoom), parseInt(values.ratio, 10)))

  return (
    <Modal onClose={ onClose }>
      <form onSubmit={ onSubmit }>
        <TextInput label='Zoom' { ...fields.zoom } />
        <TextInput label='Ratio' { ...fields.ratio } />
        <button type='submit'>Print</button>
      </form>
    </Modal>
  )
}

PrintModal.propTypes = {
  printMap: PropTypes.func.isRequired,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func
}

const form = reduxForm({
  form: 'printModal',
  fields: ['zoom', 'ratio']
})(PrintModal)

export default connect(() => {
  const map = getMap()
  return {
    initialValues: {
      zoom: map && map.getZoom(),
      ratio: 1
    }
  }
}, dispatch => ({
  printMap: bindActionCreators(actions.printMap, dispatch),
  onClose: () => dispatch(modalActions.toggle('print', false))
}))(form)
