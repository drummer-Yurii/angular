<template>
  <div class="my-layout profile">
    <section>
      <div class="left-block">
        <!-- CARD -->
        <div class="card my-form background-img-form">
          <div class="info">Main Img</div>
          <hr />
          <input type="file" id="fileToUploadMainImg" name="sampleFile" />
          <hr />
          <button @click="uploadMainImg" type="button" class="btn btn-primary btn-bg-img">
            Upload
          </button>
        </div>
       
        <!-- CARD -->
        <div class="card my-form profile-form">
          <div class="info">Main info</div>
          <hr />
          <div class="info">Company name:</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.companyName" class="form-control" type="text" aria-label="company name"
              placeholder="company name" />
          </div>
          <div class="info">Phone</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.phone" class="form-control" type="number" aria-label="phone"
              placeholder="phone" />
          </div>
          <div class="info">Email</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.email" class="form-control" type="text" aria-label="email"
              placeholder="email" />
          </div>
          <div class="info">Country</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.country" class="form-control" type="text" aria-label="country"
              placeholder="country" />
          </div>
          <div class="info">City</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.city" class="form-control" type="text" aria-label="city" placeholder="city" />
          </div>
          <div class="info">Adress</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.adress" class="form-control" type="text" aria-label="adress"
              placeholder="adress" />
          </div>
          
          
        </div>
      </div>
      <div class="right-block">
        <!-- CARD -->
        <div class="card my-form img-form">
          <div class="info">Add post</div>
          <hr />
          <button @click="goToNewPost" type="button" class="btn btn-primary">
            new post
          </button>
        </div>

         <!-- CARD -->
         <div class="card my-form background-img-form">
          <div class="info">App logo</div>
          <hr />
          <input type="file" id="fileToUploadLogoImg" name="logo" />
          <hr />
          <button @click="uploadLogoImg" type="button" class="btn btn-primary btn-bg-img">
            Upload
          </button>
        </div>
        
        <!-- CARD -->
        <div class="card my-form">
          <div class="info">Social icons</div>
          <hr />
          <div class="info">Facebook</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.facebookPage" class="form-control" type="text" aria-label="facebookPage"
              placeholder="facebookPage" />
          </div>
          <div class="info">Instagram</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.instagram" class="form-control" type="text" placeholder="instagram" />
          </div>
          <div class="info">Tiktok</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.tiktok" class="form-control" type="text" placeholder="tiktok" />
          </div>
          <div class="info">Youtube</div>
          <div class="input-group mb-3">
            <input v-model="storeApp.app.youtube" class="form-control" type="text" placeholder="youtube" />
          </div>
        </div>
      </div>
      
    </section>
    <section>
      <div class="card my-form bottom-panel">
        <div class="panel">
            <button @click="storeApp.editApp" type="button" class="btn btn-primary">
              Save
            </button>
          </div>
      </div>
    </section>
    <hr>

  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { useAppStore } from "@/stores/app";
import { httpOptions, log, uploadFile } from "@/utils";

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
    uploadLogoImg() {
      this.storeApp.uploadLogoImg()
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
  flex-wrap: wrap;
}

.my-form {
  width: 20rem;
  padding: 1rem;
  margin: 1rem .5rem;
}
.bottom-panel{
  width: 100vw;
  max-width: 41rem;
  margin: 0;
}

  section {
    flex-direction: row;
  }

  .profile-form {
    padding: 1rem;
  }

  .btn-primary {
    width: 4rem;
    line-height: 1rem;
    margin-top: 2px;
  }

  .btn-bg-img {
    width: 6rem;
    line-height: 1rem;
    margin-top: 2px;
  }

  .panel {
    text-align: center;
  }

/* @media (max-width: 1024px) {
    .bottom-panel{
    width: 100vw;
    max-width: 20rem;
    margin: 0;
  }
} */

@media (max-width: 700px) {
    section {
    display: inline-block;
  }
  .bottom-panel{
    width: 100vw;
    max-width: 20rem;
    margin: 0;
  }
}

@media (max-width: 370px) {
  .card {
    width: 18rem;
  }
}
</style>
