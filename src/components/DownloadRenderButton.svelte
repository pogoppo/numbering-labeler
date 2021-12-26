<script lang="ts">
  import downloadjs from "downloadjs";
  import { toJpeg } from "html-to-image";
  import { _ } from "svelte-i18n";
  import SvgIcon from "@jamescoyle/svelte-icon";
  import { mdiDownload } from "@mdi/js";

  import { render_ } from "~/stores/render-options";

  export let renderElement: HTMLElement;

  const download = () => {
    if (!renderElement) {
      return;
    }

    $render_.zoom = 1;

    const options = {
      width: renderElement.clientWidth,
      height: renderElement.clientHeight,
      style: { margin: "0" },
    };
    toJpeg(renderElement, options).then((dataUrl) => {
      downloadjs(dataUrl, "labeled-image.jpg");
    });
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
    background-color: var(--color-orange);
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
