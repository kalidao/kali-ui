import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
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
        <Link href="/tools">
          <a>
            <MenuItem color="kali.800">Tools</MenuItem>
          </a>
        </Link>
        <Link href="https://www.lexdao.coop/#/directory">
          <a>
            <MenuItem color="kali.800">LexDAO Directory</MenuItem>
          </a>
        </Link>
        <a
          href="https://docs.kalidao.xyz/faq/"
          target="_blank"
          rel="noreferrer"
        >
          <MenuItem color="kali.800">FAQs</MenuItem>
        </a>
        <a href="https://docs.kalidao.xyz/" target="_blank" rel="noreferrer">
          <MenuItem color="kali.800">Docs</MenuItem>
        </a>
        <a
          href="https://discord.com/invite/UKCS9ghzUE"
          target="_blank"
          rel="noreferrer"
        >
          <MenuItem color="kali.800">Support</MenuItem>
        </a>
      </MenuList>
    </Menu>
  );
}
