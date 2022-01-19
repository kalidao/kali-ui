import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  IconButton,
} from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";

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
        <MenuItem color="kali.800">My DAOs</MenuItem>

        <MenuItem color="kali.800">FAQs</MenuItem>
        <MenuItem color="kali.800">Docs</MenuItem>
        <MenuItem color="kali.800">Support</MenuItem>
      </MenuList>
    </Menu>
  );
}
