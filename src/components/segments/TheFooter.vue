<template>
  <footer class="footer">
    <div class="footer__nav">
      <b-link to="/">HOME</b-link>
      <b-link to="/about">ABOUT</b-link>
      <b-link to="/contact-us">CONTACT US</b-link>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background: #323437;
  color: #999;
  padding: 30px 11px 18px;
  text-align: center;
}

.footer__nav {
  display: flex;
}

.footer__nav a {
  display: inline-block;
  text-decoration: none;
  opacity: 0.86;
  color: #fff;
  padding: 15px;
  font-size: 12px;
  font-weight: 500;
}
</style>