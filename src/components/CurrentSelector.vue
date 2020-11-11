<template>
<div class="selector" v-bind:class="{ disabled: disabled }">
    <label>{{title}}</label>
    
    <input type="text" v-model="val" autocomplete="off" :disabled="disabled" @input="change"/>
    <Current class="unit" v-model="unit" :disabled="disabled" @input="change"/>
</div>
</template>

<script>
import Current from '@/components/Current.vue'

export default {
  name: 'CurrentSelector',
  components: {
    Current
  },
  props: {
    title: String,
    value: Object,
    disabled: Boolean
  },
  data() {
    return {
      val: this.value ? this.value.value : 0,
      unit: this.value ? this.value.unit : 'nA'
    }
  },
  methods: {
    change() {
      this.$emit('input', {
        value: this.val,
        unit: this.unit
      });
    }
  }
}
</script>

<style scoped lang="scss">
input {
  border: none !important;
  border-bottom: 1px solid #ccc !important;;
}

.selector {
  display: flex;

  &.disabled {
    color: #aaa;

      input {
        color: #aaa;
      }
  }

  label {
    text-align: left;
    flex: 1;
  }
  input {
    width: 50px;
    text-align: right;
  }
  .unit {
    width: 48px;
    margin-left: 4px;
  }
}
</style>
