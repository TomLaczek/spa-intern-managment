<template>
    <div id="addIntern">
        <v-container>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("edit_intern")}}</div>
            </v-row>
            <v-row class="justify-end align-center">
                <v-col cols="10">
                    <v-row class="justify-end align-center">
                        <v-btn @click="saveIntern" rounded outlined class="mx-2">
                            <v-icon left>mdi-edit</v-icon>
                            <span>{{$t("save")}}</span>
                        </v-btn>
                        <v-btn @click="deleteIntern" rounded outlined class="mx-2">
                            <v-icon left>mdi-cancel</v-icon>
                            <span>{{$t("delete")}}</span>
                        </v-btn>
                    </v-row>
                </v-col>
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
    methods:{
        saveIntern(){
            let internData = {
                internName: this.name,
                internLastName: this.lastName,
                internEmail: this.avatar
            }
            this.$store.dispath('editIntern')
            .then(()=>{
                if(responses.headers.status>=200 && responses.headers.status<202) console.log('zedytowano')
                else if(responses.headers.status>201 && responses.headers.status<300){
                    console.log('coś poszło nie tak')
                }
                else if(responses.headers.status>=400 && responses.headers.status<500){
                    console.log('nieoczekiwany błąd')
                }
            })
        },
        deleteIntern(){
            this.$store.dispath('deleteIntern',id)
            .then(()=>{
                if(responses.headers.status>=200 && responses.headers.status<202) console.log('usunięto')
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
