<template>
    <div class="about">
        <div class="about-room">
            <Room3d />
        </div>
        <div class="header-about">
            <h1>About us</h1>
            <div class="header-info">
                <p>{{storeApp.app.pages.about.firstText}}</p>
                <textarea v-if="isEditMode" v-model="storeApp.app.pages.about.firstText"></textarea>
            </div>

        </div>

        <main class="main">
            <div class="container">

                <!-- article test -->
                <article v-for="(article, index) in storeApp.app.pages.about.articles" :key="'article' + index"
                    class="article">
                    <div class="article-text" :data-number="`0${index + 1}`">
                        <div v-if="!isEditMode" class="article-subtitle">{{ article.subtitle }}</div>
                        <input class="article-input-subtitle" v-if="isEditMode"
                            v-model="storeApp.app.pages.about.articles[index].subtitle" type="text">
                        <h2 v-if="!isEditMode" class="article-title">{{ article.title }}</h2>
                        <input class="article-input-title" v-if="isEditMode"
                            v-model="storeApp.app.pages.about.articles[index].title" type="text">
                        <p v-if="!isEditMode">{{ article.p }}</p>
                        <textarea class="article-textarea-p" v-if="isEditMode"
                            v-model="storeApp.app.pages.about.articles[index].p" type="text"></textarea>
                        <a href="#" class="article-read-more">read more</a>
                    </div>
                    <div class="article-img-wrapper">
                        <img class="article-img" v-if="!reload[index] && !reloadAll"
                            :src="storeApp.serverUrl +'/about-page/' + article.fileName" @error="imgError(index)"
                            @load="imgOnload(index)">
                        <input @change="fileChange($event, index)" class="file-to-upload" v-if="isEditMode" type="file"
                            :name="article.fileId">
                        <button v-if="storeUser.isAdmin" class="delete-btn" @click.stop="dellArticle(index)">delete article</button>
                    </div>
                </article>
                <!-- //article test -->
                <div class="panel" v-if="storeUser.isAdmin">
                    <button @click.stop="addArticle()">Add article</button>
                    <button v-if="isEditMode" @click="save()">Save</button>
                    <button v-if="!isEditMode" @click="isEditMode = true">Edit</button>
                    <!-- <button @click.stop="upload()">Upload Files</button> -->
                </div>
            </div>
        </main>

        <Footer class="footer"/>

    </div>
</template>
<script>
import Room3d from "@/components/Room3d.vue";
import Footer from "@/components/Footer.vue";
import { useAppStore } from "@/stores/app";
import { randomString } from "high-level";
import { httpOptions, pause, sliceIntoChunks } from "@/utils";
import { useUserStore} from "@/stores/user";

export default {
    components: {
        Room3d,
        Footer,
    },
    setup() {
        const storeApp = useAppStore();
        const storeUser = useUserStore();
        return {
            storeApp,
            storeUser,
        };
    },

    async created() {
        await this.storeApp.init()
    },

    data() {
        return {
            isEditMode: false,
            reload: [],
            reloadAll: false,
        }
    },

    methods: {
        async imgError(index) {
            this.reload[index] = true
            await pause(500)
            this.reload[index] = false
            console.log('imgError', index)
        },
        imgOnload(index) {
            console.log('imgOnload', index)
        },
        addArticle() {
            const newArticle = {
                fileId: randomString(1),
            }
            if (!this.storeApp.pages) this.storeApp.pages = {}
            if (!this.storeApp.pages.about) this.storeApp.pages.about = {}
            if (!this.storeApp.pages.about.articles) this.storeApp.pages.about.articles = []
            this.storeApp.app.pages.about.articles.push(newArticle);
        },
        dellArticle(i) {
            this.storeApp.app.pages.about.articles.splice(i, 1);
            this.storeApp.editApp()
        },
        async save() {
            await this.storeApp.editApp()
            await this.upload()
            const images = document.querySelectorAll('.article-img')
            console.log(images)
            this.isEditMode = false
            this.reloadAll = true
            await pause(500)
            this.reloadAll = false

        },
        async upload() {
            await this.storeApp.uploadFilesAboutPage()
            console.log('end upload')
        },
        fileChange($event, index) {
            const ecstention = $event.target.files[0].name.split('.')[1]
            const fileId = this.storeApp.app.pages.about.articles[index].fileId
            this.storeApp.app.pages.about.articles[index].fileName = fileId + '.' + ecstention
            console.log($event.target.files[0].name, index)
        },
    },

}

</script>
<style scoped>
* {
    box-sizing: border-box;
}

.about {
    overflow: hidden;
    z-index: 0;
    background: #0B1D26;
}

.about-room {
    z-index: 9;
}

.panel {
    position: relative;
}

.main {
    z-index: 99;
}

.footer {
    position: relative;
    z-index: 999;
}

/* Header */
.header-about {
    position: relative;
    height: 30rem;

    padding-bottom: 3rem;
    z-index: 1;
}

h1 {
    color: white;
    padding-left: 3rem;
    padding-top: 4rem;
    margin: 0;
}

.header-info {
    position: absolute;
    margin-top: 3rem;
    height: 20rem;
    width: 25rem;
    left: 2rem;
    /* background: #0B1D26; */
}

.header-info p {
    margin: 1rem;
    color: white;
}

/* //Header */

/* ARTICLE */
.container {
    max-width: 1492px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
    /* background-color: #0B1D26; */
}

.row {
    display: flex;
}

.space-between {
    justify-content: space-between;
}

.align-center {
    align-items: center;
}

.article {
    position: relative;
    margin-bottom: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.article:nth-child(even) {
    flex-direction: row-reverse;
}

.article-text {
    position: relative;
    padding-left: 150px;
    max-width: 782px;
    margin-right: 20px;
}

.article-text::before {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-50%);
    display: block;
    content: attr(data-number);
    width: 240px;
    height: 240px;
    font-style: normal;
    font-weight: 700;
    font-size: 240px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.1);
}

.article-subtitle {
    margin-bottom: 32px;
    position: relative;
    padding-left: 96px;
    font-weight: 800;
    font-size: 18px;
    line-height: 1.222;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: #FBD784;
}

.article-subtitle::before {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: "";
    width: 72px;
    height: 2px;
    background-color: #FBD784;
}

.article-title {
    margin-bottom: 27px;
    max-width: 555px;
    font-family: 'Playfair Display', serif;
    font-style: normal;
    font-weight: 500;
    font-size: 64px;
    line-height: 1.2;
    color: #FFFFFF;
}

.article-text p {
    margin-bottom: 27px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.78;
    color: #FFFFFF;
}


.article-read-more {
    display: inline-block;
    position: relative;
    padding-right: 40px;
    font-weight: 700;
    font-size: 18px;
    line-height: 1.222;
    color: #FBD784;
    text-decoration: none;
}

.article-read-more::after {
    display: block;
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 16px;
    background-image: url('./../img/icons/arrow-right.svg');
}

.article-img-wrapper {
    position: relative;
    width: 600px;
    min-height: 3rem;
}

.article-img {
    display: block;
    width: 100%;
    /* height: 400px; */
}

.delete-btn {
    position: absolute;
}

.header-info textarea {
    width: 500px;
    height: 200px;
}

.header-info p {
    /* width: 40%; */
}

/* Input */
</style>