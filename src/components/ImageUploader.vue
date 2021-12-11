<template>
  <div id="uploader">
    <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
        allow-multiple="true"
        instantUpload = "false"
        allowImageCrop = "true"
        allowProcess = "false"
        accepted-file-types="image/jpeg, image/png"
        v-bind:files="myFiles"
        imagePreviewMaxHeight = "400"
        imageCropAspectRatio = "1:1"
        allowImageResize = true
        allowImagePreview = true
        allowImageEdit = true
        allowImageTransform=true
        imageResizeTargetWidth = "400"
        imageResizeTargetHeight = "400"
        imageResizeMode = "contain"
        imageResizeUpscale = "false"
    />
    <!-- <div class="buttonContainer">
		<button class="btn btn-dark" id="btn-img" @click="postImage">Upload</button>
	</div> -->
  </div>
</template>

<script>
  import ipfs from "../services/ipfs"
  // Import Vue FilePond
  import vueFilePond from 'vue-filepond'

  // Import FilePond styles
  import 'filepond/dist/filepond.min.css'

  // Import FilePond plugins
  // Please note that you need to install these plugins separately

  // Import image preview plugin styles
  import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

  // Import image preview and file type validation plugins
  import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
  import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
  import FilePondPluginFileEncode from "filepond-plugin-file-encode";
  import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
  import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
  import FilePondPluginImageResize from 'filepond-plugin-image-resize';
  import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
  import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

  // Create component
  const FilePond = vueFilePond(
          FilePondPluginFileValidateType,
          FilePondPluginImagePreview,
          FilePondPluginFileEncode,
          FilePondPluginImageCrop,
          FilePondPluginImageValidateSize,
          FilePondPluginImageResize,
          FilePondPluginImageTransform,
          FilePondPluginImageEdit,

  )
  export default {
    name: 'FilePondDemo',
    data: function() {
      return { myFiles: [] }
    },
    components: {
      FilePond
    },
    methods:{
        async postImage(){
            const file = this.getFiles();
			if (!file) return -1;
            // Dodaje sliku na IPFS te se dobiva response u kojemu se nalazi CID
            const ipfsResponse = await ipfs.add(file.getFileEncodeDataURL()).catch(err => {
                console.log("Error: ",err);
            });
        },
        getFiles(){
          return this.$refs.pond.getFiles()[0];
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#btn-img{
  border-style: solid;
  border-width: 2px;
  color: whitesmoke;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
