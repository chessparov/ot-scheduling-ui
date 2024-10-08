import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-ot-scheduling'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
