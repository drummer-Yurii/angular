<template>
  <div class="my-layout profile">
    <section>
      <!-- CARD -->
      <div class="card my-form profile-form">
        <div class="info">Profile info</div>
        <hr/>
        <div class="info">Age</div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.age"
            class="form-control"
            type="number"
            aria-label="age"
            placeholder="age"
          />
        </div>
        <div class="info">Phone</div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.phone"
            class="form-control"
            type="number"
            aria-label="phone"
            placeholder="phone"
          />
        </div>
        <div class="info">Email</div>
        <div class="input-group mb-3">
          <input
            v-model="storeUser.user.email"
            class="form-control"
            type="text"
            aria-label="email"
            placeholder="email"
          />
        </div>
        <div class="info">Facebook</div>
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
      <!-- CARD -->
      <div class="card my-form img-form">
        <div class="info">Avatar</div>
        <hr/>
        <input type="file" id="fileToUpload" name="sampleFile" />
        <hr/>
        <button @click="upload" type="button" class="btn btn-primary">
          Upload
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from "vue";
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
  flex-wrap: wrap;
}

.my-form {
  width: 20rem;
  padding: 1rem;
  margin: 1rem .5rem;
}

  section {
    flex-direction: row;
  }
  .profile {
  }

  .profile-form {
    padding: 1rem;
    margin: 1rem;
    
  }
  
  .btn-primary {
    margin-top: 2px;
  }

  .panel {
    text-align: center;
  }
  #fileToUpload {
    /* padding-top: 1.5rem; */
  }


@media screen and (max-width: 1400px) {

}

@media screen and (max-width: 1200px) {

}

@media screen and (max-width: 992px) {

   
}

@media screen and (max-width: 700px) {
  section {
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 370px) {
  .my-form {
  width: 18rem;
  }
}
</style>
