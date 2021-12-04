<script lang="ts">
  import downloadjs from "downloadjs";
  import { toJpeg } from "html-to-image";

  export let renderElement: HTMLElement;

  const download = () => {
    if (!renderElement) {
      return;
    }
    const width = renderElement.clientWidth;
    const height = renderElement.clientHeight;
    toJpeg(renderElement, { width, height }).then((dataUrl) => {
      downloadjs(dataUrl, "labeled-image.jpg");
    });
  };
</script>

<div>
  <span on:click={download}>ダウンロード</span>
</div>
