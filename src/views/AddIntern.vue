<template>
    <div id="addIntern">
        <v-container>
            <v-snackbar
                v-model="submitPossitive"
                >
                {{ $t("internAdded") }}
                <v-btn
                    color="pink"
                    text
                    @click="submitPossitive = false"
                >
                    Zamknij
                </v-btn>
            </v-snackbar>
            <v-snackbar
                v-model="submitError"
                >
                {{ $t("internNotAdded") }}
                <v-btn
                    color="pink"
                    text
                    @click="submitError = false"
                >
                    Zamknij
                </v-btn>
            </v-snackbar>

            <v-row class="justify-center align-center">
                <div class="title">{{$t("add_intern")}}</div>
            </v-row>
            <ValidationObserver ref="observer" v-slot="{ handleSubmit, reset }">
                <v-form ref="form" lazy-validation @submit.prevent="handleSubmit(submit)" @reset.prevent="reset">
                    <v-row class="justify-center align-center">
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="name" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                v-model="form.name"
                                :label='$t("first_name")' 
                                :error-messages="errors"
                                required
                                clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="lastName" :rules="{required:true, alpha:true, min:3, max:20}">
                                <v-text-field 
                                    v-model="form.lastName" 
                                    :error-messages="errors"
                                    :label='$t("last_name")' 
                                    required
                                    clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                        <v-col cols="8">
                            <ValidationProvider v-slot="{ errors }" name="avatarUrl" :rules="{ required:true, regex: /(https?:\/\/.*\.(?:png|jpg))/i }">
                                <v-text-field 
                                    v-model="form.avatarUrl" 
                                    :error-messages="errors"
                                    :label='$t("avatar_url")' 
                                    required
                                    clearable
                                ></v-text-field>
                            </ValidationProvider>
                        </v-col>
                    </v-row>
                    <v-row class="justify-center align-center">
                        <v-col cols="8">
                            <v-row class="justify-end align-center">
                                <v-btn outlined rounded type="submit">
                                    <v-icon left big color="#8asd11">mdi-plus</v-icon>
                                    <span>{{$t("submit")}}</span>
                                </v-btn>
                            </v-row>
                        </v-col>                        
                    </v-row>
                </v-form>
            </ValidationObserver>
        </v-container>
    </div>
</template>
<script>
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
        const defaultForm = Object.freeze({
            name:'',
            lastName:'',
            avatarUrl:'',
        }) 
        return{
            form: Object.assign({},defaultForm),
            defaultForm,
            submitPossitive:false,
            submitError:false,
        };
    },
    methods:{
        submit(){
            this.$refs.observer.validate()
            .then(result=>{
                if(result){
                    let internData = {
                        internName: this.form.name,
                        internLastName: this.form.lastName,
                        internEmail: this.form.avatarUrl
                    }
                    this.$store.dispatch('addNewIntern',internData)
                    .then((response)=>{
                        if(response.status == 201 || response.status == 200){
                            this.$refs.observer.reset()
                            this.$refs.form.reset()
                            this.submitPossitive=true;
                        }
                    })
                    .catch(()=>{
                        this.submitError=true;
                    })
                }
            })
            .catch(()=>{
                this.submitError=true;
            })
        }
    }
}
</script>