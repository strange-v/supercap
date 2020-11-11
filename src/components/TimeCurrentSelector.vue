<template>
<div class="selector">
    <label>{{title}}</label>
    
    <input type="text" v-model="time" autocomplete="off" @input="change"/>
    <Time class="unit" v-model="timeUnit" @input="change"/>
    
    <span class="spacer"></span>
    
    <input type="text" v-model="current" autocomplete="off" @input="change"/>
    <Current class="unit" v-model="currentUnit" @input="change"/>
</div>
</template>

<script>
import Time from '@/components/Time.vue'
import Current from '@/components/Current.vue'

export default {
  name: 'TimeCurrentSelector',
  components: {
    Time,
    Current
  },
  props: {
    title: String,
    value: Object
  },
  data() {
    return {
      time: this.value.time,
      timeUnit: this.value.timeUnit,
      current: this.value.current,
      currentUnit: this.value.currentUnit,
    }
  },
  methods: {
    change() {
      this.$emit('input', {
        time: this.time,
        timeUnit: this.timeUnit,
        current: this.current,
        currentUnit: this.currentUnit,
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

    label {
      text-align: left;
      flex: 1;
    }
    input {
      width: 50px;
      text-align: right;
    }
    .suffix {
      width: 20px;
      padding-left: 4px;
      overflow: hidden;
    }
    .unit {
      width: 48px;
      margin-left: 4px;
    }
    .spacer {
      width: 16px;
    }
}
</style>
