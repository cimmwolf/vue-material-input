<template>
  <div class="material-input">
    <select :id="id"
            ref="select"
            :autofocus="autofocus"
            :class="computeClass"
            :disabled="disabled"
            :multiple="multiple"
            :name="name"
            :required="required"
            :size="size"
            :value="valueInternal"
            @blur="onBlur"
            @input="onInput"
            @invalid="onInvalid">
      <slot/>
    </select>
    <label :for="id" class="control-label">{{ label }}</label>
    <i class="bar"></i>
  </div>
</template>

<style scoped>
.material-input {
  position: relative;
}

.material-input:after {
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  right: 0;
  border: 6px solid transparent;
  border-top-color: currentColor;
  pointer-events: none;
  opacity: var(--label-opacity, 1);
}

.material-input:focus-within:after {
  opacity: 1;
}

select {
  width: 100%;
  height: 2.1em;
  padding: 0.125em 15px 0.0625em 0;
  background: none;
  border: none;
  line-height: 1.6;
  box-shadow: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  cursor: pointer;
}

select option {
  color: var(--font-color, currentColor);
}
</style>

<script>
import InputMixin from './input-mixin.js'

export default {
  name: 'InputSelectMaterial',
  mixins: [InputMixin],
  props: {
    multiple: Boolean,
    size: String
  },
  mounted () {
    if (!this.valueInternal && this.$refs.select.children.length > 0) {
      this.valueInternal = this.$refs.select.children[0].value
      this.$emit('input', this.valueInternal)
    }
  },
  methods: {
    onBlur: function (e) {
      this.validate(e.target)
    },
    onInput: function (e) {
      this.valueInternal = e.target.value
      this.$emit('update:modelValue', e.target.value)
    }
  },
}
</script>
