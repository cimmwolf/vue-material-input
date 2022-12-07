import './material-input.scss'

export default {
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    value: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    modelValue: String
  },
  data: function () {
    return {
      error: '',
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 7),
      isFilled: false,
      isValid: null,
      valueInternal: this.value || this.modelValue
    }
  },
  watch: {
    value (val) {
      this.valueInternal = val
    }
  },
  computed: {
    computeClass: function () {
      let classes = []
      if (this.isValid === true) {
        classes.push('valid')
      } else if (this.isValid === false) {
        classes.push('invalid')
      }

      classes.push({ filled: !!this.valueInternal })
      return classes
    },
  },
  methods: {
    onInvalid: function () {
      this.isValid = false
    },
    validate: function (input) {
      input.setCustomValidity('')
      let isValid = true
      if (input.hasAttribute('required') && input.value === '') {
        isValid = false
        this.$emit('invalid')
      }
      this.$emit('valid')
      return this.isValid = isValid
    },
    setCustomValidity (message) {
      this.error = message
      this.isValid = message === ''
      if ('input' in this.$refs) {
        this.$refs.input.setCustomValidity(message)
      }
    },
    focus () {
      if ('input' in this.$refs) {
        this.$refs.input.focus()
      }
    }
  },
}
