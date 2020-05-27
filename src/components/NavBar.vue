<template>
    <v-row class="justify-center align-center">
        <router-link :to="{name:'AddIntern'}" class="mx-2">{{$t("add_intern")}}</router-link>
        <span>|</span>
        <router-link :to="{name:'InternList'}" class="mx-2">{{$t("intern_list")}}</router-link>
    </v-row> 
</template>