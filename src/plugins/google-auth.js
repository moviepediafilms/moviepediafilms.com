import GAuth from 'vue-google-oauth2'
import Vue from 'vue'
const gauthOption = {
    clientId: '958441006864-k67eg9rih3ihl2qjn4ua729onbvrvuda.apps.googleusercontent.com',
    scope: 'profile email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read',
    prompt: 'select_account',
    response_type: "id_token code"
}
Vue.use(GAuth, gauthOption)