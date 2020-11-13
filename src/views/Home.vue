<template>
  <div class="home">
    <Capacitor
      v-for="(capacitor) in capacitors"
      :key="capacitor.key"
      v-bind:value="capacitor"
      v-on:delete="onDelete"
      v-on:duplicate="onDuplicate"
      v-on:update="onUpdate"/>
  </div>
</template>

<script>
import Capacitor from '@/components/Capacitor.vue'

let key = 0;

export default {
  components: {
    Capacitor
  },
  data() {
    return {
      capacitors: []
    };
  },
  created() {
    window.addEventListener('beforeunload', this.saveData)
  },
  mounted() {
    if (localStorage.getItem('capacitors')) {
      try {
        this.capacitors = JSON.parse(localStorage.getItem('capacitors'));
      } catch(e) {
        localStorage.removeItem('capacitors');
      }
    } else {
      this.capacitors = [this.getDefaultCapacitor()];
    }
  },
  methods: {
    onDelete(id) {
      if (this.capacitors.length == 1) {
        this.capacitors.shift();
        this.capacitors.push(this.getDefaultCapacitor());
        return;
      }
      
      for (let i = 0; i < this.capacitors.length; i++) {
        if (this.capacitors[i].id == id)
          this.capacitors.splice(i, 1);
      }
    },
    onDuplicate(data) {
      let maxId = Math.max(...this.capacitors.map(c => c.id));

      data.id = maxId + 1;
      data.key = ++key;
      this.capacitors.push(data);
    },
    onUpdate(data) {
      for (let i = 0; i < this.capacitors.length; i++) {
        if (this.capacitors[i].id == data.id)
          this.capacitors[i] = data;
      }
    },
    saveData() {
      const text = JSON.stringify(this.capacitors);
      localStorage.setItem('capacitors', text);
    },
    getDefaultCapacitor() {
      return {
        id: 1,
        key: ++key,
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
      };
    }
  },
  beforeRouteLeave(to, from, next) {
    this.saveData();
    next();
  }
}
</script>
<style lang="scss">
.home {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  overflow-x: auto;
  margin: 0 16px 0 16px;
  padding-bottom: 16px;
}

@media only screen and (max-width:480px) {
  .home {
    display: block;
    margin: 0;
    padding: 0 12px;
  }
}
</style>