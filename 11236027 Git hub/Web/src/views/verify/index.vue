<template>
  <div>驗證完成</div>
</template>

<script>
import axios from 'axios';
import { successMessage, warningMessage, errorMessage } from "../../api/messgae";

export default {
    components: {},
    props: {},
    data() {
      return {};
    },
    watch: {},
    computed: {},
    methods: {
        verify(){
            axios.post('/auth/verify', {token: this.$route.params.token}).then(res =>{
                
                successMessage('驗證完成')
                this.$router.push({ name: 'login' });
            }).catch(err =>{

            })
        }
    },
    created() {},
    mounted() {
        this.verify();
    }
};
</script>

<style lang="scss" scoped>

</style>