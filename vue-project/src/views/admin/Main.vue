<template>
  <div class="my-layout profile">
    <section>
      <div class="my-form profile-form">
        <div class="info">Company name: {{ storeApp.app.companyName }}</div>
        <div class="input-group mb-3">
          <input v-model="storeApp.app.companyName" class="form-control" type="text" aria-label="company name"
            placeholder="company name" />
        </div>
        <div class="input-group mb-3">
          <input v-model="storeApp.app.phone" class="form-control" type="number" aria-label="phone"
            placeholder="phone" />
        </div>
        <div class="input-group mb-3">
          <input v-model="storeApp.app.email" class="form-control" type="text" aria-label="email" placeholder="email" />
        </div>
        <div class="input-group mb-3">
          <input v-model="storeApp.app.facebookPage" class="form-control" type="text" aria-label="facebookPage"
            placeholder="facebookPage" />
        </div>
        <div class="panel">
          <button @click="storeApp.editApp" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
      <div class="my-form img-form">
        <input type="file" id="fileToUpload" name="sampleFile" />
        <button @click="uploadFile" type="button" class="btn btn-primary">
          send
        </button>
        <hr/>
        <button @click="goToNewPost" type="button" class="btn btn-primary">
          new post
        </button>
      </div>
    </section>
    <hr>
    <section>
      <div class="my-form img-form">
        <input type="file" id="fileToUploadMainImg" name="sampleFile" />
        <button @click="uploadMainImg" type="button" class="btn btn-primary">
          Upload
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";
import { httpOptions, log, uploadFile} from "@/utils";

export default {
  setup() {
    const storeUser = useUserStore();
    const storeApp = useAppStore();
    return {
      storeUser,
      storeApp,
    };
  },
  data() {
    return {
      // userData: {},
      // appData: {}
    };
  },
  created() {
    this.getAppData();
  },
  methods: {
    uploadMainImg() {
     uploadFile('fileToUploadMainImg', `/app/`, 'app-img')
    },
    getAppData() {
      this.storeApp.init()
    },
    uploadFile() {
      const target = document.getElementById("fileToUpload");
      if (target.files.length == 0)
        return alert("file not selected! please chois avatar");
      const file = target.files[0];
      var fd = new FormData();
      fd.append("sampleFile");
      fd.append("directory", "/testpost");
      fd.append("basename", "wobble-004.txt");

      var oReq = new XMLHttpRequest();
      oReq.open(
        "POST",
        `http://localhost:3001/upload?pathForUploading=/users/${this.userData.username}/&fileName=avatar`,
        true
      );
      // oReq.onreadystatechange = alert(status);
      // console.log(alert(status));
      // oReq.send(fd);
      axios
        .post(
          `http://localhost:3001/upload?pathForUploading=/users/${this.userData.username}/&fileName=avatar`,
          fd,
          {}
        )
        .then((response) => {
          console.log(response);
          location.reload();
        });
    },
    goToNewPost() {
      this.$router.push("/admin/post/new");
    },
  },
};
</script>

<style scoped>
@import '@/assets/base.css';

section {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  section {
    flex-direction: row;
  }

  .profile {}

  .profile-form {
    padding: 1rem;

  }

  .img-form {
    padding-top: 2.5rem;
  }

  .btn-primary {
    width: 4rem;
    line-height: 1rem;
    margin-top: 2px;
  }

  .panel {
    text-align: center;
  }

  #fileToUpload {
    padding-top: 1.5rem;
  }
}
</style>
