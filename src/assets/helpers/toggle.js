export default {
  bind: function (el, bindings, vnode) {
   document.body.addEventListener('click', (event)=>{
      if (!(el === event.target || el.contains(event.target))) {
       vnode.context[bindings.expression](event) ;
      }
    })
  },
  unbind: function () {
    document.body.removeEventListener('click', () => {})
  },
}