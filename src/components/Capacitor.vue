<template>
  <div class="capacitor">
    <div class="header">
      Supercapacitor #{{id}}
      <div class="icon duplicate" title="Duplicate" v-on:click="onDuplicate"></div>
      <div class="icon close" title="Delete" v-on:click="onClose"></div>
    </div>
    <div class="inputs">
      <div class="row">
        <label :for="'vmax' + id">Nominal voltage (V<sub>max</sub>)</label>
        <input type="text" :id="'vmax' + id" v-model="vMax"/>
        <span class="suffix">V</span>
      </div>
      <div class="row">
        <label :for="'vmin' + id">Discharge voltage (V<sub>min</sub>)</label>
        <input type="text" :id="'vmin' + id" v-model="vMin"/>
        <span class="suffix">V</span>
      </div>
      <div class="row">
        <label :for="'cap' + id">Capacitance (C)</label>
        <input type="text" :id="'cap' + id" v-model="cap"/>
        <span class="suffix" >F</span>
      </div>
      <div class="row">
        <label :for="'esr' + id">Equivalent series resistance (ESR)</label>
        <input type="text" :id="'esr' + id" v-model="esr"/>
        <span class="suffix">Ω</span>
      </div>
      <div class="row">Current consumptions in different modes</div>
      <TimeCurrentSelector class="row"
        title="Run"
        v-model="run"/>
      <TimeCurrentSelector class="row"
        title="Idle"
        v-model="idle"/>
      <TimeCurrentSelector class="row"
        title="Sleep"
        v-model="sleep"/>
      <div class="row">
        <input type="checkbox" :id="'ldo' + id" v-model="ldoEnabled">
        <label :for="'ldo' + id">LDO enabled</label>
      </div>
      <div class="ldo" v-bind:class="{ disabled: !ldoEnabled }">
        <div class="row">
          <label :for="'ldoout' + id">Output voltage</label>
          <input type="text" :id="'ldoout' + id" v-model="ldo.vOut" :disabled="!ldoEnabled" />
          <span class="suffix">V</span>
        </div>
        <!-- <div class="row">
          <label :for="'ldodrop' + id">Dropout voltage</label>
          <input type="text" :id="'ldodrop' + id" v-model="ldo.vDrop" :disabled="!ldoEnabled" />
          <span class="suffix">V</span>
        </div> -->
        <CurrentSelector class="row" title="Quiescent current" v-model="ldo.qCurr" :disabled="!ldoEnabled"/>
      </div>
    </div>
    <div class="results">
      <div class="row">
        <div class="label">Effective energy:</div>
        <div class="value">{{energy | float}} J</div>
      </div>
      <div class="row">
        <div class="label">Avg current consumption:</div>
        <div class="value">{{avgCurrent | current}}</div>
      </div>
      <div class="row">
        <div class="label">Max voltage drop:</div>
        <div v-if="maxVoltageDrop >= 0.001" class="value">{{maxVoltageDrop | float(3)}} V</div>
        <div v-if="maxVoltageDrop < 0.001" class="value">&lt; 0.001 V</div>
      </div>
      <div class="row">
        <div class="label">Constant current discharge:</div>
        <div class="value">{{ccDischarge | duration}}</div>
      </div>
      <div class="row">
        <div class="label">Constant resistance discharge:</div>
        <div class="value">{{crDischarge | duration}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeCurrentSelector from '@/components/TimeCurrentSelector.vue'
import CurrentSelector from '@/components/CurrentSelector.vue'

export default {
  name: 'Capacitor',
  components: {
    TimeCurrentSelector,
    CurrentSelector,
  },
  props: {
    value: Object,
  },
  data() {
    return {
      id:  this.value.id,
      vMax: this.value.vMax,
      vMin: this.value.vMin,
      cap: this.value.cap,
      esr: this.value.esr,
      run: {...this.value.run},
      idle: {...this.value.idle},
      sleep: {...this.value.sleep},
      ldoEnabled: this.value.ldoEnabled,
      ldo: {...this.value.ldo},
    }
  },
  computed: {
    energy() {
      let result = 0.5 * this.cap * (Math.pow(this.vMax, 2) - Math.pow(this.vMin, 2));

      if (this.ldoEnabled) {
        result *= this.getLdoEfficiency(this.vMin, this.vMax, this.ldo.vOut);
      }

      return result;
    },
    avgCurrent() {
      return this.getAvgCurrentConsumption(this.run, this.idle, this.sleep, this.ldoEnabled ? this.ldo : null);
    },
    maxVoltageDrop() {
      const runCurrent = this.getCurrent(this.run.current, this.run.currentUnit);
      const idleCurrent = this.getCurrent(this.idle.current, this.idle.currentUnit);
      const sleepCurrent = this.getCurrent(this.sleep.current, this.sleep.currentUnit);
      const maxCurrent = Math.max(runCurrent, idleCurrent, sleepCurrent);

      return this.esr * maxCurrent;
    },
    ccDischarge() {
      let result = (this.cap * (this.vMax - this.vMin)) / this.avgCurrent;

      if (this.ldoEnabled) {
        result *= this.getLdoEfficiency(this.vMin, this.vMax, this.ldo.vOut);
      }

      return result;
    },
    crDischarge() {
      const rEq = this.vMax / this.avgCurrent;
      let result = -1 * this.cap * rEq * Math.log(this.vMin/this.vMax);

      if (this.ldoEnabled) {
        result *= this.getLdoEfficiency(this.vMin, this.vMax, this.ldo.vOut);
      }

      return result;
    }
  },
  methods: {
    onDuplicate() {
      this.$emit('duplicate', {...this._data});
    },
    onClose() {
      this.$emit('close', this.id);
    },
    getLdoEfficiency(vMin, vMax, vOut) {
      console.log((vOut / vMin + vOut / vMax) / 2)
      return (vOut / vMin + vOut / vMax) / 2;
    },
    getAvgCurrentConsumption(run, idle, sleep, ldo) {
      const runTime = this.getTime(run.time, run.timeUnit);
      const runCurrent = this.getCurrent(run.current, run.currentUnit);
      const idleTime = this.getTime(idle.time, idle.timeUnit);
      const idleCurrent = this.getCurrent(idle.current, idle.currentUnit);
      const sleepTime = this.getTime(sleep.time, sleep.timeUnit);
      const sleepCurrent = this.getCurrent(sleep.current, sleep.currentUnit);
      
      var result = (runCurrent * runTime + idleCurrent * idleTime + sleepCurrent * sleepTime) / (runTime + idleTime + sleepTime);

      if (ldo) {
        const qCurrent = this.getCurrent(ldo.qCurr.value, ldo.qCurr.unit);
        result += qCurrent;
      }

      return result;
    },
    getCurrent(value, unit) {
      const v = parseFloat(value);

      switch (unit) {
        case 'na':
          return v / 1000000000;
        case 'ua':
          return v / 1000000;
        case 'ma':
          return v / 1000;
        case 'a':
          return v;
        default:
          throw `Unknown unit ${unit}`
      }
    },
    getTime(value, unit) {
      const v = parseFloat(value);

      switch (unit) {
        case 'us':
          return v / 1000000;
        case 'ms':
          return v / 1000;
        case 's':
          return v;
        default:
          throw `Unknown unit ${unit}`
      }
    }
  },
  filters: {
    float(value, num) {
      if (num === undefined)
        num = 2;

      return value.toFixed(num);
    },
    current(v, num) {
      const fn = (v, u) => `${v.toFixed(num)} ${u}`;

      let value = v;

      if (num === undefined)
        num = 3;
      
      if (value > 1)
        return fn(value, 'A');
      
      value *= 1000;
      if (value > 1)
        return fn(value, 'mA');

      value *= 1000;
      if (value > 1)
        return fn(value, 'µA');
      
      value *= 1000;
      if (value > 1)
        return fn(value, 'nA');
    },
    duration(v) {
      const y = Math.floor(v / (3600*24*365));
      const d = Math.floor(v / (3600*24));
      const h = Math.floor(v % (3600*24) / 3600);
      const m = Math.floor(v % 3600 / 60);
      const s = Math.floor(v % 60);

      const yText = y > 0 ? y + 'y ' : '';
      const dText = d > 0 ? d + 'd ' : '';
      const hText = h > 0 ? h + 'h ' : '';
      const mText = m > 0 ? m + 'm ' : '';
      const sText = s > 0 ? s + 's' : '';

      return yText + dText + hText + mText + sText;
    }
  }
}
</script>

<style scoped lang="scss">
.capacitor {
  margin-right: 8px;
  width: 350px;
  min-width: 350px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  .header {
    position: relative;
    padding: 12px 16px 8px 16px;
    font-size: 18px;

    .icon {
      position: absolute;
      top: 8px;
      height: 24px;
      width: 24px;
      cursor: pointer;
    }
    .duplicate {
      right: 40px;
      background: url("~@/assets/duplicate.svg") no-repeat;
      background-size: 24px;
    }
    .close {
      right: 8px;
      background: url("~@/assets/close.svg") no-repeat;
      background-size: 24px;
    }
  }

  input {
    border: none !important;
    border-bottom: 1px solid #ccc !important;;
  }
  .row {
    display: flex;
    padding: 8px 16px;

    label {
      text-align: left;
      flex: 1;
    }
    input[type=text] {
      width: 50px;
      text-align: right;
    }
    input[type=checkbox] {
      margin: 1px 8px 0 0;
    }
    .suffix {
      width: 12px;
      padding-left: 4px;
      overflow: hidden;
    }
  }
  .ldo {
    &.disabled {
      color: #aaa;

      input {
        color: #aaa;
      }
    }
    .suffix {
      width: 48px;
    }
  }
  .inputs {
    padding-bottom: 8px;
  }
  .results {
    padding: 8px 0;
    background: #eee;

    .label {
      margin-right: 8px;
    }
    .value {
      font-weight: bold;
    }
  }
}
</style>
