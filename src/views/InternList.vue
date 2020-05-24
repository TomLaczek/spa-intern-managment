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
            <v-row class="justify-center align-center">
                <v-col cols="12">
                    <v-data-table
                        :headers="headers"
                        :items="users"
                        :items-per-page="5"
                        class="elevation-1"
                    ></v-data-table>
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
        return {
            pageNumber:1,
            headers:[
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
                    last_name:'last_name'
                }
            ],
        }
    },
    computed:{
        users(){
            return this.$store.getters.usersList
        }
    },
    mounted(){
        this.$store.dispatch("loadPage",this.pageNumber)
        .then(() => {
            console.log(this.users)
        }).catch(() => {
            
        });
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