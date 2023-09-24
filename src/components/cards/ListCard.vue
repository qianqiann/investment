<template>
  <div class="list-card" :class="{ 'list-card--bg-right': bgType === 'right' }">
    <div class="list-card__title">
      {{ cardTitle }}
    </div>
    <div class="list-card__items" v-for="item in items" :key="item.name">
      <b-link class="list-card__item" to="/revision-notes/igsce">
        {{ item.name }}
      </b-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgType: { default: "left" },
    cardTitle: { default: "" },
    items: { type: Array, default: () => [] },
  },
};
</script>

<style scoped>
.list-card {
  max-width: 400px;
  background-image: url(/img/page-bg.jpg);
  background-size: 250%;
  background-position: left;
  border: 1px solid #ababab;
  border-radius: 7px;
  font-size: 24px;
  max-width: 400px;
  margin: 0 auto;
}

.list-card--bg-right {
  background-position: right;
}

.list-card__title {
  border-bottom: 1px solid #ababab;
  font-size: 50px;
  font-weight: normal;
  color: #e2e2e2;
  text-align: center;
  padding: 10px;
}

.list-card__items {
  padding: 15px 0;
}
.list-card__item {
  padding: 10px;
  color: #e2e2e2;
  transition: 0.3s ease;
  display: block;
  text-decoration: none;
  text-align: center;
  font-size: 24px;
  font-weight: 300;
}

.list-card__item:hover {
  transition: background-color ease-out 0.5s, color ease-out 0.5s;
  background-color: #fff;
  color: #2d3033;
}
</style>