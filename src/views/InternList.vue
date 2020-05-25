<template>
    <div id="userList">
        <v-container>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("intern_list")}}</div>
            </v-row>
            <v-row class="justify-center align-center">
                <v-col cols="8">
                     <v-text-field prepend-inner-icon="mdi-search" :label="$t('search')" clearable></v-text-field>
                </v-col>
            </v-row>
            <v-row class="justify-center align-center" v-if="!this.show">
                <v-col cols="6">
                    <v-progress-linear :active="this.loader" height="10" indeterminate rounded></v-progress-linear>
                </v-col>
            </v-row>
            <v-row class="justify-center align-center" v-if="this.show">
                <v-col cols="12">
                    <v-data-table
                        :headers="headers"
                        :items="internList"
                        :items-per-page="10"
                        class="elevation-1"
                    >
                    <template v-slot:item.avatar="{ item }">
                    <img
                       :src="item"
                        max-heigth="20"
                    />
                    </template>
                    
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <div class="container">
            <div class="">
                <div class="">
                   
                </div>
                <!-- <div class="">
                    <table>
                        <tr>
                            <td>{{$t("No")}}</td>
                            <td>{{$t("avatar")}}</td>
                            <td>{{$t("first_name")}}</td>
                            <td>{{$t("last_name")}}</td>
                        </tr>
                        <tr>Loader</tr>
                        <tr v-for="(user,index) in users" :key="index" class="tableRow" style="bacground-color:grey;">
                            <td class="tableColumn">{{ index }}</td>
                            <td class="tableColumn"><img :src="`${user.avatar}`" alt="avatar" class="avatar" /></td>
                            <td class="tableColumn">{{ user.first_name }}</td>
                            <td class="tableColumn">{{ user.last_name}}</td>
                        </tr>
                    </table>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"userList",
    data:()=>{
        return{
            loader:false,
            show:false,
        }
    },
    computed:{
        internList(){
            return this.$store.getters.internList
        },
        totalPages(){
            return this.$store.getters.totalPages
        },
        headers(){
            return [
                {
                    text: this.$t("No"),
                    value: 'id'
                },
                {
                    text: this.$t("avatar"),
                    value:'avatar'
                },
                {
                    text: this.$t("first_name"),
                    value:'first_name'
                },
                {
                    text: this.$t("last_name"),
                    value:'last_name'
                }
            ]
        }
    },
    mounted(){
        this.loader=true;
        this.fillInternData()        
    },
    methods:{
        fillInternData(){
            if(this.totalPages){
                this.loopThroughtData(this.totalPages)
            } else{
                this.$store.dispatch("countPages")
                .then(()=>{
                    this.loopThroughtData(this.totalPages)
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            this.loader=false;
             this.show=true;
        },
        loopThroughtData(totalPages){
            for(var i = 1; i<=totalPages;i++){
                this.$store.dispatch("downloadPageData",i)
            }
        }
    }
}
</script>
<style scoped>
    .noBorders{
        border:none;
        border-bottom: 1px solid #000;
    }
    input{
        color:#000;
    }
    .tableRow,.tableColumn{
        border:2px solid #000;
    }
    .avatar{
        max-height: 30px;
    }
    table, table tr td{
        text-align:center;
        margin:auto;
    }
</style>