<template>
    <ul>
        <li>
            !!!{{filePath}}
            <img :src="filePath"
                alt="!!!!" loading="lazy">
        </li>
        <li>
            <img src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05621_zgtcco.jpg"
                alt="Interesting living room light through a window" loading="lazy">
        </li>
        <li>
            <img src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05513_gfbiwi.jpg"
                alt="Sara on a red bike" loading="lazy">
        </li>
        <li>
            <img src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05588_nb0dma.jpg"
                alt="XOXO venue in between talks" loading="lazy">
        </li>
        <li>
            <img src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05459_ziuomy.jpg"
                alt="Trees lit by green light during dusk" loading="lazy">
        </li>
        <li>
            <img src="https://res.cloudinary.com/css-tricks/image/upload/f_auto,q_auto/v1568814785/photostream-photos/DSC05586_oj8jfo.jpg"
                alt="Portrait of Justin Pervorse" loading="lazy">
        </li>
        
        <!--  Adding an empty <li> here so the final photo doesn't stretch like crazy. Try removing it and see what happens!  -->
        <li></li>
    </ul>
</template>
<script>

export default {
     props: {
    filePath: String,
  },
}
</script >
<style scoped>
/* // BASIC */

ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

li {
    height: 40vh;
    flex-grow: 1;
}

li:last-child {
    /* // There's no science in using "10" here. In all my testing, this delivered the best results. */
    flex-grow: 10;
}

img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
}

/* // ADVANCED */

/* // Portrait */

@media (max-aspect-ratio: 1/1) {
    li {
        height: 30vh;
    }
}

/* // Short screens */

@media (max-height: 480px) {
    li {
        height: 80vh;
    }
}

/* // Smaller screens in portrait */

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    ul {
        flex-direction: row;
    }

    li {
        height: auto;
        width: 100%;
    }

    img {
        width: 100%;
        max-height: 75vh;
        min-width: 0;
    }
}
</style>