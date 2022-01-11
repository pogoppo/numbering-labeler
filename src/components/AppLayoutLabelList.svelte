<script lang="ts">
  import { render_ } from "~/stores/render-options";

  import LabelItemList from "~/components/LabelItemList.svelte";
  import DownloadRenderButton from "~/components/DownloadRenderButton.svelte";
  import RestartButton from "~/components/RestartButton.svelte";
</script>

<div class="AppLayoutLabelList">
  <LabelItemList />
  <DownloadRenderButton renderElement={$render_.render} />
  <RestartButton />
</div>

<style lang="scss">
  .AppLayoutLabelList {
    overflow-y: auto;
    grid-area: list;
    background-color: rgba(0, 0, 0, 0.1);
    max-height: calc(50vh - 96px); // 96pxは目安 TODO: 非マジックナンバーにする
    @include responsive(laptop) {
      display: grid;
      grid-template-rows: 1fr auto auto;
      max-height: 100vh;
    }
  }
</style>
