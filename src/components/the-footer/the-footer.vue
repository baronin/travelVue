<template>
  <footer class="footer bg-gray">
    <div class="row container">
      <div class="column">
        <a href="#" class="link-logo" title="logotype"> baronin.dev </a>
      </div>
      <div class="column">
        <p>&copy; Copyright 2019 - {{ new Date().getFullYear() }}</p>
      </div>
      <div class="column">
        <ul class="list-group">
          <li><a href="tel:+380633128080" title="number phone">+38 (063) 312-8080</a></li>
          <li>
            <a href="mailto:baronin.mailings@gmail.com" title="website travel's baronin">
              baronin.mailings@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import './_the-footer.scss'

export default {
  name: 'TheFooter',
}
</script>
