import { Button, HStack, Input, Popover, PopoverAnchor, PopoverTrigger, useBoolean } from "@chakra-ui/react";


function TextEdit(props) {
    const [isEditing, setIsEditing] = useBoolean()

    return(
        <Popover
            isOpen={isEditing}
            onOpen={setIsEditing.on}
            onClose={setIsEditing.off}
            isLazy
            lazyBehavior='keepMounted'
        >
            <HStack>
                <PopoverAnchor>
                    <Input
                        w="auto"
                        display="inline-flex"
                        isDisabled={!isEditing}
                        defaultValue={props.text}
                    />
                </PopoverAnchor>
                <PopoverTrigger>
                    <Button h="40px">
                        {isEditing ? "保存" : "编辑"}
                    </Button>
                </PopoverTrigger>
            </HStack>
        </Popover>
    )
}


export default TextEdit


