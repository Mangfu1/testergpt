import {React, useState} from "react";
import {FormControl, FormLabel, Input, Box, Button, useToast, useColorMode, Stack, Tooltip, Flex, IconButton, VStack, Heading, Text, Image, HStack, Link, Code} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { get, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { motion } from "framer-motion";
import { FaMoon, FaSun, FaGoogle } from 'react-icons/fa';



// 声明动态效果
const MotionBox = motion(Box);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

const schema = yup.object().shape({
    email: yup.string().email("无效的电子邮件！").required("电子邮件是必填项！"),
    emailCode: yup.string("邮箱验证码是必填项！").required("邮箱验证码错误！"),
    password: yup.string().min(8, "密码至少需要8个字符! ").required("密码是必填项！"),
    confirmPassword: yup.string("输入的密码与第一次输入不一致！").required("密码是必填项！")
});


// 定义表单
const ForgotPasswordPage = () => {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    // 定义toast组件
    const toast = useToast();

    // 定义并导入颜色模型组件 colorMode: 颜色模式组件 toggleColorMode: 切换颜色模式组件
    const {colorMode, toggleColorMode} = useColorMode();


    // 定义修改密码成功toast提示
    const onSubmit = async () => {};

    let [btnContent, setContent] = useState("获取验证码")

    function sendCode() {
        // const display=true
        setInterval(clock, 1000)
    }

    let time = 60
    function clock () {
        if (time >= 1) {
            time = time - 1
            setContent(btnContent = time + "s不能发送验证码")
        }else {
            setContent(btnContent = "获取验证码")
            console.log(time)
        }
    }

    // const state = {
    //         time: 60,
    //         btnDisale: false,
    //         btnContent: "获取验证码"
    //     };

    // const render = () => {

    //         let timeChange;
    //         let ti = state.time;
    // };
    // const clock = () => {
    //     if (render.ti > 0){
    //         render.ti = render.ti - 1;
    //         state.btnContent = render.ti + "s之内不能再次发送验证码"
    //     }else{
    //         clearInterval(render.timeChange);
    //         state.btnDisale = false
    //         state.time = 60
    //         state.btnContent = "获取验证码"

    //     }
    // }
//    const sendCode = () => {
//         state.btnDisale = true
//         state.btnContent = "60s之内不能再次发送验证码"
//         render.timeChange = setInterval(clock, 1000)
//         console.log(state)
//     }
    


    // 忘记密码页面
    const ForgotPasswordPage = () => (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
                <Tooltip label={errors.email?.message} isOpen={Boolean(errors.email)} placement="right-end">
                    <FormControl id="email" isInvalid={Boolean(errors.email)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>邮箱</FormLabel>
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
                <Tooltip label={errors.emailCode?.message} isOpen={Boolean(errors.emailCode)} placement="right-end">
                    <FormControl id="emailCode" isInvalid={Boolean(errors.emailCode)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>验证码</FormLabel>
                        <MotionInput
                            name="emailCode"
                            type="emailCode"
                            autoComplete="emailCode"
                            {...register("emailCode")}
                            focusBorderColor="blue.500"
                            whileFocus={{scale: 1.05}}
                            w="300px"/>
                            <Button colorScheme='blue' left="5" bottom="1" spacing="4" width="40" onClick={sendCode}>{btnContent}</Button>
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
                <Tooltip label={errors.confirmPassword?.message} isOpen={Boolean(errors.confirmPassword)} placement="right-end">
                    <FormControl id="confirmPassword" isInvalid={Boolean(errors.confirmPassword)} isRequired>
                        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>确认密码</FormLabel>
                        <MotionInput
                            name="confirmPassword"
                            type="confirmPassword"
                            autoComplete="confirmPassword"
                            {...register("confirmPassword")}
                            focusBorderColor="blue.500"
                            whileFocus={{scale: 1.05}}
                            w="300px"/>
                    </FormControl>
                </Tooltip>
                <MotionButton type="submit" colorScheme="blue" size="lg" fontSize="md" backgroundImage="linear-gradient(to right, #7928CA, #FF0080)" w="300px" whileHover={{ scale: 1.05 }}>
                    确定
                </MotionButton>
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
                    <Heading mb="6" textAlign="center" size="xl" fontSize="lg" fontWeight="extrabold" color={colorMode === 'light' ? 'black' : 'white'}>
                        忘记密码
                    </Heading>
                    <Text mb="4" textAlign="center" fontSize="lg" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
                        请在下面进行密码的修改
                    </Text>
                    <ForgotPasswordPage/>
                </VStack>
            </MotionBox>
            <Box flex="1" width="100%" display="flex" justifyContent="center" alignItems="center">
                <Image src="https://images.unsplash.com/photo-1683369539069-2cc88ef28963?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" alt="Register" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            </Box>
        </Flex>
    );       

}



export default ForgotPasswordPage;

