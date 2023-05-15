import * as React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import LoginPage from './pages/LoginPage';
function App() {
  return (
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>
  )
}

export default App
