<template>
    <div class="about">
        <div class="about-room">
            <Room3d />
        </div>
        <div class="header-about">
            <h1>About us</h1>
            <div class="header-info">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non repellendus provident, veniam deserunt
                    nam porro
                    dicta necessitatibus accusantium! At voluptas fugit ex deleniti neque temporibus magni dolore aut
                    vel vero.
                </p>
            </div>
            
        </div>

        <main class="main">
            <div class="container">

                <!-- article test -->
                <article v-for="(article, index) in storeApp.app.pages.about.articles" :key="'article'+index" class="article">
                    <div class="article-text" data-number="01">
                        <div class="article-subtitle">GEt Started</div>
                        <h2 class="article-title">What level of hiker are you?</h2>
                        <p>Determining what level of hiker you are can be an important tool when planning future hikes.
                            This hiking level guide will help you plan hikes according to different hike ratings set by
                            various websites like All Trails and Modern Hiker. What type of hiker are you – novice,
                            moderate, advanced moderate, expert, or expert backpacker?</p>
                        <a href="#" class="article-read-more">read more</a>
                    </div>
                    <div class="article-img">
                        <img src="./../assets/2.png">
                    </div>
                </article>
                <div class="panel">
                    <button @click.stop="addArticle()">Add article</button>
                    <button @click.stop="dellArticle(index)">delete article</button>
                </div>
                <!-- //article test -->

                <article class="article">
                    <div class="article-text" data-number="01">
                        <div class="article-subtitle">GEt Started</div>
                        <h2 class="article-title">What level of hiker are you?</h2>
                        <p>Determining what level of hiker you are can be an important tool when planning future hikes.
                            This hiking level guide will help you plan hikes according to different hike ratings set by
                            various websites like All Trails and Modern Hiker. What type of hiker are you – novice,
                            moderate, advanced moderate, expert, or expert backpacker?</p>
                        <a href="#" class="article-read-more">read more</a>
                    </div>
                    <div class="article-img">
                        <img src="./../assets/2.png">
                    </div>
                </article>
                

                <article class="article">
                    <div class="article-text" data-number="02">
                        <div class="article-subtitle">Hiking Essentials</div>
                        <h2 class="article-title">Picking the right Hiking Gear!</h2>
                        <p>The nice thing about beginning hiking is that you don’t really need any special gear, you can
                            probably get away with things you already have.
                            Let’s start with clothing. A typical mistake hiking beginners make is wearing jeans and
                            regular clothes, which will get heavy and chafe wif they get sweaty or wet.</p>
                        <a href="#" class="article-read-more">read more</a>
                    </div>
                    <div class="article-img">
                        <img src="./../assets/3.jpg">
                    </div>
                </article>

                <article class="article">
                    <div class="article-text" data-number="03">
                        <div class="article-subtitle">where you go is the key</div>
                        <h2 class="article-title">Understand Your Map & Timing</h2>
                        <p>To start, print out the hiking guide and map. If it’s raining, throw them in a Zip-Lock bag.
                            Read over the guide, study the map, and have a good idea of what to expect. I like to know
                            what my next landmark is as I hike. For example, I’ll read the guide and know that say, in a
                            mile, I make a right turn at the junction..</p>
                        <a href="#" class="article-read-more">read more</a>
                    </div>
                    <div class="article-img">
                        <img src="./../assets/1.webp">
                    </div>
                </article>

            </div>
        </main>
    
        <Footer />

    </div>
</template>
<script>
import Room3d from "@/components/Room3d.vue"
import Footer from "@/components/Footer.vue"
import { useAppStore } from "@/stores/app";

export default {
    components: {
        Room3d,
        Footer,
    },
     setup() {
        const storeApp = useAppStore();
        return {
            storeApp,
        };
    },

    methods: {
        addArticle() {
            const newArticle = {}
            if(!this.storeApp.pages) this.storeApp.pages={}
            if(!this.storeApp.pages.about) this.storeApp.pages.about={}
            if(!this.storeApp.pages.about.articles) this.storeApp.pages.about.articles=[]
            this.storeApp.app.pages.about.articles.push(newArticle);
        },
        dellArticle(i) {
            this.storeApp.app.pages.about.articles.splice(i, 1);
        }
    },
}

</script>
<style scoped>
* {
    box-sizing: border-box;
}

.about {
    position: relative;
    overflow: hidden;
    z-index: 0;
    background: #0B1D26;
}

.about-room {
    z-index: 9;
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

.article-img img {
    display: block;
    width: 600px;
    height: 400px;
}

</style>