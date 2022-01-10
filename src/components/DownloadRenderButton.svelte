<script lang="ts">
  import { tick } from "svelte";
  import { _ } from "svelte-i18n";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiDownload } from "@mdi/js";

  import { render_ } from "~/stores/render-options";

  import { downloadElementImage } from "~/utils/download-element-image";

  export let renderElement: HTMLElement;

  const download = async () => {
    if (!renderElement) {
      return;
    }

    const zoomSnapshot = $render_.zoom;
    $render_.zoom = 1;
    await tick();

    downloadElementImage(renderElement);

    $render_.zoom = zoomSnapshot;
    await tick();
  };
</script>

<button class="DownloadRender" on:click={download}>
  <SvgIcon type="mdi" path={mdiDownload} />
  {$_("image.download")}
</button>

<style lang="scss">
  .DownloadRender {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 48px;
    background-color: var(--color-orange);
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
