<template>
  <footer class="footer bg-gray">
    <div class="row container">
      <div class="column">
        <a href="#" class="link-logo" title="logotype">
          baronin.dev
        </a>
      </div>
      <div class="column">
        <p>&copy; Copyright 2019 - {{ new Date().getFullYear()}}</p>
      </div>
      <div class="column">
        <ul class="list-group">
          <li>
            <a href="tel:+380633128080" title="phone">
              <img src="@/assets/img/phone.svg" alt="phone">
              +3 (063) 312 80 80</a>
          </li>
          <li>
            <a href="mailto:baronin.yaroslav@gmail.com" title="email baronin.yaroslav@gmail.com">
              <img src="@/assets/img/email.svg" alt="email">
              baronin.yaroslav@gmail.com</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import './_the-footer.scss';

  export default {
    name: 'the-footer',
  };
</script>
