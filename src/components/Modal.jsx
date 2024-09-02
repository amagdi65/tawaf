import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
} from "@chakra-ui/react";

function SimpleModal({
  isOpen,
  onClose,
  closeTitle,
  modalTitle,
  modalBody,
  mode,
}) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={mode === "dark" ? "#2C3743" : ""}>
          <ModalCloseButton color={ "#BC9761"} />

          <ModalHeader
            color={ "#BC9761" }
            style={{ direction: "ltr" }}
          >
            {modalTitle}
          </ModalHeader>
          <ModalBody>
            <Image src={modalBody} />
          </ModalBody>
          <ModalFooter>
            <Button
              bgColor={mode === "dark" ? "#232C35" : "#ededed"}
              color="#BC9761"
              mr={3}
              onClick={onClose}
            >
              {closeTitle}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SimpleModal;
