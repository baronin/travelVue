<template>
  <footer class="footer bg-gray">
    <div class="row container">
      <div class="column">
        <a href="#" class="link-logo" title="logotype"><img src="@/assets/img/logo-footer.svg" alt="logotype" class="logo"></a>
      </div>
      <div class="column">
        <p>&copy; Copyright 2019</p>
      </div>
      <div class="column">
        <ul class="list-group">
          <li><a href="tel:+18777779097" title="number phone">+1 (877) 777-9097</a></li>
          <li><a href="mailto:traveltech@altexsoft.com" title="website travel altexsoft">traveltech@altexsoft.com</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
  import './_the-footer.scss'

  export default {
    name: "the-footer"
  }
</script>