<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword,AuthError } from 'firebase/auth';
import { useRouter } from 'vue-router';

const auth = getAuth();
const formDataRegister = ref({
  usuario: '',
  correo: '',
  password: '',
  confirmarPassword: '',
});

const router = useRouter();

const register = async () => {
  // Validar que los campos requeridos no estén vacíos
  if (!formDataRegister.value.correo || !formDataRegister.value.password) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  if (formDataRegister.value.password !== formDataRegister.value.confirmarPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formDataRegister.value.correo,
      formDataRegister.value.password
    );

    const user = userCredential.user;
    console.log(user);
    alert('Usuario creado: ' + user.email);
    // Puedes redirigir a la página de inicio o a donde desees después del registro
    router.push({ name: 'index' });
  } catch (error: AuthError) {
    // Utilizar 'as' para especificar el tipo del objeto de error
    const errorCode = error.code ? error.code : 'Desconocido';
    const errorMessage = error.message ? error.message : 'Error desconocido';
    console.error(errorCode, errorMessage);
    alert(errorMessage);
  }
};
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-cover bg-center" style="background-image: url('/src/assets/images/bg.jpg')">
    <section class="flex h-1/5">
      <router-link class="bg-black rounded-lg h-1/3 w-20 my-10 mx-5" :to="{ name: 'index' }">
        <i class="pi pi-chevron-left mt-4" style="color: aliceblue"></i>
      </router-link>
    </section>
    <section class="max-w-md mx-auto mt-8">
      <form class="bg-white bg-opacity-75 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label for="usuario" class="block text-black text-sm font-bold mb-2">Usuario</label>
          <InputText class="p-inputtext-lg w-full" v-model="formDataRegister.usuario" type="text" />
        </div>
        <div class="mb-4">
          <label for="correo" class="block text-black text-sm font-bold mb-2">Correo</label>
          <InputText class="p-inputtext-lg w-full" v-model="formDataRegister.correo" type="text" />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-black text-sm font-bold mb-2">Contraseña</label>
          <Password class="p-inputtext-lg w-full" v-model="formDataRegister.password" toggleMask :feedback="false" required />
        </div>
        <div class="mb-4">
          <label for="confirmarPassword" class="block text-black text-sm font-bold mb-2">Confirmar Contraseña</label>
          <Password class="p-inputtext-lg w-full" v-model="formDataRegister.confirmarPassword" toggleMask :feedback="false" required />
        </div>
        <div class="flex items-center justify-between">
          <button @click.prevent="register" class="bg-[#ccba8d] hover:bg-[#d4cfa6] text-white font-bold py-2 px-4 rounded w-full">
            Registrar
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
