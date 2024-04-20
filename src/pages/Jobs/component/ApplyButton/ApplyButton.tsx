import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Text,
  Box,
  rem,
  Textarea,
  Divider,
} from "@mantine/core";
import classes from "./ApplyButton.module.css";
import React, { useEffect } from "react";
import { IconCopy, IconFileCv } from "@tabler/icons-react";
// import { useState } from 'react';
import { FileButton, Group } from "@mantine/core";
import { useState, useRef } from "react";

export default function ApplyButton({ companyNameJob, nameJob }) {
  const [opened, { open, close }] = useDisclosure(false);

  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const iconCV = (
    <IconFileCv style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const title = (
    <Box className={classes.containerHeader}>
      <Text fz={"19px"} fw={600}>
        Applying for {nameJob} job
      </Text>
      <Text fz={"15px"} c={"#454545"}>
        {companyNameJob}
      </Text>
    </Box>
  );

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        position="right"
        size="lg"
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
        opened={opened}
        onClose={close}
        title={title}
        styles={{
          header: {
            padding: "10px",
            backgroundColor: "rgb(244 244 244)",
            borderBottom: "rgb(201,201,201) solid 1px",
          },
          inner:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          },
          content:{
            marginRight:"30px"
          }
        }}
       
        style={{marginLeft:"10px" , marginRight:"10px"}}
      >
        <form>
          <Box>
            <Box mt={10}>
              <Text fz={"19px"} fw={600}>
                Your Resume.{" "}
                <span style={{ color: "#454545", fontSize: "12px" }}>
                  Updated recently
                </span>
              </Text>
              <Text fz={"15px"} c={"#454545"}>
                Your current resume will be submitted along with this
                application.{" "}
                <span
                  style={{
                    color: "rgb(0,139,220)",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  Edit resume
                </span>
              </Text>
            </Box>

            <Box mt={20}>
              <Text fz={"19px"} fw={600}>
                Cover letter
              </Text>
              <Text fz={"15px"} c={"#454545"}>
                Why should you be heired for this role?
              </Text>
              <Text mb={10} mt={5} fz={"15px"} c={"rgb(0,139,220)"}>
                <IconCopy
                  style={{ width: rem(15), height: rem(15) }}
                  stroke={1.5}
                />{" "}
                Copy from your last application & edit
              </Text>

              <Textarea
                autosize
                minRows={5}
                resize="vertical"
                placeholder="Mention in detail what relevant skills or past experience you have for this job. what excites you about this job? why would you be a good fit?"
              />
            </Box>

            <Box mt={20}>
              <Text fz={"19px"} fw={600}>
                Your availability
              </Text>
              <Text my={5} fz={"15px"} c={"rgb(18 17 17)"}>
                confirm your availability
              </Text>
              <input type="radio" id="yes" name="availability" />
              <label
                style={{ color: "#454545", fontSize: "15px" }}
                htmlFor="yes"
              >
                Yes, i'am availability to join immediately
              </label>
              <br />
              <input type="radio" id="no" name="availability" />
              <label
                style={{ color: "#454545", fontSize: "15px", marginTop: "5px" }}
                htmlFor="no"
              >
                No{" "}
                <span style={{ color: "rgb(112 112 112 / 92%)" }}>
                  (please specify your availability)
                </span>
              </label>
            </Box>

            <Box mt={20}>
              <Text fz={"19px"} fw={600}>
                Custom resume{" "}
                <span
                  style={{ color: "rgb(112 112 112 / 92%)", fontSize: "14px" }}
                >
                  (Optional)
                </span>
              </Text>
              <Text mt={3} mb={10} fz={"15px"} c={"#454545"}>
                Employer can download and view this resume
              </Text>

              <Group justify="start">
                <FileButton resetRef={resetRef} onChange={setFile} accept="pdf">
                  {(props) => <Button {...props}>Upload file</Button>}
                </FileButton>
                <Button disabled={!file} color="red" onClick={clearFile}>
                  Reset
                </Button>
              </Group>

              {file && (
                <Text size="sm" ta="start" mt="sm">
                  Picked file: {file.name}
                </Text>
              )}
            </Box>
          </Box>
          <Divider my="md" />

          <Box ta={"end"}>
            <Button
              mr={15}
              // type="reset"
              variant="transparent"
              onClick={close}
            >
              Back
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </form>
      </Drawer>

      <div style={{ textAlign: "center" }}>
        <Button
          onClick={open}
          // type="submit"
          // onClick={() => submitJob()}
          bg={"rgb(0,165,236)"}
          size="lg"
        >
          Apply now
        </Button>
      </div>
    </>
  );
}
