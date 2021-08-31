<template>
  <div class="actor" :style="'transform:translate('+x*30+'px,'+y*30+'px)'">
    <meter :max ="maxHp" min="0" low="30" high="70" optimum="80" :value ="hp" ></meter>
  </div>
</template>

<script>
  export default {
    props: ['maxHp','hp',"x","y"],
  }
</script>

<style lang="scss">
  .actor{
    width: 50px;
	  height: 50px;
	  border-radius: 50%;
    background: skyblue;
    position: absolute;
    text-align: center;
    transition-duration: 0.8s;
    meter{
      width: 90%;
      transform: translate(0%,200%);
    }
  }
</style>