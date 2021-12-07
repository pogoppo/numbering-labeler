<script lang="ts">
  import { image } from "~/stores/render-options";
  let file: FileList;
  const readFile = (event: any) => {
    const reader = new FileReader();
    const imageFile = event.target.files[0];
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        $image.width = img.width;
        $image.height = img.height;
        $image.url = reader.result as string;
      };
      img.src = reader.result as string;
    };
  };
</script>

<div class="StartUp">
  <label class="StartUp__file-select-button">
    <input
      type="file"
      bind:files={file}
      on:change={readFile}
      style="display: none !important;"
    />
    画像を開く
  </label>
</div>

<style lang="scss">
  .StartUp {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 960px;
    max-width: 100%;
    margin: 16px auto;
    padding: 32px;
  }
  .StartUp__file-select-button {
    padding: 8px 24px;
    background-color: var(--color-blue);
    border-radius: 4px;
    cursor: pointer;
  }
</style>
