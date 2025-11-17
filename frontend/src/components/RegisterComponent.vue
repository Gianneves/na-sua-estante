<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next';
import Button from './ui/button/Button.vue';
import Dialog from './ui/dialog/Dialog.vue';
import DialogContent from './ui/dialog/DialogContent.vue';
import DialogDescription from './ui/dialog/DialogDescription.vue';
import DialogHeader from './ui/dialog/DialogHeader.vue';
import DialogTitle from './ui/dialog/DialogTitle.vue';
import DialogTrigger from './ui/dialog/DialogTrigger.vue';
import Tabs from './ui/tabs/Tabs.vue';
import TabsList from './ui/tabs/TabsList.vue';
import TabsContent from './ui/tabs/TabsContent.vue';
import TabsTrigger from './ui/tabs/TabsTrigger.vue';
import Card from './ui/card/Card.vue';
import CardContent from './ui/card/CardContent.vue';
import CardFooter from './ui/card/CardFooter.vue';
import Label from './ui/label/Label.vue';
import Separator from './ui/separator/Separator.vue';
import Input from './ui/input/Input.vue';
import Register from './RegisterCard.vue';
import LoginCard from './LoginCard.vue';


const props = defineProps({
    type: String,
    buttonContent: String
})
</script>

console.log(props.buttonContent)

<template>
    <Dialog>
        <DialogTrigger>
            <Button v-if="type === 'register' && (buttonContent === 'Criar conta' || buttonContent === 'Começar gratuitamente')">
                {{ buttonContent }}
            </Button>
            <Button v-else variant="ghost">
                {{ buttonContent }}
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    <div class="flex justify-center gap-3 flex-row">
                        <BookOpen :size="38" color="#1a5fb4" :stroke-width="2" /><span
                            class="mt-2  text-[#1a5fb4] font-bold">Na Sua
                            Estante</span>
                    </div>
                </DialogTitle>
                <DialogDescription class="flex justify-center">
                    <Tabs :default-value="type == 'sign' ? 'sign' : 'register'" class="w-[400px]">
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="sign">
                                Entrar
                            </TabsTrigger>
                            <TabsTrigger value="register">
                                Criar Conta
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent class="flex flex-col" value="sign">
                            <Button variant="ghost" class="my-2">
                                <svg class="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continuar com Google
                            </Button>

                            <div class="relative my-1 flex items-center justify-center overflow-hidden">
                                <Separator class="h-0 border-t border-dashed bg-transparent" />
                                <div class="px-2 text-center bg-card text-sm">OU</div>
                                <Separator class="h-0 border-t border-dashed bg-transparent" />
                            </div>

                            <LoginCard />
                        </TabsContent>
                        <TabsContent class="flex flex-col" value="register">
                            <Button variant="ghost" class="my-2">
                                <svg class="h-5 w-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Criar conta com Google
                            </Button>

                            <div class="relative my-1 flex items-center justify-center overflow-hidden">
                                <Separator class="h-0 border-t border-dashed bg-transparent" />
                                <div class="px-2 text-center bg-card text-sm">OU</div>
                                <Separator class="h-0 border-t border-dashed bg-transparent" />
                            </div>

                            <Register />
                        </TabsContent>
                    </Tabs>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>