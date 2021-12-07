<script lang="ts">
  import downloadjs from "downloadjs";
  import { toJpeg } from "html-to-image";

  export let renderElement: HTMLElement;

  const download = () => {
    if (!renderElement) {
      return;
    }
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

<div class="DownloadRender" on:click={download}>ダウンロード</div>

<style lang="scss">
  .DownloadRender {
    width: 100%;
    padding: 16px 24px;
    background-color: var(--color-orange);
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
</style>
