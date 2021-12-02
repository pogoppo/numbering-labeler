<script lang="ts">
  import { writable } from "svelte/store";

  import MainRender from "~/components/MainRender.svelte";

  let file: FileList;
  let imageDataURL: string;
  let imageWidth: number;
  let imageHeight: number;

  let listPos = "bottom";
  let listOverlay = false;
  let listColor = "#000000";
  let listAlpha = 100;
  let listFontColor = "#ffffff";
  let listFontSize = 16;

  let labelColor = "#000000";
  let labelAlpha = 100;
  let labelFontColor = "#ffffff";
  let labelFontSize = 24;

  const numberingItems = writable([]);

  const readFile = (event: any) => {
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        imageWidth = img.width;
        imageHeight = img.height;
        imageDataURL = reader.result as string;
      };
      img.src = reader.result as string;
    };
  };

  const toHEX = (n: number) =>
    Math.round(n * 2.55)
      .toString(16)
      .padStart(2, "0");

  function addNumberingItem(input: HTMLInputElement) {
    if (input.value === "") {
      return;
    }
    numberingItems.set([...$numberingItems, input.value]);
    input.value = "";
  }

  const removeNumberingItem = (index: number) => {
    $numberingItems.splice(index, 1);
    numberingItems.set([...$numberingItems]);
  };
</script>

<main>
  <div>
    <input type="file" bind:files={file} on:change={readFile} />
  </div>

  {#if imageDataURL}
    <div>
      <input type="color" bind:value={listColor} style="height:32px;" />
      <input type="range" bind:value={listAlpha} min="0" max="100" step="10" />
      <input type="color" bind:value={listFontColor} style="height:32px;" />
      <input
        type="range"
        bind:value={listFontSize}
        min="10"
        max="24"
        step="1"
      />
      <div>
        <span on:click={() => (listPos = "bottom")}>bottom</span>
        <span on:click={() => (listPos = "right")}>right</span>
        <span on:click={() => (listOverlay = !listOverlay)}>overlay</span>
      </div>
    </div>
    <div>
      <input type="color" bind:value={labelColor} style="height:32px;" />
      <input type="range" bind:value={labelAlpha} min="0" max="100" step="10" />
      <input type="color" bind:value={labelFontColor} style="height:32px;" />
      <input
        type="range"
        bind:value={labelFontSize}
        min="16"
        max="48"
        step="2"
      />
    </div>

    <ol>
      {#each $numberingItems as item, index}
        <li>
          <input type="text" bind:value={item} />
          <span on:click={() => removeNumberingItem(index)}>削除</span>
        </li>
      {/each}
      <li>
        <input
          type="text"
          placeholder="項目"
          on:blur={function () {
            addNumberingItem(this);
          }}
          on:keypress={function (event) {
            if (event.key == "Enter") {
              addNumberingItem(this);
            }
          }}
        />
      </li>
    </ol>

    <MainRender
      {imageDataURL}
      {listPos}
      {listOverlay}
      numberingItems={$numberingItems}
      --image-width={`${imageWidth}px`}
      --image-height={`${imageHeight}px`}
      --list-rgb={listColor}
      --list-rgba={listColor + toHEX(listAlpha)}
      --list-font-color={listFontColor}
      --list-font-size={`${listFontSize}px`}
      --label-rgb={labelColor}
      --label-rgba={labelColor + toHEX(labelAlpha)}
      --label-font-color={labelFontColor}
      --label-font-size={`${labelFontSize}px`}
    />
  {/if}
</main>

<style>
  main {
    padding: 1em;
  }
</style>
