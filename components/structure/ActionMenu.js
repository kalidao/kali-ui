import { useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { BrowserView, MobileView } from "react-device-detect";
import { Button, Center, HStack, VStack, Container } from "@chakra-ui/react";
import { BiGridAlt, BiEdit} from "react-icons/bi";
import { RiStackLine } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";

const ActionButton = (props) => {
  return (
    <Button
      leftIcon={props.icon}
      onClick={props.onClick}
      backgroundColor={props.backgroundColor}
      border="none"
    >
      {props.children}
    </Button>
  );
};

const actions = [
  {
    name: "Dashboard",
    icon: <BiGridAlt />,
  },
  {
    name: "Proposals",
    icon: <RiStackLine />,
  },
  {
    name: "New Proposal",
    icon: <BiEdit />,
  },
];

export default function ActionMenu(props) {
  const value = useContext(AppContext);
  const { visibleView, remount } = value.state;

  const handleClick = (id) => {
    value.setVisibleView(id);
    value.setRemount(remount+1);
    console.log(remount, "remount")
  };

  return (
      <>
        <BrowserView>
          <VStack id="action-menu" gap={3}>
         {actions.map((item, index) => (
           <ActionButton
             onClick={() => handleClick(index+1)}
             backgroundColor={visibleView == index + 1 ? "#eeeeee" : "none"}
             icon={item.icon}
             key={index}
           >
             {item.name}
           </ActionButton>
         ))}
         </VStack>
        </BrowserView>

        <MobileView>
          <HStack id="mobile-menu" width="100%" alignItems="center">
         {actions.map((item, index) => (
           <Button
              className="transparent-btn"
             size="sm"
             onClick={() => handleClick(index+1)}
             backgroundColor={visibleView == index + 1 ? "#eeeeee" : "none"}
             icon={item.icon}
             key={index}
             border="none"
           >
             {item.name}
           </Button>
         ))}
         </HStack>
        </MobileView>
      </>
  );
}
