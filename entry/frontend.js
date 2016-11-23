import PrintMenu from '../components/print-menu/PrintMenu'
import PrintModal from '../components/print-modal/PrintModal'
import saga from '../saga'

export default {
  name: 'Печать',
  options: [
    { key: 'url', label: 'Print server url', type: 'string' }
  ],
  connects: {
    components: [
      { component: PrintMenu, position: 'clientMenu' },
      { component: PrintModal, position: 'modals', options: { key: 'print' } }
    ],
    saga
  }
}
