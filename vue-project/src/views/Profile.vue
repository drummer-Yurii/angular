<template>
  <div class="my-layout profile">
    <section>
      <div class="my-form profile-form">
        <div class="info">Username: {{ storeUser.user.username }}</div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.age"
            class="form-control"
            type="number"
            aria-label="age"
            placeholder="age"
          />
        </div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.phone"
            class="form-control"
            type="number"
            aria-label="phone"
            placeholder="phone"
          />
        </div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.email"
            class="form-control"
            type="text"
            aria-label="email"
            placeholder="email"
          />
        </div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.facebookPage"
            class="form-control"
            type="text"
            aria-label="facebookPage"
            placeholder="facebookPage"
          />
        </div>
        <div class="panel">
          <button
            @click="storeUser.editProfile"
            type="button"
            class="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
      <div class="my-form img-form">
        <input type="file" id="fileToUpload" name="sampleFile" />
        <button @click="upload" type="button" class="btn btn-primary">
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
import { httpOptions, log, uploadFile} from "@/utils";

export default {
  setup() {
    const storeUser = useUserStore();
    return {
      storeUser,
    };
  },
  created() {
    this.storeUser.getUserData();
  },
  methods: {
    upload() {
     uploadFile('fileToUpload', `/users/${this.storeUser.user.username}/`, 'avatar')
    }
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
  }

  .profile-form {
    padding: 1rem;
    
  }
  .img-form {
    padding: 1rem;
    
  }
  .btn-primary {
    width: 4rem;
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
