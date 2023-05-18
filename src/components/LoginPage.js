import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast, Tooltip, IconButton, useColorMode, Checkbox, Link, Image, Flex, Text, HStack, VStack, FormErrorMessage, InputGroup, InputRightElement } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaMoon, FaSun, FaGoogle } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate  } from 'react-router-dom';

import { AiOutlineGoogle } from "react-icons/ai"; //谷歌图标

import HomePage from '../components/HomePage';

const MotionBox = motion(Box);
const MotionInput = motion(Input);
const MotionButton = motion(Button);
const MotionFormErrorMessage = motion(FormErrorMessage);

const schema = yup.object().shape({
  email: yup.string().email('无效的电子邮件').required('电子邮件是必填项'),
  password: yup.string().min(8, '密码至少需要8个字符').required('密码是必填项'),
});

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate  = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    if (data.email === '1@1' && data.password === '12345678') {
      toast({
        title: "登录成功",
        description: `欢迎回来，${data.email}!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        position: "bottom-left",
        transition: "slide",
      });
      login();
      navigate('/home');

    } else {
      toast({
        title: "登录失败",
        description: "电子邮件或密码错误",
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        position: "bottom-left",
        transition: "slide",
      });
    }
  };

  const handleRegister = () => {
    toast({
      title: "注册",
      description: "正在导航到注册页面...",
      status: "info",
      duration: 5000,
      isClosable: true,
      variant: "subtle",
      position: "bottom-left",
      transition: "slide",
    });
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google 登录",
      description: "正在跳转到Google登录页面...",
      status: "info",
      duration: 5000,
      isClosable: true,
      variant: "subtle",
      position: "bottom-left",
      transition: "slide",
    });
  };

  const FormComponent = () => (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing="6">
      <FormControl id="email" isInvalid={Boolean(errors.email)}>
        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>电子邮件地址</FormLabel>
        <MotionInput
          name="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          focusBorderColor="blue.500"
          whileFocus={{ scale: 1.05 }}
          w="350px"
        />
        {errors.email ? (
          <MotionFormErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errors.email.message}
          </MotionFormErrorMessage>
        ) : (
          <Box height="1.3em" visibility="hidden"></Box>
        )}
      </FormControl>

      <FormControl id="password" isInvalid={Boolean(errors.password)}>
        <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>密码</FormLabel>
        <InputGroup size="md">
          <MotionInput
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="password"
            {...register('password')}
            focusBorderColor="blue.500"
            whileFocus={{ scale: 1.05 }}
            w="350px"
          />
          <InputRightElement width="4.5rem">
            <IconButton h="1.75rem" size="sm" onClick={(e) => { e.preventDefault(); setShowPassword(!showPassword); }}>
              <motion.div animate={{ rotate: showPassword ? 180 : 0 }}>
                {showPassword ? <ViewOffIcon /> : <ViewIcon />}
              </motion.div>
            </IconButton>
          </InputRightElement>
        </InputGroup>
        {errors.password ? (
          <MotionFormErrorMessage
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {errors.password.message}
          </MotionFormErrorMessage>
        ) : (
          <Box height="1.3em" visibility="hidden"></Box>
        )}
      </FormControl>

      <HStack justify="space-between" w="350px">
      <Checkbox colorScheme="blue" defaultChecked>保持登录状态</Checkbox>
        <Link color="blue.500">忘记密码?</Link>
      </HStack>
      <MotionButton type="submit" colorScheme="blue" size="lg" fontSize="md" backgroundImage="linear-gradient(to right, #7928CA, #FF0080)" w="350px" whileHover={{ scale: 1.05 }}>
        登录
      </MotionButton>
      <Text mt="4" textAlign="center" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>如果没有账号，<Link color="blue.500" onClick={handleRegister}>注册</Link></Text>
    </Stack>
  </form>
);

return (
  <Flex h="100vh" bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} justifyContent="center" alignItems="center" overflow="hidden">
    <MotionBox flex="1" p="10" bg={colorMode === 'light' ? 'white' : 'gray.700'} borderRadius="md" boxShadow="md">
      <IconButton
        position="fixed"
        top="1rem"
        right="1rem"
        aria-label="Toggle color mode" 
        icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
      />
        <VStack alignItems="center" justifyContent="center" spacing="6">
          <Heading mb="6" textAlign="center" size="xl" fontWeight="extrabold" color={colorMode === 'light' ? 'black' : 'white'}>
          登录
          </Heading>
          <Text mb="4" textAlign="center" fontSize="lg" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
            输入您的电子邮件和密码进行登录
          </Text>
          <MotionButton leftIcon={<AiOutlineGoogle />} colorScheme="blue" variant="solid" mb="4" w="350px" onClick={handleGoogleSignIn} whileHover={{ scale: 1.05 }}>
            使用 Google 账号登录
          </MotionButton>
          <FormComponent />
        </VStack>
      </MotionBox>
    <Box flex="1" width="100%" display="flex" justifyContent="center" alignItems="center">
      <Image src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=910&q=80" alt="Sign in" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>
    </Flex>
  );
};

export default LoginPage;