<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { BookOpen } from 'lucide-vue-next';
import RegisterComponent from "./components/RegisterComponent.vue";

type ButtonVariant =
  | { type: 'sign'; buttonContent: 'Entrar' | 'Já tenho conta' }
  | { type: 'register'; buttonContent: 'Criar conta' | 'Começar gratuitamente' };

const props = defineProps<ButtonVariant>()

</script>

<template>
  <section class="container max-w-full">
    <nav class="flex flex-row p-4 justify-around">
      <div class="flex gap-3 flex-row">
        <BookOpen :size="38" color="#1a5fb4" :stroke-width="2" /><span class="mt-2 text-[#1a5fb4] font-bold">Na Sua
          Estante</span>
      </div>
      <div class="flex gap-3">
        <RegisterComponent :type="'sign'" :buttonContent="'Entrar'" />
        <RegisterComponent :type="'register'" :buttonContent="'Criar conta'" />
      </div>
    </nav>
  </section>

  <section class="bg-[#F0F6FF]">
    <div class="flex justify-around max-w-full p-20">
      <div class="mt-20">
        <h3 class="font-bold text-[#1a5fb4] ">
          Organize suas leituras e compartilhe suas descobertas
        </h3>
        <p class="mt-8 w-lg">Na Sua Estante é a plataforma perfeita para leitores que querem organizar sua biblioteca
          pessoal, acompanhar
          o progresso de leitura e escrever resenhas inspiradoras.
        </p>

        <div class="mt-8">
          <RegisterComponent :type="'register'" :buttonContent="'Começar gratuitamente'" />
          <RegisterComponent :type="'sign'" :buttonContent="'Já tenho conta'" />
        </div>
      </div>
      <div>
        <img class="h-96 lg:w-[550px] w-[800px] object-cover rounded-2xl"
          src="https://images.unsplash.com/photo-1709159057219-80439fbeddce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9va3MlMjBsaWJyYXJ5fGVufDF8fHx8MTc2MjM1NTg0OHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Biblioteca de livros">
      </div>
    </div>
  </section>
</template>

<style scoped></style>
