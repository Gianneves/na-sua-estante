<script setup lang="ts">
import Button from './ui/button/Button.vue';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Input from './ui/input/Input.vue';
import Label from './ui/label/Label.vue';

import * as zod from 'zod';
import axios from 'axios';
import router from '@/router';
import { reactive, ref } from 'vue';

const baseSchema = zod.object({
    name: zod.string().min(3, { message: 'Nome é obrigatório' }),
    nickname: zod.string().optional(),
    email: zod.string().min(1, { message: 'E-mail é obrigatório' }).email({ message: 'Informe um e-mail válido' }),
    password: zod.string().min(1, { message: 'Senha é obrigatória' }).min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
    passwordConfirm: zod.string().min(1, { message: 'Confirmação é obrigatória' }),
}).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'As senhas não coincidem',
})

type FormValues = zod.infer<typeof baseSchema>;

const form = reactive<FormValues>({
    name: '',
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
});

const errors = ref<Record<string, string>>({});

const onSubmit = async () => {
    const result = baseSchema.safeParse(form);

    if (!result.success) {
        errors.value = {};

        result.error.errors.forEach((err) => {
            const field = err.path[0] as string;
            errors.value[field] = err.message;
        });

        return;
    }

    try {
        const res = await axios.post('http://localhost:3000/api/v1/users', result.data);
        localStorage.setItem('token', res.data.token)
        await router.replace('/dashboard');
    } catch (e) {
        console.error(e);
    }
};
</script>

<template>
    <Card>
        <Form @submit.prevent="onSubmit()">
            <CardContent class="space-y-2">
                <div class="space-y-1">
                    <Label for="name">Nome Completo</Label>
                    <Input id="name" type="text" v-model="form.name" />
                    <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
                </div>
                <div class="space-y-1">
                    <Label for="nickname">Nome de user</Label>
                    <Input id="nickname" type="text" v-model="form.nickname" />
                    <p v-if="errors.nickname" class="text-red-500 text-sm">{{ errors.nickname }}</p>
                </div>

                <div class="space-y-1">
                    <Label for="email">E-mail</Label>
                    <Input id="email" type="email" v-model="form.email" placeholder="seu melhor e-mail" />
                    <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
                </div>
                <div class="space-y-1">
                    <Label for="password">Senha</Label>
                    <Input id="password" type="password" v-model="form.password" />
                    <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
                </div>
                <div class="space-y-1">
                    <Label for="password-confirm">Confirmar Senha</Label>
                    <Input id="password-confirm" type="password" v-model="form.passwordConfirm" />
                    <p v-if="errors.passwordConfirm" class="text-red-500 text-sm">{{ errors.passwordConfirm }}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button class="w-full">Criar conta</Button>
            </CardFooter>
        </form>
    </Card>
</template>
