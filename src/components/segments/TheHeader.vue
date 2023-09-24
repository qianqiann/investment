<template>
  <b-container class="header-container">
    <header class="header">
      <div class="header__left">
        <b-link to="/">
          <img class="header__logo" src="https://i-access.affinhwangam.com/images/logo.png" />
       
        </b-link>
        <div
          class="header__nav-icon"
          :class="{ 'header__nav-icon--active': showNavbar }"
          @click="showNavbar = !showNavbar"
        >
          <fa-icon icon="bars" v-show="!showNavbar"></fa-icon>
          <fa-icon icon="times" v-show="showNavbar"></fa-icon>
        </div>
      </div>
      <div
        class="header__right"
        :class="{ 'header__right--hidden': !showNavbar }"
      >
        <the-navbar @close="showNavbar = false"></the-navbar>
      </div>
    </header>
  </b-container>
</template>

<script>
import TheNavbar from "./TheNavbar.vue";

export default {
  data: () => ({
    showNavbar: false,
  }),
  components: {
    TheNavbar,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  gap: 5%
}
.header__left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__nav-icon {
  font-size: 24px;
  color: #555;
  cursor: pointer;
  visibility: hidden;
}

.header__nav-icon:hover,
.header__nav-icon--active {
  color: #0092af;
}

.header__logo:hover {
  opacity: 0.8;
}

.header__right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  height: auto;
}

.header__logo {
  max-height: 50px;
}

@media (max-width: 768px) {
  .header {
    display: block;
    padding: 0;
  }

  .header-container {
    padding-left: 0;
    padding-right: 0;
  }

  .header__left {
    padding: 9px 11px;
  }

  .header__nav-icon {
    visibility: visible;
    margin-left: 20px;
  }

  .header__right {
    background-color: #fff;
    display: block;
    transition: all 0.15s;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
  }

  .header__right--hidden {
    height: 1px;
    overflow-y: auto;
    visibility: hidden;
  }
}
</style>