export default {
    bind(el, binding) {
        let size = {
            displaySize: {},
            elementSize: {}
        };
        size.elementSize.height = el.clientHeight;
        size.elementSize.width = el.clientWidth;
        window.addEventListener('resize', function (event) {
            binding.value(event.target.innerWidth)
        })
    },
}