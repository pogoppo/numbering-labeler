<script lang="ts">
  import labelList from "~/stores/label-list";

  import RenderOptionControl from "~/components/RenderOptionControls.svelte";
</script>

<div
  class="AppLayoutRenderControls"
  class:AppLayoutRenderControls--disabled={!!!$labelList.length}
>
  <RenderOptionControl />
</div>

<style lang="scss">
  .AppLayoutRenderControls {
    grid-area: control;
    overflow-y: auto;
    max-height: 100vh;
    background-color: rgba(0, 0, 0, 0.1);
    &--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }
</style>
