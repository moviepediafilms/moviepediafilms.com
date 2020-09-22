import Vue from 'vue'

import '../styles/quasar.scss'
import iconSet from 'quasar/icon-set/mdi-v5.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/mdi-v5/mdi-v5.css'
import { Quasar } from 'quasar'

Vue.use(Quasar, {
  config: {
    // brand: {
    //   primary: '#ff9800',
    //   secondary: '#ffffff',
    //   accent: '#9C27B0',

    //   dark: '#2c3e50',

    //   positive: '#27ae60',
    //   negative: '#e74c3c',
    //   info: '#3498db',
    //   warning: '#e67e22'
    // }
  },
  components: { /* not needed if importStrategy is not 'manual' */ },
  directives: { /* not needed if importStrategy is not 'manual' */ },
  plugins: {
  },
  iconSet: iconSet
})