<template>
  <div class="full-page">
    <b-container class="page-intro" style="padding-top: 44px">
      <b-row>
        <b-col sm="8" offset-sm="2" class="text-center">
          <h1 class="page-title page-title--small">
            {{ activePageData.pageTitle }}
          </h1>
          <br /><br />
        </b-col>
      </b-row>
    </b-container>

    <div class="main-page mt-5">
      <b-container class="main-page__container">
        <!-- <div class="text-center">
          <img src="/img/ad.png" alt="" />
        </div> -->
        <b-row>
          <b-col md="8" offset-md="2">
            <table class="list-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Browse</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="paper in activePageData.papers" :key="paper.name">
                  <td>
                    {{ paper.name }}
                  </td>
                  <td>
                    <router-link :to="paper.url"> Browse </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
          <!-- <b-col md="6">
            <list-card card-title="IGCSE" :items="igcseItems"> </list-card>
          </b-col>

          <b-col md="6">
            <list-card card-title="IAL" :items="ialItems" bgType="right">
            </list-card>
          </b-col> -->
        </b-row>

        <div class="text-end mt-4">
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Fshawonnotes&amp;width=450&amp;layout=standard&amp;action=like&amp;size=small&amp;share=false&amp;height=35&amp;appId"
            width="230"
            height="35"
            style="border: none; overflow: hidden"
            scrolling="no"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>
        </div>
      </b-container>

      <the-footer></the-footer>
    </div>
    <div class="page-bg page-bg--small"></div>
  </div>
</template>

<script>
import { pastPapers } from "../data/pastPapers";
// console.log(revPageData);

export default {
  data: () => ({
    pageData: pastPapers,
  }),
  computed: {
    activePageData() {
      let revType = this.$route.params.type || "igcse";
      return this.pageData[revType];
    },
  },
  methods: {},
};
</script>

<style>
.browse-button {
  color: #fff !important;
}

.subject-list img {
  cursor: pointer;
}

.subject-list__item {
  border-bottom: 1px solid #eee;
  padding: 11px 0;
  transition: all 0.25s;
}

.subject-list__item:hover {
  opacity: 0.8;
}

.subject-list__item:last-child {
  border-bottom: none;
}

.font-18 {
  font-size: 18px;
}
</style>
