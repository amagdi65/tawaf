import location from "../assets/location-dot-solid.svg";
import locationBlack from "../assets/location-black.svg";
import SimpleModal from "./Modal";
import { Image, Text, useDisclosure } from "@chakra-ui/react";


function Location({
  modalTitle,
  closeTitle,
  modalBody,
  addresses,
  lang,
  mode,
  dir,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {modalBody && (
        <>
          <Text
            color="white"
            style={{
              color: mode === "dark" ? "white" : "#333D49",
              fontSize: "13px",
            }}
          >
            {modalTitle}
          </Text>
          <Image
            src={mode === "dark" ? locationBlack : location}
            alt="Decrease font size"
            onClick={onOpen}
            cursor="pointer"
            position="relative"
            boxSize={{ base: "28px", md: "42px" }}
            mr={2}
          />
        </>
      )}
      <SimpleModal
        onClose={onClose}
        isOpen={isOpen}
        mode={mode}
        modalBody={modalBody}
        modalTitle={modalTitle}
        closeTitle={closeTitle}
        addresses={addresses}
        lang={lang}
        dir={dir}
      ></SimpleModal>
    </>
  );
}

export default Location;
