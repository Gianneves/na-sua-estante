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
    email: zod.string().min(1, { message: 'E-mail é obrigatório' }).email({ message: 'Informe um e-mail válido' }),
    password: zod.string().min(1, { message: 'Senha é obrigatória' }),
})

type FormValues = zod.infer<typeof baseSchema>;

const form = reactive<FormValues>({
    email: '',
    password: '',
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
        const res = await axios.post('http://localhost:3000/api/v1/auth/login', result.data);
        localStorage.setItem('token', res.data.token)
        await router.replace('/dashboard');
    } catch (e) {
        console.log(e);
    }
};


</script>

<template>
    <Card class="flex justify-center">
        <Form @submit.prevent="onSubmit()">
            <CardContent class="space-y-2">
                <div class="space-y-1">
                    <Label for="email">E-mail</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" v-model="form.email" />
                    <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>

                </div>
                <div class="space-y-1">
                    <Label for="password">Senha</Label>
                    <Input id="password" type="password" v-model="form.password" />
                    <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" class="w-full">Entrar</Button>
            </CardFooter>
        </Form>
    </Card>
</template>