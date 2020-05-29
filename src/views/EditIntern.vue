<template>
    <div id="editIntern">
        <v-container>
            <v-snackbar
                v-model="submitPossitive"
                >
                {{ $t("internEdited") }}
                <v-btn
                    color="pink"
                    text
                    @click="submitPossitive = false"
                >
                    Zamknij
                </v-btn>
            </v-snackbar>
            <v-snackbar
                v-model="somethingWentWrong"
                >
                {{ $t("somethingWentWrong") }}
                <v-btn
                    color="pink"
                    text
                    @click="somethingWentWrong = false"
                >
                    Zamknij
                </v-btn>
            </v-snackbar>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("edit_intern")}}</div>
            </v-row>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                <v-form lazy-validation @submit.prevent="handleSubmit(submit)">
                    <v-row class="justify-center align-center">
                        <v-col cols="8">
                            <v-row class="justify-end align-center">
                                <v-btn 
                                    type="submit"
                                    rounded 
                                    outlined
                                    class="mx-2" 
                                    min-width="50"
                                >
                                    <v-icon left>mdi-content-save</v-icon>
                                    <span>{{$t("save")}}</span>
                                </v-btn>
                                <v-btn 
                                    @click="deleteIntern" 
                                    rounded
                                    outlined 
                                    class="mx-2"
                                    min-width="50"
                                >
                                    <v-icon left>mdi-delete</v-icon>
                                    <span>{{$t("delete")}}</span>
                                </v-btn>
                            </v-row>
                        </v-col>
                    </v-row>   
                    <v-row class="justify-center align-center">
                        <v-col cols="8">
                            <ValidationProvider :vid="'vp'+edittingIntern.first_name" v-slot="{ errors }" name="name" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                v-model="edittingIntern.first_name" 
                                :error-messages="errors"
                                :label='$t("first_name")' 
                                clearable
                                :key="edittingIntern.first_name"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" :vid="'vp'+edittingIntern.last_name" name="lastName" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                v-model="edittingIntern.last_name" 
                                :error-messages="errors"
                                :label='$t("last_name")' 
                                clearable
                                :key="edittingIntern.last_name"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" :vid="'vp'+edittingIntern.avatar" name="avatarUrl" :rules="{ required:true, regex: /(https?:\/\/.*\.(?:png|jpg))/i }">
                                <v-text-field 
                                v-model="edittingIntern.avatar"
                                :error-messages="errors" 
                                :label='$t("avatar_url")' 
                                clearable
                                :key="edittingIntern.avatar"
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>
                </v-form>
            </ValidationObserver>
            <v-row class="justify-center align-center">
                <v-btn 
                @click="$router.go(-1)"
                rounded
                outlined
                >
                    <v-icon left>mdi-arrow-left</v-icon>
                    <span>{{ $t("go_back")}}</span>
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
import { required, max, min, alpha, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')
extend('required', {
    ...required,
    message: "This field is required..",
})
extend('alpha', {
    ...alpha,
    message: "Only letters",
})
extend('regex',{
    ...regex,
    message:  "You have used inncorrect character. Only letters, numbers, special signs (ex. https://abc.com/photo.jpg)",
})
extend('max', {
    ...max,
    message: "Too many letters, max 20",
})
extend('min', {
    ...min,
    message: "Add more letters, min 3",
})
export default {
    name:'addingIntern',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return{
            submitPossitive:false,
            somethingWentWrong:false
        };
    },
    computed:{
        internId(){
            return this.$route.params.intern_id
        },
        internData(){
            return this.$store.getters.getIntern(this.internId)
        },
        edittingIntern(){
            return {
                first_name: this.internData.first_name,
                last_name: this.internData.last_name,
                avatar: this.internData.avatar,
                id: this.internData.id
            }
        }
    },
    mounted(){
        if(this.$store.editIntern === undefined ){
            this.$store.dispatch("getOneIntern",this.internId)
        }
    },
    methods:{
        submit(){
            this.$refs.observer.validate()
            .then(result=>{
                if(result){
                    return axios.put(`https://reqres.in/api/users/${this.internData.id}`, this.edittingIntern)
                    .then((response)=>{
                        if(response.status == 201 || response.status == 200){
                            this.submitPossitive=true;
                            this.$store.commit("UPDATE_INTERN_DATA", this.edittingIntern)                            
                        }else{
                            this.somethingWentWrong = true;
                        }
                    })
                    .catch(()=>{
                        this.somethingWentWrong = true;
                    })
                }
                 
             })
        },
        deleteIntern(){
            return axios.delete(`https://reqres.in/api/users/${this.internData.id}`)
            .then((response)=>{
                if(response.status == 204){
                    this.$router.push({name:"InternList"})
                    this.$store.dispatch("countPages")
                }else{
                    this.somethingWentWrong = true;
                }
            })
            .catch(()=>{
                this.somethingWentWrong = true;
            })
        },
    }
}
</script>
