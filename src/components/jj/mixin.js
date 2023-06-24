export default {
    props: {
        parent: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
        }
    },
    computed: {
        vm() {
            return this.parent || this.$parent
        }
    },
    methods: {

    }
}
