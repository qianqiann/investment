<template>
  <div>
    <span>{{ fundDetail.description }}</span>
    <div class="hr"></div>
    <div>
      <div v-for="(detail, index) in showData" :key="index">
        <div class="main">
          <div>{{ detail.label }}</div>
          <div>
            {{
              detail.specialHandling
                ? handleValue(detail)
                : fundDetail[detail.id]
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fundDetail: { required: true },
  },
  data: () => ({
    showData: [
      {
        id: 'fundType',
        label: 'Fund Type',
      },
      {
        id: 'category',
        label: 'Category',
      },
      {
        id: 'fundSize',
        label: 'Fund Size',
      },
      {
        id: 'baseCurrency',
        label: 'Base Currency',
      },
      {
        id: 'riskRating',
        label: 'Risk Rating',
      },
      {
        id: 'shariahCompliant',
        label: 'Shahriah Compliant',
      },
      {
        id: 'subscriptionStatus',
        label: 'Subscription Status',
      },
      {
        id: 'epf',
        label: 'EPF-MIS',
      },
      {
        id: 'launchDate',
        label: 'Launch Date',
        specialHandling: true,
      },
      {
        id: 'minimumInvestment',
        label: 'Minimum Initial Investment',
      },
      {
        id: 'minimumUnits',
        label: 'Minimum Initial Units',
      },
      {
        id: 'minimumAdditional',
        label: 'Minimum Additional Investment',
      },
    ],
  }),
  computed: {
    launchedDateFormat() {
      return this.fundDetail && this.fundDetail.launchDate
        ? new Date(this.fundDetail.launchDate * 1000).getUTCDate() +
            '-' +
            (new Date(this.fundDetail.launchDate * 1000).getUTCMonth() + 1) +
            '-' +
            new Date(this.fundDetail.launchDate * 1000).getUTCFullYear()
        : 'N/A';
    },
  },
  created() {},
  watch: {},
  methods: {
    handleValue(data) {
      if (this.fundDetail[data.id]) {
        if (data.id == 'launchDate') {
          let date = new Date(this.fundDetail[data.id] * 1000);
          return (
            date.getUTCDate() +
            '-' +
            (date.getUTCMonth() + 1) +
            '-' +
            date.getUTCFullYear()
          );
        }
      }
    },
  },
};
</script>
<style scoped>
.hr {
  border-top: 1px solid #d3d3d3;
}

.main {
  grid-template-columns: 50% 50%;
  display: grid;
  font-weight: 400;
  font-size: 16px;

  @media only screen and (min-width: 750px) {
    grid-template-columns: 25% 25% 25% 25%;
  }

  @media only screen and (min-width: 1000px) {
    grid-template-columns: 25% 25% 25% 25%;
  }
}

.second_main {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 15px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  display: flex;
  flex-direction: column;
  color: grey;
  text-align: end;
}

.answer {
  display: flex;
  flex-direction: column;
  color: black;
}
</style>
