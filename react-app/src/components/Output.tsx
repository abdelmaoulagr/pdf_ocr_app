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
} from "@chakra-ui/react";
import Test from "./test";
function Output() {
  var Loi = Test();
  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="lg">Loi n: {Loi["loi"]}</Heading>
        </CardHeader>
      </Card>
      <hr style={{ color: "black", height: 2, margin: 0 }} />
      <Card style={{ marginBottom: 20 }}>
        <CardHeader>
          <Heading size="md">Client Report</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Summary
              </Heading>
              <Text pt="2" fontSize="sm">
                View a summary of all your clients over the last month.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Overview
              </Heading>
              <Text pt="2" fontSize="sm">
                Check out the overview of your clients.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Analysis
              </Heading>
              <Text pt="2" fontSize="sm">
                See a detailed analysis of all your business clients.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}
export default Output;
