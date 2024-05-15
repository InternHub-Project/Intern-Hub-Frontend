import { ActionIcon, Box, Container, Group, rem, Text } from "@mantine/core";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";
// import image from "../logo/WhatsApp_Image_2024-03-18_at_05.38.27_e1f021fa-removebg-preview.png";
const data = [
  {
    title: "About",
    links: [
      { label: "Features", link: "#" },
      { label: "Pricing", link: "#" },
      { label: "Support", link: "#" },
      { label: "Forums", link: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Contribute", link: "#" },
      { label: "Media assets", link: "#" },
      { label: "Changelog", link: "#" },
      { label: "Releases", link: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Join Discord", link: "#" },
      { label: "Follow on Twitter", link: "#" },
      { label: "Email newsletter", link: "#" },
      { label: "GitHub discussions", link: "#" },
    ],
  },
];

export function Footer() {
  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
        c={"white"}
      >
        {link.label}
      </Text>
    ));

    return (
      <div
        className={classes.wrapper}
        key={group.title}
        style={{ color: "white" }}
      >
        <Text className={classes.title} c={"white"}>
          {group.title}
        </Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Box
            onClick={() => {
              location.href = "/";
            }}
            me={50}
            display={"flex"}
            style={{ alignItems: "center", cursor: "pointer" }}
          >
            <img
              src={
                "https://ik.imagekit.io/abdullahAhmed/internHub/internHub-logo/WhatsApp%20Image%202024-03-18%20at%2005.38.20_3fcc86b6.png?updatedAt=1714340539082"
              }
              alt=""
              width={"150px"}
              height={"100px"}
            />
            <Box ml={-50}>
              <Text className={classes.inter} fz={25} fw={700}>
                Intern
              </Text>
              <Text
                className={classes.hub}
                c={"white"}
                fz={25}
                fw={700}
                mt={-13}
              >
                Hub
              </Text>
            </Box>
          </Box>
          <Text
            ta={"center"}
            size="xs"
            c="white"
            className={classes.description}
          >
            Build fully functional accessible web applications faster than ever
          </Text>
        </div>

        <div className={classes.groups} style={{ color: "white" }}>
          {groups}
        </div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text c="white" size="sm">
          © 2020 mantine.dev. All rights reserved.
        </Text>

        <Group
          gap={0}
          className={classes.social}
          justify="flex-end"
          wrap="nowrap"
        >
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandTwitter
              style={{ width: rem(20), height: rem(20) }}
              stroke={2.0}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandYoutube
              style={{ width: rem(20), height: rem(20) }}
              stroke={2.0}
            />
          </ActionIcon>
          <ActionIcon size="lg" color="white" variant="subtle">
            <IconBrandInstagram
              style={{ width: rem(20), height: rem(20) }}
              stroke={2.0}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
