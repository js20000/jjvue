export default {
    props: {
        mother: {
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
            return this.mother || this.$parent
        }
    },
    methods: {

    }
}
