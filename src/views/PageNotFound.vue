<template>
    <div id="404">
        <v-container>
            <v-row class="justify-center align-center">
                <h1>404</h1>
            </v-row>
            <v-row class="justify-center align-center">
                <v-btn @click="$router.push('/')" outlined rounded><v-icon>mdi-arrow-left</v-icon><span>main page</span></v-btn>
            </v-row>
        </v-container>
    </div>
</template>