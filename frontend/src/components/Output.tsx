import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
  Button,
} from "@chakra-ui/react";
import { borderRadius } from "@mui/system";
import React from "react";

interface LoiCardsProps {
  lois: {
    loi: string;
    [key: string]: string;
  }[];
}

const LoiCards: React.FC<LoiCardsProps> = ({ lois }) => {
  const handleCopyClick = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        console.log("Content copied to clipboard:", content);
      })
      .catch((error) => {
        console.error("Failed to copy content to clipboard:", error);
      });
  };

  const generateOutput = (loi: any) => {
    let output = `Loi n: ${loi.loi}\n\n`;

    Object.keys(loi).forEach((key) => {
      if (key !== "loi") {
        output += `${key}: ${loi[key]}\n\n`;
      }
    });

    return output;
  };

  const copyButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "black",
  };

  return (
    <div>
      {lois.map((loi, loiIndex) => (
        <div
          key={`loi-${loiIndex}`}
          style={{ position: "relative", marginBottom: 30 }}
        >
          <Card>
            <CardHeader>
              <Heading size="lg">Loi n: {loi.loi}</Heading>
              <div style={copyButtonStyle}>
                <Button
                  size="sm"
                  onClick={() => handleCopyClick(generateOutput(loi))}
                >
                  Copy
                </Button>
              </div>
            </CardHeader>
            <CardBody>
              {Object.keys(loi).map((articleKey) => {
                if (articleKey !== "loi") {
                  return (
                    <Card
                      key={`loi-${loiIndex}-section-${articleKey}`}
                      style={{ marginBottom: 2 }}
                    >
                      <CardHeader>
                        <Heading size="md">{articleKey}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text pt="2" fontSize="sm">
                          {loi[articleKey]}
                        </Text>
                      </CardBody>
                    </Card>
                  );
                }
                return null;
              })}
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default LoiCards;
