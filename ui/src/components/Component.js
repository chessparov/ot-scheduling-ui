import { h } from 'vue'
import { QBadge } from 'quasar'

export default {
  name: 'TopDrawer',

  setup () {
    return () => h(QBadge, {
      class: 'TopDrawer',
      label: 'TopDrawer'
    })
  }
}
