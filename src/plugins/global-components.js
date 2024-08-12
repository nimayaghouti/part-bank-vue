import BaseButton from '../components/common/BaseButton.vue'
import BaseFormControl from '../components/common/BaseFormControl.vue'

export default {
  install(app) {
    app.component('BaseButton', BaseButton), app.component('BaseFormControl', BaseFormControl)
  }
}
