import React from "react";
import {FormControl, FormLabel, Input, Box, Button, useToast, useColorMode, Stack, Tooltip, Flex, IconButton, VStack, Heading, Text, Image, HStack, Link} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaGoogle } from 'react-icons/fa';


// 声明动态效果
const MotionBox = motion(Box);
const MotionInput = motion(Input);
const MotionButton = motion(Button);


const schema = yup.object().shape({
    firstName: yup.string().required("名字是必填项!"),
    email: yup.string().email("无效的电子邮件!").required("电子邮件是必填项!"),
    password: yup.string().min(8, "密码至少需要8个字符!").required("密码是必填项!")
});


// 定义表单工具库及表单状态
const RegisterPag = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    // 定义toast组件
    const toast = useToast();

    // 定义并导入颜色模型组件 colorMode: 颜色模式组件 toggleColorMode: 切换颜色模式组件
    const {colorMode, toggleColorMode} = useColorMode();

    
    // 定义注册成功toast提示
    const onSubmit = async () => {};


    // 定义跳转登录页面toast提示
    const handleSignIn = () => {
        toast({
            position: "top",
            title: "登录",
            description: "正在导航到登录页面...",
            status : "info",
            duration: 2000,
            isClosable: true
        });
    };


    // 注册页面
    const RegisterComponent = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
                <Tooltip label={errors.firstName?.message} isOpen={Boolean(errors.firstName)} placement="right-end">
                    <FormControl id="firstName" isInvalid={Boolean(errors.firstName)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>名字</FormLabel>
                        <MotionInput
                            name="firstName"
                            type="firstName"
                            autoComplete="firstName"
                            {...register("firstName")}
                            focusBorderColor="blue.500"
                            whileFocus={{scale: 1.05}}
                            w="300px"/>
                    </FormControl>
                </Tooltip>
                <Tooltip label={errors.email?.message} isOpen={Boolean(errors.email)} placement="right-end">
                    <FormControl id="email" isInvalid={Boolean(errors.email)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>电子邮件地址</FormLabel>
                        <MotionInput
                            name="email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                            focusBorderColor="blue.500"
                            whileFocus={{scale: 1.05}}
                            w="300px"/>
                    </FormControl>
                </Tooltip>
                <Tooltip label={errors.password?.message} isOpen={Boolean(errors.password)} placement="right-end">
                    <FormControl id="password" isInvalid={Boolean(errors.password)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>密码</FormLabel>
                        <MotionInput
                            name="password"
                            type="password"
                            autoComplete="password"
                            {...register("password")}
                            focusBorderColor="blue.500"
                            whileFocus={{scale: 1.05}}
                            w="300px"/>
                    </FormControl>
                </Tooltip>
                <MotionButton type="submit" colorScheme="blue" size="lg" fontSize="md" backgroundImage="linear-gradient(to right, #7928CA, #FF0080)" w="300px" whileHover={{ scale: 1.05 }}>
                    注册
                </MotionButton>
                <Text mt="4" textAlign="center" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>如果已有账号，<Link color="blue.500" onClick={handleSignIn}>登录</Link></Text>
            </Stack>
        </form>
    );

    return (
        <Flex h="100vh" bg={colorMode === "light" ? "gray.100" : "gray.800"} justifyContent="center" alignItems="center">
            <MotionBox flex="1" p="10" bg={colorMode === 'light' ? 'white' : 'gray.700'} borderRadius="md" boxShadow="md">
                <IconButton
                    position="fixed"
                    top="1rem"
                    right="1rem"
                    aria-label="Toggle color mode"
                    icon={colorMode == "light" ? <FaMoon /> : <FaSun />}
                    onClick={toggleColorMode}
                />
                <VStack alignItems="center" justifyContent="center" spacing="6">
                    <Heading mb="6" textAlign="center" size="x1" fontWeight="extrabold" color={colorMode === 'light' ? 'black' : 'white'}>
                        请注册您的账户
                    </Heading>
                    <Text mb="4" textAlign="center" fontSize="lg" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
                    输入您的用户名电子邮件和密码进行注册
                    </Text>
                    <RegisterComponent/>
                </VStack>
            </MotionBox>
            <Box flex="1" width="100%" display="flex" justifyContent="center" alignItems="center">
                <Image src="https://images.unsplash.com/photo-1683369539069-2cc88ef28963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Register" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </Box>
        </Flex>
    );       
};


export default RegisterPag;







