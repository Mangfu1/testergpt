import { Button, Modal, ModalContent, ModalHeader, MenuItem, ModalOverlay, useDisclosure, ModalCloseButton, ModalBody, ModalFooter, Avatar, Wrap, WrapItem, List, ListItem, Text } from '@chakra-ui/react';
import TextEdit from "../components/TextEdit"



function PersonalInformationPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <MenuItem onClick={onOpen}>个人信息</MenuItem>
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
                邮箱: <TextEdit text={props.email}/>
              </ListItem>
              <ListItem>
                姓名: <TextEdit text={props.name}/>
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
