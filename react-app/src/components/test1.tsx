import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Box,
  Stack,
  StackDivider,
  Text,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface LoiCardsProps {
  lois: {
    loi: string;
    [key: string]: {
      title: string;
      [key: string]: string;
    };
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
        const section = loi[key];
        output += `${section.title}\n`;
        Object.keys(section).forEach((articleKey) => {
          if (articleKey !== "title") {
            output += `${articleKey}: ${section[articleKey]}\n`;
          }
        });
        output += "\n";
      }
    });

    return output;
  };

  const copyButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    colore: "black",
  };

  return (
    <div>
      {lois.map((loi, loiIndex) => {
        return (
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
            </Card>
            <hr style={{ color: "black", height: 2, margin: 0 }} />
            {Object.keys(loi).map((sectionKey) => {
              if (sectionKey !== "loi") {
                const section = loi[sectionKey];
                return (
                  <Card
                    key={`loi-${loiIndex}-section-${sectionKey}`}
                    style={{ marginBottom: 2 }}
                  >
                    <CardHeader>
                      <Heading size="md">{section.title}</Heading>
                    </CardHeader>
                    <CardBody>
                      <Stack divider={<StackDivider />} spacing="4">
                        {Object.keys(section).map((articleKey) => {
                          if (articleKey !== "title") {
                            return (
                              <Box key={articleKey}>
                                <Heading size="xs" textTransform="uppercase">
                                  {articleKey}
                                </Heading>
                                <Text pt="2" fontSize="sm">
                                  {section[articleKey]}
                                </Text>
                              </Box>
                            );
                          }
                          return null;
                        })}
                      </Stack>
                    </CardBody>
                  </Card>
                );
              }
              return null;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default LoiCards;
