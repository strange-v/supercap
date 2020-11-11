<template>
<select class="unit" v-model="selected" :disabled="disabled">
  <option v-for="option in options" v-bind:value="option.value" :key="option.value">
    {{option.title}}
  </option>
</select>
</template>

<script>
export default {
  name: 'Current',
  props: {
    value: String,
    disabled: Boolean
  },
  data() {
    return {
      selected: this.value,
      options: [{
          value: 'na',
          title: 'nA'
      }, {
          value: 'ua',
          title: 'µA'
      }, {
          value: 'ma',
          title: 'mA'
      }, {
          value: 'a',
          title: 'A'
      }]
    };
  },
  watch: {
    selected() {
      this.$emit('input', this.selected);
    }
  }
}
</script>

<style scoped lang="scss">
</style>
