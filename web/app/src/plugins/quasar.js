import Vue from "vue";

import "../styles/quasar.scss";
import iconSet from "quasar/icon-set/mdi-v5.js";
import "@quasar/extras/mdi-v5/mdi-v5.css";
import { Quasar, Notify } from "quasar";
import {
  QFooter,
  QTabs,
  QBtn,
  QCard,
  QSkeleton,
  QLayout,
  QIcon,
  QToolbar,
  QImg,
  QInput,
  QScrollArea,
  QCardActions,
  QRouteTab,
  QPageSticky,
  QCheckbox,
  QSelect,
  QDialog,
  QPageContainer,
  QItemSection,
  QMenu,
  QList,
  QItem,
  QHeader,
  QToolbarTitle,
} from "quasar";

iconSet.field.error = "mdi-alert-circle-outline";

Vue.use(Quasar, {
  config: {},
  components: {
    QMenu,
    QList,
    QItem,
    QHeader,
    QToolbarTitle,
    QDialog,
    QPageContainer,
    QItemSection,
    QLayout,
    QToolbar,
    QIcon,
    QImg,
    QCard,
    QSkeleton,
    QFooter,
    QTabs,
    QBtn,
    QInput,
    QScrollArea,
    QCardActions,
    QRouteTab,
    QPageSticky,
    QCheckbox,
    QSelect,
  },
  directives: {
    /* not needed if importStrategy is not 'manual' */
  },
  plugins: { Notify },
  iconSet: iconSet,
});
