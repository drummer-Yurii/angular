<template>
  <div class="my-layout post-page">

    <!-- POST FORM -->
    <div class="my-form post-form">

      <!-- if err -->
      <div v-if="!storePost">No Post</div>

      <!-- if ok -->
      <div v-if="storePost.post">
        <img :src="storePost.post.img" type="img">
      </div>

      <!-- title -->
      <div class="input-group mb-1">
        <input v-model="storePost.post.title" class="form-control" type="text" aria-label="title" placeholder="title" />
      </div>

      <!-- description -->
      <div class="input-group">
        <textarea v-model="storePost.post.description" class="form-control" aria-label="With textarea"></textarea>
      </div>

      <!-- BLOCKS -->
      <div class="blocks">
        <div v-for="(block, index) in storePost.post.blocks" :key="'post' + index">
          <hr>

          <!-- BLOCK Galery -->
          <div v-if="block.type == 'galery'" class="block block-galery">
            <div class="block-panel">
              <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
            </div>
            <!-- <img :src="block.filePath" type="img"> -->
            <div class="block-panel-bottom">
              <input type="file" class="block-file-to-upload" :name="block.fileId" />
            </div>
            <Galery :filePath="block.filePath" />
          </div>

          <!-- BLOCK Text -->
          <div v-if="block.type == 'text'" class="block block-text">
            <textarea v-model="block.text" class="form-control" aria-label="With textarea">
            </textarea>
            <div class="block-panel">
              <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
            </div>
          </div>

          <!-- BLOCK Video -->
          <div v-if="block.type == 'video'" class="block block-video">
            <div class="block-panel">
              <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
            </div>
            <video v-if="showAssetInBlock(index)" controls :src="block.filePath" type="video/mp4">
            </video>
            <div class="block-panel-bottom">
              <input @change="changeFile" type="file" class="block-file-to-upload" :name="block.fileId" />
            </div>
          </div>

          <!-- BLOCK Audio -->
          <div v-if="block.type == 'audio'" class="block block-audio">
            <div class="block-panel">
              <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
            </div>
            <audio v-if="showAssetInBlock(index)" controls :src="block.filePath" type="audio"></audio>
            <div class="block-panel-bottom">
              <input @change="changeFile" type="file" class="block-file-to-upload" :name="block.fileId" />
            </div>
          </div>

          <!-- BLOCK Img-->
          <div v-if="block.type == 'img'" class="block block-img">
            <div class="block-panel">
              <button @click="deleteBlock(index)" type="button" class="btn btn-info">Delete</button>
            </div>
            <img v-if="showAssetInBlock(index)" :src="block.filePath" type="img">
            <div class="block-panel-bottom">
              <input @change="changeFile" type="file" class="block-file-to-upload" :name="block.fileId" />
            </div>
          </div>
          <div v-if="!block.type" class="block block-text">block without type!!!</div>
        </div>
      </div>

      <!-- PREWIEW -->
      <div class="preview" v-if="storePost.loadingBlocks.length > 0">
        *** {{carentChooseFile}}
        <img v-if="carentChooseFileType == 'img'" :src="carentChooseFile" type="img">
        <video v-if="carentChooseFileType == 'video'" controls :src="carentChooseFile" type="video/mp4">
        </video>
        <audio controls v-if="carentChooseFileType == 'audio'" :src="carentChooseFile" type="audio"></audio>
      </div>
      <hr />

      <!-- PANEL -->
      <div v-if="!addButtonsPanel" class="panel">
        <button @click="toggleButtonsPanel" type="button" class="btn btn-info">Add block</button>
      </div>

      <!-- PANEL -->
      <div v-if="addButtonsPanel" class="panel add-buttons">
        <button @click="addTextBlock" type="button" class="btn btn-info">Text</button>
        <button @click="addVideoBlock" type="button" class="btn btn-info">Video</button>
        <button @click="addAudioBlock" type="button" class="btn btn-info">Audio</button>
        <button @click="addImgBlock" type="button" class="btn btn-info">Img</button>
        <button @click="addGaleryBlock" type="button" class="btn btn-info">Galery</button>
      </div>
      <hr />

      <!-- PANEL -->
      <div class="panel">
        <button @click="storePost.submit(getId())" type="button" class="btn btn-primary">
          save
        </button>
      </div>

    </div>

    <!-- !!! need some wrapper  -->
    <input type="file" id="fileToUpload" name="sampleFile" />

  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/post";
import { useRoute } from "vue-router";
import { httpOptions, log } from "@/utils";
import { randomString } from "high-level";
import Galery from "@/components/Galery.vue";

export default {
  components: {
    Galery,
  },
  data() {
    return {
      addButtonsPanel: false,
      carentChooseFile: null,
      carentChooseFileType: null,
    };
  },
  setup() {
    const storePost = usePostStore();
    const storeUser = useUserStore();
    const route = useRoute();
    return {
      storePost,
      storeUser,
      route,
    };
  },
  async created() {
    if (this.getId() !== 'new') {
      await this.storePost.getPost(this.getId());
      await this.storePost.setFileNamesToStorePost();
    }

  },
  methods: {
    getId() {
      const id = this.route.params.id;
      return id
    },
    toggleButtonsPanel() {
      this.addButtonsPanel = true
    },
    addTextBlock() {
      const newBlock = {
        type: 'text',
        text: '',
      };
      this.storePost.post.blocks.push(newBlock)
      console.log(this.storePost.post)
    },
    addVideoBlock() {
      this.carentChooseFileType = 'video'
      const newBlock = {
        type: 'video',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
      this.storePost.loadingBlocks.push(this.storePost.post.blocks.length-1)
    },
    addAudioBlock() {
      this.carentChooseFileType = 'audio'
      const newBlock = {
        type: 'audio',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
      this.storePost.loadingBlocks.push(this.storePost.post.blocks.length-1)
    },
    addImgBlock() {
      this.carentChooseFileType = 'img'
      const newBlock = {
        type: 'img',
        fileId: randomString(1),
      };
      this.storePost.post.blocks.push(newBlock)
      this.storePost.loadingBlocks.push(this.storePost.post.blocks.length-1)
      log('loadingBlocks', this.loadingBlocks)
    },
    addGaleryBlock() {
      const fileId = randomString(1)
      const newBlock = {
        type: 'galery',
        fileId,
        fileIdList: [fileId]
      };
      this.storePost.post.blocks.push(newBlock)
    },
    changeFile(e) {
      console.log(e, '!!!!!!!!')
      const file = e.target.files[0];
      this.carentChooseFile = URL.createObjectURL(file);
    },
    deleteBlock(i) {
      log(i);
      this.storePost.post.blocks.splice(i, 1);
      this.storePost.submit(this.getId());
    },
    showAssetInBlock(index) {
    return !this.storePost.loadingBlocks.some(blockIndex => blockIndex == index);
    },
  },
};
</script>

<style scoped>
@import '@/assets/base.css';

img {
  width: 100%;
}

video {
  width: 100%;
}

.block {
  position: relative;
}

.block-panel {
  position: absolute;
  top: -.5rem;
  right: -1rem;
  opacity: .5;
  z-index: 999;
}

.block-panel-bottom {
  padding: .5rem;
}
.preview {
  border: solid 2px red;
}

@media (min-width: 1024px) {
  .post-page {}

  .post-form {
    padding: 1rem;
  }

  .panel {
    text-align: center;
  }

  .panel button {
    margin: 0 .2rem;
  }

  .block-text {
    background: black;
  }

  .block-video video {
    width: 100%;
  }

  .block-img img {
    width: 100%;
  }
}
</style>
