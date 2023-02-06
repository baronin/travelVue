export default {
  bind(el, binding, vnode) {
    let size = {
      displaySize: {},
      elementSize: {},
    }

    size.elementSize.height = el.clientHeight
    size.elementSize.width = el.clientWidth
    window.addEventListener('resize', function (event) {
      size.displaySize.height = event.currentTarget.innerHeight
      size.displaySize.width = event.currentTarget.innerWidth

      binding.value(el)
    })
  },
}
