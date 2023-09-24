<template>
  <div class="navbar">
    <ul class="navbar__items">
      <template v-for="navItem in navItems">
        <li
          v-if="!navItem.children"
          :key="navItem.name"
          class="navbar__item"
          @click="$emit('close')"
        >
          <b-link :title="navItem.name" :to="navItem.to">
            {{ navItem.name }}
          </b-link>
        </li>

        <li
          class="navbar__item navbar__item--dropdown"
          :key="navItem.name + 'd'"
          v-else
        >
          <b-link title="Revision Notes" to="#" class="dropdown-toggle">
            {{ navItem.name }}
            <span class="caret-wrap"><span class="caret"></span></span>
          </b-link>

          <ul class="navbar__dropdown-menu">
            <li
              class="navbar__dropdown-item"
              v-for="childItem in navItem.children"
              :key="childItem.name"
              @click="$emit('close')"
            >
              <b-link :title="childItem.name" :to="childItem.to">
                {{ childItem.name }}
              </b-link>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    navItems: [
      { name: "HOME", to: "/" },
       { name: "Visualisation", to: "/" },
    ],
  }),
};
</script>

<style scoped>
.navbar {
  padding: 5px 0;
}
.navbar__items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  line-height: 1.618;
  margin-bottom: 0;
}

.navbar__item {
  position: relative;
}

.navbar__items ul {
  margin-bottom: 0;
}

.navbar__item a {
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 3px;
  color: black !important;
  text-transform: uppercase;
  font-weight: 400;
  display: block;
  padding: 10px 15px;
  transition: 0.3s ease;
  text-decoration: none;
}

.navbar__dropdown-menu {
  visibility: hidden;
  opacity: 0;
  display: none;
  margin-top: -5px;
  -webkit-transition: all 150ms linear;
  transition: all 150ms linear;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  -webkit-box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
}

.navbar__item:hover .navbar__dropdown-menu {
  display: block;
  visibility: visible;
  opacity: 1;
  margin-top: 0;
  z-index: 10;
}

.navbar__dropdown-menu a {
  font-size: 13px;
  color: #333;
}

.navbar__dropdown-menu a:hover {
  color: #0092af;
}

@media (max-width: 768px) {
  .navbar__items {
    display: block;
  }
}
</style>