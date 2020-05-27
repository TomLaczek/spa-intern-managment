<template>
    <div id="addIntern">
        <v-container>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("edit_intern")}}</div>
            </v-row>
            <v-row class="justify-end align-center">
                <v-col cols="10">
                    <v-row class="justify-end align-center">
                        <v-btn rounded outlined class="mx-2" min-width="50">
                            <v-icon left>mdi-content-save</v-icon>
                            <span>{{$t("save")}}</span>
                        </v-btn>
                        <v-btn rounded outlined class="mx-2" min-width="50">
                            <v-icon left>mdi-delete</v-icon>
                            <span>{{$t("delete")}}</span>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>   
            <v-row class="justify-center align-center">
                <ValidationObserver ref="observer" v-slot="{ handleSubmit, reset }">
                    <v-form ref="form" lazy-validation @submit.prevent="handleSubmit(submit)" @reset.prevent="reset">
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="name" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                v-model="internData.name" 
                                :error-messages="errors"
                                :label='$t("first_name")' 
                                clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="lastName" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                v-model="internData.lastName" 
                                :error-messages="errors"
                                :label='$t("last_name")' 
                                clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="avatarUrl" :rules="{ required:true, regex: /(https?:\/\/.*\.(?:png|jpg))/i }">
                                <v-text-field 
                                v-model="internData.avatarUrl"
                                :error-messages="errors" 
                                :label='$t("avatar")' 
                                clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-form>
                </ValidationObserver>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name:'addingIntern',
    props:{
        id:{
            type:Number
        }
    },
    data() {
        return{
            internId: this.$route.params.id,

        };
    },
    computed:{
        internData(){
            return this.$store.getters.editIntern(this.internId)
        }
    },
    methods:{
        // saveIntern(){
        //     let internData = {
        //         internName: this.name,
        //         internLastName: this.lastName,
        //         internEmail: this.avatar
        //     }
        //     this.$store.dispath('editIntern')
        //     .then(()=>{
        //         if(responses.headers.status>=200 && responses.headers.status<202) console.log('zedytowano')
        //         else if(responses.headers.status>201 && responses.headers.status<300){
        //             console.log('coś poszło nie tak')
        //         }
        //         else if(responses.headers.status>=400 && responses.headers.status<500){
        //             console.log('nieoczekiwany błąd')
        //         }
        //     })
        // },
        // deleteIntern(){
        //     this.$store.dispath('deleteIntern',id)
        //     .then(()=>{
        //         if(responses.headers.status>=200 && responses.headers.status<202) console.log('usunięto')
        //         else if(responses.headers.status>201 && responses.headers.status<300){
        //             console.log('coś poszło nie tak')
        //         }
        //         else if(responses.headers.status>=400 && responses.headers.status<500){
        //             console.log('nieoczekiwany błąd')
        //         }
        //     })
        // }
    }
}
</script>
