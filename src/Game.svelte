<script lang="ts">
  import Ball from "./Ball.svelte";
  import { GameController } from "./game";
  const game = new GameController();
  let frame = game.newGame();

  setInterval(() => {
    frame = game.nextFrame();
  }, 10);
</script>

<main style="width: {frame.width}px; height: {frame.height}px;" class="game" />
<Ball ball={frame.ball} />
<pre>
    {JSON.stringify(frame, null, 2)}
</pre>

<style>
  main {
    position: relative;
    border: solid black 1px;
    background-color: lightcoral;
  }

  pre {
    position: relative;
  }
</style>
