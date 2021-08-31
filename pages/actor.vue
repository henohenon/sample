<template>
  <div class="actor">
    <meter :max ="maxHp" min="0" low="30" high="70" optimum="80" :value ="hp"></meter>
  </div>
</template>

<script>
  export default {
    props: ['maxHp','hp']
  }
</script>