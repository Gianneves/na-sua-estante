<script setup lang="ts">
import RegisterComponent from '@/components/RegisterComponent.vue';
import { BookOpen } from 'lucide-vue-next';

type ButtonVariant =
  | { type: 'sign'; buttonContent: 'Entrar' | 'Já tenho conta' }
  | { type: 'register'; buttonContent: 'Criar conta' | 'Começar gratuitamente' };

const props = defineProps<ButtonVariant>()

</script>

<template>
    <section class="container max-w-full">
        <nav class="flex flex-row p-4 justify-around">
            <div class="flex gap-3 flex-row">
                <BookOpen :size="38" color="#1a5fb4" :stroke-width="2" /><span class="mt-2 text-[#1a5fb4] font-bold">Na
                    Sua
                    Estante</span>
            </div>
            <div class="flex gap-3">
                <RegisterComponent :type="'sign'" :buttonContent="'Entrar'" />
                <RegisterComponent :type="'register'" :buttonContent="'Criar conta'" />
            </div>
        </nav>
    </section>
</template>