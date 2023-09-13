import './material-input.scss'

export default {
  props: {
    name: { type: String, default: '' },
    label: { type: String, default: '' },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    autofocus: { type: Boolean, default: false },
    value: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    modelValue: [String, Number]
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
    },
    modelValue (val) {
      this.valueInternal = val
    },
  },
  computed: {
    computeClass: function () {
      let classes = []
      if (this.isValid === true) {
        classes.push('valid')
      } else if (this.isValid === false) {
        classes.push('invalid')
      }

      classes.push({ filled: !!this.valueInternal || this.type === 'datetime-local' || this.valueInternal === 0})
      return classes
    },
  },
  methods: {
    onInvalid: function (e) {
      this.isValid = e.target.validity.valid
    },
    validate: function (input) {
      this.isValid = input.validity.valid
      this.$emit(this.isValid ? 'valid' : 'invalid')
      return this.isValid
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
