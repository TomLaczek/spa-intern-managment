<template>
    <div id="addIntern">
        <v-container>
            <v-row class="justify-center align-center">
                <div class="title">{{$t("add_intern")}}</div>
            </v-row>
            <v-row class="justify-center align-center">
                <v-col cols="8">
                    <v-text-field :label='$t("first_name")' clearable></v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field :label='$t("last_name")' clearable></v-text-field>
                </v-col>
                <v-col cols="8">
                    <v-text-field :label='$t("avatar")' clearable></v-text-field>
                </v-col>
            </v-row>
            <v-row class="justify-end align-center">
                <v-btn outlined>
                    <span>{{$t("submit")}}</span>
                </v-btn>
            </v-row>
        </v-container>
    </div>
</template>