<template>
<select class="unit" v-model="selected">
  <option v-for="option in options" v-bind:value="option.value" :key="option.value">
    {{option.title}}
  </option>
</select>
</template>

<script>
export default {
  name: 'Time',
  props: {
    value: String
  },
  data() {
    return {
      selected: this.value,
      options: [{
          value: 'us',
          title: 'µs'
      }, {
          value: 'ms',
          title: 'ms'
      }, {
          value: 's',
          title: 's'
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
