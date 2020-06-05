<template>
    <v-row class="justify-center align-center">
        <router-link :to="{name:'AddIntern'}" class="mx-2">{{$t("add_intern")}}</router-link>
        <span>|</span>
        <router-link :to="{name:'InternList'}" class="mx-2">{{$t("intern_list")}}</router-link>
          <div class="text-center right-align">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="primary"
                    dark
                    fab
                    outlined
                    small
                    v-on="on"
                    >
                    {{ language }}
                    </v-btn>
                </template>
                <v-list dense small >
                    <v-list-item
                    v-for="(item, index) in langs"
                    :key="index"
                    @click="changeLocale(item.lang)"
                    >
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
    </v-row> 
</template>
<script>
import i18n from '../i18n'
export default {
    data(){
        return{
            language:'',
            langs:[
                {
                    title:"PL",
                    lang:"pl"
                },
                {
                    title:"ENG",
                    lang:"en"
                }
            ]
        }
    },
    mounted(){
        let l = i18n.locale
        for(var i = 0; i<this.langs.length;i++){
            if(l == this.langs[i].lang) {
                this.language = this.langs[i].title
                return
            }
        }
    },
    methods:{
        changeLocale(locale) {
            i18n.locale = locale;
            localStorage.language=locale;
        },
    }
}
</script>
<style scoped>
.right-align{
    position: absolute !important;
    right:2rem;
}

</style>