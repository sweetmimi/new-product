<template>
    <div class="incoming-date-data">
        <Menu mode="horizontal" theme="light" :active-name="activeName">
            <MenuItem v-for="item in tabs" :key="item.label" :name="item.link"
                @click.native="handlerRouterChange(item.link)"><Icon :type="item.icon" />{{item.label}}</MenuItem>
        </Menu>
        <router-view class="incoming-date-data-container"></router-view>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},

        data() {
            return {
                tabs: [
                    {
                        label: this.$t('lostRateTable.label.lostRate'),
                        link: '/datareport/lostRateTable/lostRate',
                        icon: 'ios-paper',
                    },
                    {
                        label: this.$t('lostRateTable.label.lostUser'),
                        link: '/datareport/lostRateTable/lostUser',
                        icon: 'ios-stats',
                    },
                    {
                        label: this.$t('lostRateTable.label.ableUser'),
                        link: '/datareport/lostRateTable/ableUser',
                        icon: 'ios-people',
                    },
                    {
                        label: this.$t('lostRateTable.label.ableHistory'),
                        link: '/datareport/lostRateTable/ableHistory',
                        icon: 'ios-construct',
                    },
                ]
            }
        },

        async created() {
            this.activeName = this.$route.fullPath
        },

        computed: {},

        mounted() {},

        methods: {
            handlerRouterChange(path) {
                this.activeName = path
                this.$router.push(path)
            }
        }
    }
</script>



<style>
    .incoming-date-data .incoming-date-data-container {
        padding: 30px;
    }
</style>
