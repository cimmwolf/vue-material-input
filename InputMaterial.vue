<template>
  <div :class="{invalid: !isValid}" class="material-input">
    <input :id="id"
           ref="input"
           v-model="valueInternal"
           :autocapitalize="autocapitalize"
           :autocomplete="autocomplete"
           :autofocus="autofocus"
           :class="computeClass"
           :disabled="disabled"
           :max="max"
           :maxlength="maxlength"
           :min="min"
           :name="name"
           :pattern="pattern"
           :placeholder="placeholder"
           :required="required"
           :spellcheck="spellcheck"
           :step="step"
           :type="type"
           @blur="onBlur"
           @change="onInput"
           @focus="onFocus"
           @input="onInput"
           @invalid="onInvalid">
    <label :for="id" class="control-label">{{ label }}</label><i class="bar"></i>
    <div class="error">{{ error }}</div>
    <div class="hint">{{ hint }}</div>
  </div>
</template>

<script>
import InputMixin from './input-mixin.js'

export default {
  name: 'InputMaterial',
  mixins: [InputMixin],
  props: {
    type: { type: String, default: 'text' },
    autocapitalize: { type: String, default: 'off' },
    autocomplete: { type: String, default: 'on' },
    spellcheck: { type: String, default: 'true' },
    maxlength: { type: Number },
    needVerification: Boolean,
    hint: String,
    min: String,
    max: String,
    pattern: String,
    step: String,
    wrongEmailMessage: { type: String, default: 'Проверьте ваш адрес почты. Скорее всего в нём ошибка.' },
  },
  data: function () {
    return {
      isModalOpened: false,
      smsStatus: null,
      smsServerCode: null,
      enteredCode: null,
      valueVerified: null
    }
  },
  mounted () {
    let color = window.getComputedStyle(this.$el).getPropertyValue('color')
    this.$el.style.setProperty('--autofill-color', color)

    if (this.type === 'date') {
      let calendarIcon = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="${color}" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>')`
      this.$el.style.setProperty('--calendar-icon', calendarIcon)
    }

    if (this.autofocus) {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  },
  methods: {
    onInput: function ($e) {
      this.isFilled = this.valueInternal !== ''

      if (this.autocapitalize === 'on' && this.type !== 'email') {
        this.valueInternal = this.valueInternal.charAt(0).toUpperCase() + this.valueInternal.slice(1)
      }
      if (this.type === 'tel' && this.valueInternal !== '') {
        this.valueInternal = '+' + this.valueInternal.replace(/^\+8([39])/, '7$1').replace(/\D/g, '')
      }
      this.$emit('input', $e.target.value)
    },
    onBlur: function () {
      if (this.validate(this.$refs.input)) {
        if (this.type === 'email') {
          this.validateEmail(this.valueInternal)
        }
      }
      this.$emit('blur', this.valueInternal)
    },
    onFocus: function () {
      this.isValid = null
      this.$emit('focus', this.valueInternal)
    },
    async validateEmail (email) {
      let response = await fetch(`https://email-checker-dot-ds-eur.appspot.com?email=${email}`)
      let json = await response.json()
      if (json.error) {
        this.isValid = false
        this.error = this.wrongEmailMessage
      } else {
        this.isValid = true
        this.error = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.material-input {
  --autofill-color: var(--font-color, black);
  --calendar-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTIwIDNoLTFWMWgtMnYySDdWMUg1djJINGMtMS4xIDAtMiAuOS0yIDJ2MTZjMCAxLjEuOSAyIDIgMmgxNmMxLjEgMCAyLS45IDItMlY1YzAtMS4xLS45LTItMi0yem0wIDE4SDRWOGgxNnYxM3oiLz48L3N2Zz4=')
}

input {
  background-color: transparent;
  background-image: none;
  border: none;
  box-shadow: none;
  display: block;
  font-family: inherit;
  font-size: inherit;
  height: 2em;
  line-height: 2em;
  padding: 0;
  width: 100%;
  color: currentColor;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  color: var(--autofill-color);
  -webkit-text-fill-color: var(--autofill-color);
  transition: background-color 5000s ease-in-out 0s;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background-image: var(--calendar-icon);
}

input[disbaled]:-webkit-autofill {
  color: black;
  -webkit-text-fill-color: black;
}
</style>



