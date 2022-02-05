import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
  Link as ChakraLink,
  Spacer,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";

export default function Hamburger() {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label="Information Menu"
        icon={<TiThMenu />}
        variant="none"
        border="none"
        transition="all 0.2s"
      />
      <MenuList>
        <Link href="/my-daos">
          <a>
            <MenuItem color="kali.800">My DAOs</MenuItem>
          </a>
        </Link>
        <a
          href="https://docs.kalidao.xyz/faq/"
          target="_blank"
          rel="noreferrer noopener"
        >

          <MenuItem color="kali.800">
            FAQs <Spacer />
            <HiOutlineExternalLink />
          </MenuItem>
        </a>
        <a
          href="https://docs.kalidao.xyz/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <MenuItem color="kali.800">
            Docs <Spacer />
            <HiOutlineExternalLink />
          </MenuItem>
        </a>
        <a
          href="https://discord.com/invite/UKCS9ghzUE"
          target="_blank"
          rel="noreferrer noopener"
        >
          <MenuItem color="kali.800">
            Support
            <Spacer />
            <HiOutlineExternalLink />
          </MenuItem>
        </a>
      </MenuList>
    </Menu>
  );
}
