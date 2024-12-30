import { CloseButton, Text } from "@chakra-ui/react";
import { mainData } from "../data/metaData/mainData";

export const  CustomToast = ({ dir, mode, lang, messageKey, onClose }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: dir === 'ltr' ? 'flex-start' : 'flex-end',
        textAlign: dir === 'ltr' ? 'left' : 'right',
        direction: dir,
        backgroundColor: mode === "dark" ? "#2D3748" : "#EDF2F7",
        color: mode === "dark" ? "#E2E8F0" : "#2D3748",
        padding: "12px 16px",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <Text  mt={4} style={{ flex: 1 , direction: dir}}>{mainData[lang][messageKey]}</Text>
      <CloseButton
        size="sm"
        onClick={onClose}
        aria-label="Close notification"
        style={{ marginLeft: "8px", position: "absolute", top: "8px", right: "8px", padding: "8px"}}
      />
    </div>
  );
  