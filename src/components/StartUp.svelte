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

<div>
  <input type="file" bind:files={file} on:change={readFile} />
</div>
