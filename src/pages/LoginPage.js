import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast, Tooltip, IconButton, useColorMode, Checkbox, Link, Image, Flex, Text, HStack, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaMoon, FaSun, FaGoogle } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionInput = motion(Input);
const MotionButton = motion(Button);

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

  const onSubmit = async (data) => {
    toast({
      title: "登录成功",
      description: `欢迎回来，${data.email}!`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRegister = () => {
    toast({
      title: "注册",
      description: "正在导航到注册页面...",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google 登录",
      description: "正在跳转到Google登录页面...",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const FormComponent = () => (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Tooltip label={errors.email?.message} isOpen={Boolean(errors.email)} placement="right-end">
          <FormControl id="email" isInvalid={Boolean(errors.email)}>
            <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>电子邮件地址</FormLabel>
            <MotionInput
              name="email"
              type="email"
              autoComplete="email"
              {...register('email')}
              focusBorderColor="blue.500"
              whileFocus={{ scale: 1.05 }}
              w="300px"
            />
          </FormControl>
        </Tooltip>
        <Tooltip label={errors.password?.message} isOpen={Boolean(errors.password)} placement="right-end">
          <FormControl id="password" isInvalid={Boolean(errors.password)}>
            <FormLabel color={colorMode === 'light' ? 'black' : 'white'}>密码</FormLabel>
            <MotionInput
              name="password"
              type="password"
              autoComplete="password"
              {...register('password')}
              focusBorderColor="blue.500"
              whileFocus={{ scale: 1.05 }}
              w="300px"
            />
          </FormControl>
        </Tooltip>
        <HStack justify="space-between" w="300px">
          <Checkbox colorScheme="blue" defaultIsChecked>保持登录状态</Checkbox>
          <Link color="blue.500">忘记密码?</Link>
        </HStack>
        <MotionButton type="submit" colorScheme="blue" size="lg" fontSize="md" backgroundImage="linear-gradient(to right, #7928CA, #FF0080)" w="300px" whileHover={{ scale: 1.05 }}>
          登录
        </MotionButton>
        <Text mt="4" textAlign="center" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>如果没有账号，<Link color="blue.500" onClick={handleRegister}>注册</Link></Text>
      </Stack>
    </form>
  );

  return (
    <Flex h="100vh" bg={colorMode === 'light' ? 'gray.100' : 'gray.800'} justifyContent="center" alignItems="center">
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
            登录到您的账户
          </Heading>
          <Text mb="4" textAlign="center" fontSize="lg" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
            输入您的电子邮件和密码进行登录
          </Text>
          <MotionButton leftIcon={<FaGoogle />} colorScheme="blue" variant="solid" mb="4" w="300px" onClick={handleGoogleSignIn} whileHover={{ scale: 1.05 }}>
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

