import { useState, useCallback, memo } from "react";
import { Box, Text, VStack, Collapse, IconButton,Image } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

const LocationIcons = import.meta.glob("../assets/locations/*.svg", {
  eager: true,
  import: "default",
});

const AddressCard = memo(function AddressCard({
  address,
  addressNumber,
  mode,
  isExpanded,
  onToggle,
  lang,
  dir,
}) {
  const { name, location, latitude, longitude } = address;

  const mapSrc = `https://maps.google.com/maps?q=${latitude},${longitude}&t=k&z=16&ie=UTF8&iwloc=&output=embed`;
  const mapTitle = `Google Maps Satellite View for Address ${addressNumber}`;
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg={mode === "dark" ? "gray.700" : "gray.50"}
      borderColor={mode === "dark" ? "gray.600" : "gray.200"}
      style={{ direction: dir }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        onClick={onToggle}
        cursor="pointer"
        style={{ direction: dir }}
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color={mode === "dark" ? "white" : ""}
          style={{ direction: dir }}
        >
          {`${addressNumber}: ${name[lang]}`}
        </Text>
        <IconButton
          icon={isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          variant="ghost"
          size="sm"
          aria-label="Toggle Address Details"
        />
      </Box>
      <Collapse in={isExpanded} animateOpacity>
        <VStack align="stretch" spacing={2} mt={2}>
          <Text
            fontSize="md"
            color={mode === "dark" ? "white" : ""}
            style={{ direction: dir }}
          >
            {location[lang]}
          </Text>

          {/* Load Google Maps Satellite View when expanded */}
          <Box
            mt={2}
            height={{ base: "150px", md: "200px" }}
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="md"
            overflow="hidden"
          >
            <iframe
              title={mapTitle}
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Box>
          {/* <img width="100%" height="px" src={MaccaMap} /> */}
        </VStack>
      </Collapse>
    </Box>
  );
});
AddressCard.displayName = "AddressCard";

function AddressesList({ addresses, lang, dir, mode,modalBody }) {
  const [expandedAddresses, setExpandedAddresses] = useState({});

  const handleToggle = useCallback((index) => {
    setExpandedAddresses((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }, []);

  return (
    <Box overflowY="auto">
      <Image
        src={LocationIcons[modalBody]}
        fit="contain"
        maxH="300px"
        w="100%"
        bg="gray.100"
        fallback={
          <Box p={4} bg="gray.100" textAlign="center">
            Unable to load image
          </Box>
        }
        loading="lazy"
        transition="opacity 0.2s"
        _hover={{ opacity: 0.9 }}
      />

      {/* Addresses List Section */}
      <VStack mt={4} spacing={4} align="stretch">
        {addresses &&
          addresses.map((address, idx) => (
            <AddressCard
              key={address.id || idx}
              address={address}
              addressNumber={idx + 1}
              mode={mode}
              isExpanded={!!expandedAddresses[idx]}
              onToggle={() => handleToggle(idx)}
              lang={lang}
              dir={dir}
            />
          ))}
      </VStack>
    </Box>
  );
}

export default AddressesList;
