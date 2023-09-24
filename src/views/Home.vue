<template>
  <div class="main">

    <div class="main_fund">
      <div v-for="(fund, fundIndex) in fundList" :key="fundIndex" class="details">
        <div class="fund_first">
          {{ fund.fundName }}
          <div class="fund_group">
            <div v-for="(category, index) in fund.investmentType" :key="index">
              <div :style=getStyle(index) class="fund_category">
                {{ category }}
              </div>
            </div>
          </div>
        </div>
        <div class="hr"></div>
        <div class="fund_date">{{ `Updated Date: ${getDate(fund.date)}` }}</div>
        <div class="fund_second">
          <div>
            <div class="wording_date">
              <div class="fund_title">{{ 'YTD RETURN' }}</div>
            </div>
            <div class="fund_value">{{ fund.return ? fund.return + " %" : 'N/A' }}</div>
          </div>
          <div class="fund_right">
            <div class="wording_date">
              <div class="fund_title">{{ 'NAV Price' }}</div>
              <div class="fund_value">{{ getPrice(fund.currency, fund.currentNetAsset) }}
              </div>
              <div class="fund_perf">
                <img :src="fund.performance > 0 ? performanceIcon.increase : performanceIcon.decrease" />
                <span>{{ fund.performance + "%" }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="fund_third">
          <button type="button" @click="proceedAbout(fund.id)" class="fund_button btn btn-secondary">View
            Information</button>
          <button type="button" @click="showModal(fund)" class="fund_button btn btn-danger">Buy Fund</button>
        </div>
      </div>
      <div class="view_more">
        <button type="button" @click="getMore()" class="fund_button btn btn-outline-danger">View More Retail
          Funds</button>
      </div>
    </div>


    <!-- <div class="view_more">
      <button type="button" @click="getMore()" class="fund_button btn btn-outline-danger">View More Retail Funds</button>
    </div> -->
    <b-modal class="modal" v-model="buyModalDialog" :fundId="activeBuyModel" size="md">
      <BuyModal />
    </b-modal>
  </div>
</template>

<script>
import { getList } from '../service/rest.js'
import BuyModal from "../components/BuyModal.vue";
export default {
  components: { BuyModal },
  data: () => ({
    fundList: [],
    fund: {
      id: 1,
      fundName: 'Affin Islamic U.S. Equity',
      investmentType: ['BOND', 'MIXED-ASSETS'],
      date: 1695516511,
      currency: 'SGD',
      currentNetAsset: '0.52',
      return: 4.9,
      performance: 0.5
    },
    mappingCategory: [
      {
        color: 'rgba(148, 108, 0, 1)',
        background: 'rgba(255, 252, 212, 1)'
      },
      {
        background: 'rgba(224, 255, 229, 1)',
        color: 'rgba(14, 45, 19, 1)'
      },
      {
        background: 'rgba(240, 239, 254, 1)',
        color: 'rgba(79, 74, 167, 1)'
      }
    ],
    performanceIcon: {
      increase: 'https://aham.com.my/clients/asset_C0C09289-21F6-4E4F-BA45-A8A98943FE33/contentms/img/new/icons/icon-increase.png',
      decrease: 'https://aham.com.my/clients/asset_C0C09289-21F6-4E4F-BA45-A8A98943FE33/contentms/img/new/icons/icon-decrease.png'
    },
    buyModalDialog: false,
    currentPage: 1,
    activeBuyModel: null

  }),
  async mounted() {
    const resp = await getList(this.currentPage);
    if (resp.code == 200) {
      this.currentPage = resp.data.currentPage;
      this.fundList = resp.data.data;
    }
  },
  methods: {
    getStyle(index) {
      let usedIndex = index < this.mappingCategory.length - 1 ? index : 0
      var usedStyle = {
        backgroundColor: this.mappingCategory[usedIndex].background,
        color: this.mappingCategory[usedIndex].color,
      };
      return usedStyle
    },
    getDate(current) {
      if (current == null) {
        return 'N/A'
      }
      let date = new Date(current * 1000)
      return date.getUTCDate() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCFullYear()
    },
    getPrice(currency, value) {
      return `${currency} ${(Math.round(value * 100) / 100).toFixed(4)}`;
    },
    showModal(fund) {
      this.activeBuyModel = fund;
      this.buyModalDialog = !this.buyModalDialog
    },
    proceedAbout(id) {
      this.$router.push(`/about/${id}`)
    },
    async getMore() {
      const resp = await getList(this.currentPage + 1);
      if (resp.code == 200) {
        this.currentPage = resp.data.currentPage;
        resp.data.data.forEach(item => this.fundList.push(item))
      }
    }
  },
};
</script>

<style>
.main {
  margin: 5px;
  padding: 10px;

}

.main_fund {
  display: grid;
  grid-gap: 2%;
  grid-template-columns: auto;
  width: 100%;

  @media only screen and (min-width: 750px) {
    grid-template-columns: auto auto;
  }

  @media only screen and (min-width: 1000px) {
    grid-template-columns: auto auto auto;
  }
}

.wording_date {
  display: flex;
  flex-direction: column;
  gap: 5%;

}

.details {
  border: 2px solid #D3D3D3;
  padding: 5px;
}

.fund_first {
  font-size: 24px;
  font-weight: 500;
  padding: 5px;
}

.fund_group {
  font-size: 15px;
  display: flex;
  gap: 1%
}

.fund_category {
  padding: 5px;
  border-radius: 8px;
}

.hr {
  margin-top: 10px;
  border: 1px solid #D3D3D3;
}

.fund_right {
  padding: 5px;
  padding-left: 20px;
  border-left: 2px solid #D3D3D3;
}

.fund_second {
  padding: 5px;
  color: rgba(46, 47, 68, 1);
  font-size: 16px;
  font-weight: 300;
  display: grid;
  grid-template-columns: auto auto;
}

.fund_value {
  font-weight: bold;
  color: black;
  font-size: 20px;
}

.fund_perf {
  display: flex;
  gap: 2%;
  align-items: center;
  justify-items: center;
}

.fund_third {
  margin-top: 5px;
  display: flex;
  justify-content: end;
  gap: 1%;
}

.fund_button {
  align-self: flex-end;
}

.view_more {
  padding-top: 5%;
  padding-bottom: 5%;
  display: flex;
  justify-content: center;
  width: max-content;
  grid-column-end: -2;
  justify-self: center;
}

.fund_title {
  font-weight: 500;
  font-size: 18px;
}

.fund_date {
  font-weight: 400;
  font-size: 18px;
}


.modal-dialog.modal-md {
  width: 70%;
}
</style>
