<template>
    <div>
        <ul class="pagination">
            <li @click="$emit('minus')" class="page-item">
                <a class="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <div class="pagination-center">
                <li @click="$emit('someEvent', index)" class="page-item" :class="i == index ? 'active' : ''"
                    v-for="index in props.amount" :key="'pag' + index"><a class="page-link">{{ index }}</a></li>
            </div>
            <li @click="$emit('plus')" class="page-item">
                <a class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { httpOptions, log } from "@/utils";
import { onMounted, onUnmounted, ref } from "vue";


const props = defineProps<{
    i: number;
    amount: number;
}>();

onMounted(async () => {
});

const setPage = (i) => {
    console.log(i)
    // $emit('setPage', i)
}
</script>
<style scoped>
.pagination-center {
    display: flex;
    overflow-x: auto;
}
.pagination {
    max-width: 100%;
    margin: auto;
    width: fit-content;
}
</style>