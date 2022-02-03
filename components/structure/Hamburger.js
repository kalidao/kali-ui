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
        <MenuItem color="kali.800">FAQs</MenuItem>
        <MenuItem color="kali.800">Docs</MenuItem>
        <MenuItem color="kali.800">Support</MenuItem>
      </MenuList>
    </Menu>
  );
}
