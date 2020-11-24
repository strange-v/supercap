<template>
  <div class="page">
    <h2>About</h2>
    <p>This calculator has been created to simplify the life of enthusiasts who would like to use supercapacitors in their projects.</p>
    <p>Please report any issues via the <a href="https://github.com/strange-v/supercap" target="_blank">GitHub</a> issue tracker.</p>

    <h2>Icon credits</h2>
    <ul>
      <li><a href="https://thenounproject.com/search/?q=1292416&amp;i=1292416" target="_blank">Close</a> icon by Fahmihorizon from the Noun Project.</li>
      <li><a href="https://thenounproject.com/search/?q=1292416&amp;i=1292416" target="_blank">Duplicate</a> icon by johartcamp from the Noun Project.</li>
    </ul>
  </div>
</template>
<script>
export default {
  created() {
    this.$gtag.event('About')
  }
}
</script>