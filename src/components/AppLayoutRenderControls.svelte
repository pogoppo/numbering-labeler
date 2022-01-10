<script lang="ts">
  import RenderControls from "~/components/RenderControls.svelte";
</script>

<div class="AppLayoutRenderControls">
  <RenderControls />
</div>

<style lang="scss">
  .AppLayoutRenderControls {
    grid-area: control;
    overflow-y: auto;
    max-height: 45vh;
    background-color: rgba(0, 0, 0, 0.1);
    @include responsive(laptop) {
      max-height: 100vh;
    }
  }
</style>
