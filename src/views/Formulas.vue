<template>
  <div class="page">
    <h2>General formulas</h2>
    
    <h3><span>1</span>Effective stored energy</h3>
    
    <p>Only part of the supercapacitor's stored energy is available to applications because, at some stage of discharge, the voltage becomes too low to be useful. The effective realized amount of energy <span v-katex:auto>\(W_{eff}\)</span> is reduced by the used voltage difference between <span v-katex:auto>\(V_{max}\)</span> and <span v-katex:auto>\(V_{min}\)</span> and can be represented as:</p>
    <div class="formula" v-katex:display="'W_{eff}=\\frac{1}{2} C \\cdot(V_{max}^2-V_{min}^2)'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(C\)</span> &mdash; capacitance of the capacitor (F)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_{min}\)</span> &mdash; discharged voltage, min voltage that is still usable to application (V)</li>
    </ul>

    <h3><span>2</span>IR drop</h3>
    <p>Voltage drop on the supercapacitor during the current flow.</p>
    <div class="formula" v-katex:display="'W_{drop}=I\\cdot ESR'"></div>
    <p class="center">or</p>
    <div class="formula" v-katex:display="'W_{drop}=I(ESR + \\frac{t}{C})'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(I\)</span> &mdash; current (A)</li>
      <li><span v-katex:auto>\(ESR\)</span> &mdash; equivalent series resistance (ohms)</li>
      <li><span v-katex:auto>\(t\)</span> &mdash; time (seconds)</li>
      <li><span v-katex:auto>\(C\)</span> &mdash; capacitance of the capacitor (F)</li>
    </ul>

    
    <h2>Calculation of discharge time</h2>

    <h3><span>1</span>Constant current discharge</h3>
    <p>The constant current means, that the application consumes a stable current as the voltage falls during the discharge. Applied resistance should vary to achieve a constant current regardless of the applied voltage.</p>
    <div class="formula" v-katex:display="'t=\\frac{C(V_{max} - V_{min})}{I}'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(C\)</span> &mdash; capacitance of the capacitor (F)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_{min}\)</span> &mdash; discharged voltage, min voltage that is still usable to application (V)</li>
      <li><span v-katex:auto>\(I\)</span> &mdash; current (A)</li>
    </ul>

    <h3><span>2</span>Constant resistance discharge</h3>
    <div class="formula" v-katex:display="'t=-C \\cdot R_{eq} \\cdot ln(\\frac{V_{max}}{V_{min}})'"></div>
    <p class="center">where</p>
    <div class="formula" v-katex:display="'R_{eq}=\\frac{V_{max}}{I}'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(C\)</span> &mdash; capacitance of the capacitor (F)</li>
      <li><span v-katex:auto>\(R_{eq}\)</span> &mdash; equivalent resistance (ohms)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_{min}\)</span> &mdash; discharged voltage, min voltage that is still usable to application (V)</li>
    </ul>
    
    <h3><span>3</span>Converting to nominal battery capacitance</h3>
    <div class="formula" v-katex:display="'t=0.5 \\cdot C \\cdot \\frac{V_{max}^2}{3600 \\cdot V_b}'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(C\)</span> &mdash; capacitance of the capacitor (F)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_b\)</span> &mdash; nominal battery voltage (V)</li>
    </ul>


    <h2>Calculation of necessary capacitance</h2>
    
    <h3><span>1</span>Constant current discharge</h3>
    <div class="formula" v-katex:display="'C=I \\cdot \\frac{t}{V_{max} - V_{min}}'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(I\)</span> &mdash; current (A)</li>
      <li><span v-katex:auto>\(t\)</span> &mdash; discharge time (seconds)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_{min}\)</span> &mdash; discharged voltage (V)</li>
    </ul>

    <h3><span>2</span>Constant resistance discharge</h3>
    <div class="formula" v-katex:display="'C=\\frac{-t}{R_{eq} \\cdot ln(\\frac{V_{max}}{V_{min}})}'"></div>
    <ul class="f-desc">
      <li><span v-katex:auto>\(t\)</span> &mdash; discharge time (seconds)</li>
      <li><span v-katex:auto>\(R_{eq}\)</span> &mdash; equivalent resistance (ohms)</li>
      <li><span v-katex:auto>\(V_{max}\)</span> &mdash; charged capacitor's voltage (V)</li>
      <li><span v-katex:auto>\(V_{min}\)</span> &mdash; discharged voltage (V)</li>
    </ul>

    <p>References:<br/>
      <ul>
        <li><a href="https://www.mouser.com/pdfdocs/ELNACalcuDYNACAPDischargeTime_Jul2011.pdf" target="_blank">mouser.com</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Supercapacitor" target="_blank">Wikipedia</a></li>
      </ul>
    </p>

  </div>
</template>
<style lang="scss">
h3 {
  span {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #eee;
    border: 1px solid #ccc;
    border-radius: 100%;
    text-align: center;
    line-height: 24px;
    margin-right: 8px;
  }
}
.formula {
  font-size: 16px;
}
.f-desc {
  margin: 0px 15% 2em 15%;

  li {
    list-style-type: none;
  }
}

@media only screen and (max-width:480px) {
  .f-desc {
    margin: 0;
    padding: 0 8%;

    li {
      margin: 0;
      pad: 0;
    }
  }
}
</style>