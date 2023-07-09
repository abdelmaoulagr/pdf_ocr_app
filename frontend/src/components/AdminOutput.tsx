import React, { useState } from "react";
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
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
} from "@chakra-ui/react";

interface LoiCardsProps {
  lois: {
    loi: string;
    [key: string]: string;
  }[];
}

const LoiCards: React.FC<LoiCardsProps> = ({ lois }) => {
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  const [editedLois, setEditedLois] = useState<{ [key: string]: string }[]>([]);
  const [hiddenCards, setHiddenCards] = useState<boolean[]>(
    Array(lois.length).fill(false)
  );

  const handleEditClick = (index: number) => {
    setEditMode((prevEditMode) => ({ ...prevEditMode, [index]: true }));

    const updatedHiddenCards = [...hiddenCards];
    updatedHiddenCards[index] = false;
    setHiddenCards(updatedHiddenCards);

    const loi = lois[index];
    const editedLoi = { ...loi };
    delete editedLoi.loi;

    setEditedLois((prevEditedLois) => [
      ...prevEditedLois.slice(0, index),
      editedLoi,
      ...prevEditedLois.slice(index + 1),
    ]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    key: string
  ) => {
    const updatedLoi = { ...editedLois[index], [key]: event.target.value };
    setEditedLois((prevEditedLois) => [
      ...prevEditedLois.slice(0, index),
      updatedLoi,
      ...prevEditedLois.slice(index + 1),
    ]);
  };

  const handleCancelClick = () => {
    setEditMode({});
    setEditedLois([]);
  };

  const handleSubmitClick = () => {
    // Handle the submission of editedLois data
    console.log("Edited Loi Data:", editedLois);
    setEditMode({});
    setEditedLois([]);
  };

  const generateOutput = (loi: { [key: string]: string }) => {
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

  const editButtonStyle = {
    position: "absolute",
    top: "10px",
    right: "70px",
    color: "black",
  };

  const submitButtonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    colorScheme: "teal",
  };

  const cancelButtonStyle = {
    position: "absolute",
    bottom: "10px",
    right: "90px",
    colorScheme: "red",
  };
  const renderLois = () => {
    if (lois.length === 0) {
      // Render skeleton or empty state when there are no lois
      return (
        <Card>
          <CardHeader>
            <Heading size="lg">No lois available</Heading>
          </CardHeader>
        </Card>
      );
    }

    return (
      <div>
        {lois.map((loi, loiIndex) => {
          const isEditMode = editMode[loiIndex];
          const editedLoi = editedLois[loiIndex] || {};

          return (
            !hiddenCards[loiIndex] && (
              <div
                key={`loi-${loiIndex}`}
                style={{ position: "relative", marginBottom: 30 }}
              >
                <Card>
                  <CardHeader>
                    <Heading size="lg">Loi {loi.loi}</Heading>
                    {!isEditMode && (
                      <Button
                        size="sm"
                        style={copyButtonStyle}
                        onClick={() =>
                          setHiddenCards((prevHiddenCards) => [
                            ...prevHiddenCards.slice(0, loiIndex),
                            true,
                            ...prevHiddenCards.slice(loiIndex + 1),
                          ])
                        }
                      >
                        {hiddenCards[loiIndex] ? "Show" : "Delete"}
                      </Button>
                    )}
                  </CardHeader>
                  <CardBody>
                    {Object.keys(loi).map((articleKey) => {
                      if (articleKey !== "loi") {
                        const isEditable =
                          isEditMode && editedLoi.hasOwnProperty(articleKey);
                        const value = isEditable
                          ? editedLoi[articleKey]
                          : loi[articleKey];
                        return (
                          <Card
                            key={`loi-${loiIndex}-section-${articleKey}`}
                            style={{ marginBottom: 2 }}
                          >
                            <CardHeader>
                              <Heading size="md">{articleKey}</Heading>
                            </CardHeader>
                            <CardBody>
                              {isEditable ? (
                                <Input
                                  value={value}
                                  onChange={(e) =>
                                    handleInputChange(e, loiIndex, articleKey)
                                  }
                                />
                              ) : (
                                <>
                                  <Editable defaultValue={value}>
                                    <EditablePreview />
                                    <EditableTextarea />
                                  </Editable>
                                </>
                              )}
                            </CardBody>
                          </Card>
                        );
                      }
                      return null;
                    })}
                  </CardBody>
                </Card>
              </div>
            )
          );
        })}
        {Object.keys(editMode).length > 0 && (
          <HStack spacing={2} position="fixed" bottom={10} right={10}>
            <Button style={cancelButtonStyle} onClick={handleCancelClick}>
              Cancel
            </Button>
            <Button style={submitButtonStyle} onClick={handleSubmitClick}>
              Submit
            </Button>
          </HStack>
        )}
      </div>
    );
  };
  return <>{renderLois()}</>;
};

export default LoiCards;
