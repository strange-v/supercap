<template>
  <div class="home">
    <Capacitor
      v-for="(capacitor) in capacitors"
      :key="capacitor.id"
      v-bind:value="capacitor"
      v-on:close="onClose"
      v-on:duplicate="onDuplicate"/>
  </div>
</template>

<script>
import Capacitor from '@/components/Capacitor.vue'

export default {
  components: {
    Capacitor
  },
  data() {
    return {
      capacitors: [{
        id: 1,
        vMax: 3.6,
        vMin: 1.8,
        cap: 1,
        esr: 10,
        run: {
          time: 5,
          timeUnit: 'ms',
          current: 45,
          currentUnit: 'ma'
        },
        idle: {
          time: 55,
          timeUnit: 'ms',
          current: 3,
          currentUnit: 'ma'
        },
        sleep: {
          time: 60,
          timeUnit: 's',
          current: 5,
          currentUnit: 'ua'
        },
        ldoEnabled: false,
        ldo: {
          qCurr: {
            value: 200,
            unit: 'na'
          },
          vOut: 1.9
        }
      }]
    };
  },
  methods: {
    onClose(id) {
      for (let i = 0; i < this.capacitors.length; i++) {
        if (this.capacitors[i].id == id)
          this.capacitors.splice(i, 1);
      }
    },
    onDuplicate(data) {
      let maxId = Math.max(...this.capacitors.map(c => c.id));

      data.id = maxId + 1;
      this.capacitors.push(data);
    }
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
  overflow-x: auto;
  margin: 0 16px 0 16px;
  padding-bottom: 16px;
  // justify-content: center;
}
</style>