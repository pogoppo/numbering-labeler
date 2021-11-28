<script lang="ts">
  import MainRender from "~/components/MainRender.svelte";

  let file;
  let imageDataURL;
  let imageWidth;
  let imageHeight;
  const readFile = (evt: any) => {
    const imageFile = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      imageDataURL = reader.result;
      const img = new Image();
      img.onload = () => {
        imageWidth = img.width;
        imageHeight = img.height;
        imageDataURL = imageDataURL;
      };
      img.src = imageDataURL;
    };
  };

  let pos = "bottom";
  let overlay = false;
  let color = "#000000";
  let alpha = 100;
  let listFontSize = 16;
  let labelFontSize = 24;
  const toHEX = (n) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");
</script>

<main>
  <div>
    <input type="file" bind:files={file} on:change={readFile} />
    <p on:click={() => (pos = "bottom")}>bottom</p>
    <p on:click={() => (pos = "right")}>right</p>
    <p on:click={() => (overlay = !overlay)}>overlay</p>
    <input type="color" bind:value={color} style="height:32px;" />
    <input type="range" bind:value={alpha} min="0" max="100" step="10" />
    <input type="range" bind:value={listFontSize} min="10" max="24" step="1" />
    <input type="range" bind:value={labelFontSize} min="10" max="48" step="2" />
  </div>

  {#if imageDataURL}
    <MainRender
      {imageDataURL}
      {pos}
      {overlay}
      --theme-rgb={color}
      --theme-rgba={color + toHEX(alpha)}
      --list-font-size={`${listFontSize}px`}
      --label-font-size={`${labelFontSize}px`}
      --image-width={`${imageWidth}px`}
      --image-height={`${imageHeight}px`}
    />
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
</style>
