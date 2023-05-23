import { Box, Button, Modal, ModalContent, ModalHeader, ModalOverlay, useDisclosure, ModalCloseButton, ModalBody, ModalFooter, Avatar, Wrap, WrapItem, List, ListItem, ListIcon, MdCheckCircle } from '@chakra-ui/react';

function PersonalInformationPage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>个人信息</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader>个人信息</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Wrap>
              <WrapItem>
              <Avatar name='Dan Abrahmov' src='https://bit.ly/naruto-sage' />
              </WrapItem>
            </Wrap>
            
            <List spacing={3}>
              <ListItem>
                邮箱: 1@1
              </ListItem>
              <ListItem>
                姓名: 陈前
              </ListItem>
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              关闭
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

    
  )
}

export default PersonalInformationPage;
