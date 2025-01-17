<template>
  <VaForm ref="form" @submit.prevent="submit">
    <h1 class="font-semibold text-4xl mb-4">Log in</h1>
    <p class="text-base mb-4 leading-5">
      Non hai ancora un account?
      <a href="mailto:francesca.daga@ao-pisa.toscana.it?subject=Richiesta%20credenziali%20schedulatore&body=Vorrei%20creare%20un%20account"
        class="font-semibold text-primary"
        >Richiedilo</a
      >
    </p>
    <VaInput
      v-model="formData.email"
      :rules="[validators.required, validators.email]"
      class="mb-4"
      label="Email"
      type="email"
    />
    <VaValue v-slot="isPasswordVisible" :default-value="false">
      <VaInput
        v-model="formData.password"
        :rules="[validators.required]"
        :type="isPasswordVisible.value ? 'text' : 'password'"
        class="mb-4"
        label="Password"
        @clickAppendInner.stop="
          isPasswordVisible.value = !isPasswordVisible.value
        "
      >
        <template #appendInner>
          <VaIcon
            :name="
              isPasswordVisible.value ? 'mso-visibility_off' : 'mso-visibility'
            "
            class="cursor-pointer"
            color="secondary"
          />
        </template>
      </VaInput>
    </VaValue>

    <div
      class="auth-layout__options flex flex-col sm:flex-row items-start sm:items-center justify-between"
    >
      <RouterLink
        :to="{ name: 'recover-password' }"
        class="mt-2 sm:mt-0 sm:ml-1 font-semibold text-primary"
      >
        Password dimenticata?
      </RouterLink>
    </div>

    <div class="flex justify-center mt-4">
      <VaButton class="w-full" @click="submit"> Login</VaButton>
    </div>
  </VaForm>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useForm, useToast } from "vuestic-ui";
import { validators } from "@/services/utils";
import axios from "axios";
import {useUserStore} from "@/stores/user-store";

const { validate } = useForm("form");
const { push } = useRouter();
const { init } = useToast();

const formData = reactive({
  email: "",
  password: "",
  keepLoggedIn: false,
});

const submit = () => {
  const userStore = useUserStore();
  if (validate()) {
    axios
        .post('http://localhost:8000/api/scheduler/login',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
        .then(res => {
          userStore.name = res.data.first_name;
          userStore.surname = res.data.last_name;
          userStore.email = res.data.email;
          userStore.admin = res.data.is_admin;
          userStore.loggedIn = true;

          let dateJoined = res.data.date_joined;
          dateJoined = dateJoined.toString().split('T')[0].split('-');
          userStore.memberSince = dateJoined[2] + '/' + dateJoined[1] + '/' + dateJoined[0];

          init({message: "Login effettuato con successo", color: "success"});
          push({
            name: "dashboard",
          })
        })
        .catch(error => {
          if (error.response.status === 401) {
            init({message: "E-mail o password errata", color: "danger"});
          }
          else {
            init({message: "Errore lato server", color: "danger"});
          }
        })
  }
}

</script>
