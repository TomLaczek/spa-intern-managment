<template>
    <div id="addIntern">
        <v-container>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("add_intern")}}</div>
            </v-row>
            <v-row class="justify-center align-center">
                <v-col cols="8">
                    <v-text-field v-model="name" :label='$t("first_name")' clearable></v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="lastName" :label='$t("last_name")' clearable></v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field v-model="avatar" :label='$t("avatar")' clearable></v-text-field>
                </v-col>
            </v-row>
            <v-row class="justify-end align-center">
                <v-btn outlined rounded @click="addNewIntern()">
                    <span>{{$t("submit")}}</span>
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name:'addingIntern',
    data() {
        return{
            name:null,
            lastName:null,
            avatar:null,
        };
    },
    computed:{
        responses(){
            return this.$store.getters.response
        }
    },
    methods:{
        addNewIntern(){
            let internData = {
                internName: this.name,
                internLastName: this.lastName,
                internEmail: this.avatar
            }
            this.$store.dispath('addNewIntern')
            .then(()=>{
                if(responses.headers.status>=200 && responses.headers.status<202) console.log('dodano')
                else if(responses.headers.status>201 && responses.headers.status<300){
                    console.log('coś poszło nie tak')
                }
                else if(responses.headers.status>=400 && responses.headers.status<500){
                    console.log('nieoczekiwany błąd')
                }
            })
        }
    }
}
</script>