<template>
  <div class="main">
    <div class="title">
      <span>{{ fundDetail.name }}</span>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="light">Information</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Information :fundDetail="fundDetail" />
          </b-card-body>
        </b-collapse>
      </b-card>

      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="light">Performance</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <Performance :fundDetail="fundDetail" />
          </b-card-body>
        </b-collapse>
      </b-card>

    </div>
  </div>
</template>

<script>
import Information from "../components/Information.vue";
import Performance from "../components/Performance.vue";
import { getDetail } from '../service/rest.js'
export default {
  components: { Information, Performance },
  data: () => ({
    fundDetail: {},
    buyModal: false
  }),
  async mounted() {
    if (!this.$route.params.id) {
      return;
    }
    const resp = await getDetail(this.$route.params.id);
    if (resp.code == 200) {
      this.fundDetail = resp.data;
    }
  },
};
</script>

<style scoped>
.main {
  padding: 10px;
}

.title {
  font-weight: bold;
  font-size: 24px;
  padding: 5px;
}

.accordion {
  padding: 5px;
  width: 95%;
}
</style>
