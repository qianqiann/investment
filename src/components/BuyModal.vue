<template>
    <div class="main">
        <div class="category">
            <div class="form"> </div>
            <div class="info">
                <div>
                    {{ `${info.min}` }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getBuyInfo } from '../service/rest.js'
export default {
    props: {
        activeBuyModel: { required: true, default: null }
    },
    data: () => ({
        info: {}
    }),
    async mounted() {
        if (this.activeBuyModel) {
            const resp = await getBuyInfo(this.fundDetail.id);
            if (resp.code == 200) {
                this.info = resp.data;
            }
        } else {

        }
    }
}
</script>

<style scoped>
.main {
    padding: 5px;
}

.category {
    display: grid;
    grid-template-columns: auto auto;
}

.info {
    border: 1px solid grey;
    padding: 5px;
}
</style>
