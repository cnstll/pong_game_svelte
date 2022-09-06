<script lang="ts">
  import type { Ball } from "./game";
  export let ball: Ball;
</script>

<section
  style="width: {ball.size}px; height: {ball.size}px; top: {ball.y}px; left: {ball.x}px;"
  id="ball"
/>

<style>
  #ball {
    position: absolute;
    border: solid black 1px;
    background-color: greenyellow;
    border-radius: 50%;
  }
</style>
