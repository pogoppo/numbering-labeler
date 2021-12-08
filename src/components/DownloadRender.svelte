<script lang="ts">
  import downloadjs from "downloadjs";
  import { toJpeg } from "html-to-image";
  import { _ } from "svelte-i18n";

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

<button class="DownloadRender" on:click={download} disabled={true}>
  {$_("image.download")}
</button>

<style lang="scss">
  .DownloadRender {
    width: 100%;
    padding: 16px 24px;
    background-color: var(--color-orange);
    color: #fff;
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
