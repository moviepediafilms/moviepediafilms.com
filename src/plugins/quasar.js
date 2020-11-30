import Vue from 'vue'

import '../styles/quasar.scss'
import iconSet from 'quasar/icon-set/mdi-v5.js'
import '@quasar/extras/mdi-v5/mdi-v5.css'
import { Quasar, Notify } from 'quasar'

iconSet.field.error = 'mdi-alert-circle-outline'


Vue.use(Quasar, {
    config: {},
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { /* not needed if importStrategy is not 'manual' */ },
    plugins: { Notify },
    iconSet: iconSet
})