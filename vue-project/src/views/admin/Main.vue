<template>
  <div class="profile">
    <button @click="goToNewPost" type="button" class="btn btn-primary">
      new post
    </button>
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
          <button @click="editApp" type="button" class="btn btn-primary">
            Save
          </button>
        </div>
      </div>
      <div class="my-form img-form">
        <input type="file" id="fileToUpload" name="sampleFile" />
        <button @click="uploadFile" type="button" class="btn btn-primary">
          send
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
    getAppData() {
      axios
        .get("http://localhost:3001/api/app-info", {
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
        })
        .then((answer) => {
          console.log(answer);
          this.storeApp.update(answer.data.result.info[0]);
        });
    },

    editApp() {
      axios
        .put("http://localhost:3001/api/app-info", this.storeApp.app, {
          headers: {
            "auth-token": localStorage.getItem("authToken"),
          },
        })
        .then((answer) => {
          console.log(answer);
          this.getAppData();
          // this.userData=answer.data.user
        });
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

  .profile {
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .profile-form {
    padding: 1rem;

  }

  .img-form {
    padding-top: 2.5rem;
  }

  .btn-primary {
    width: 4rem;
  }

  .panel {
    text-align: center;
  }

  #fileToUpload {
    padding-top: 1.5rem;
  }
}
</style>
