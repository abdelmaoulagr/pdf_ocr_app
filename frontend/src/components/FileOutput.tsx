import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Heading,
} from "@chakra-ui/react";


function FileOutput({ data }) {
  const { title, text } = data;

  return (
    <Card style={{ height: "100%" }}>
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Box>
          <Text pt="2" fontSize="md">
            {text}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
}

export default FileOutput;
