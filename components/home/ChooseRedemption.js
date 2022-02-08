import { useState, useEffect } from "react";
import { HStack, Checkbox, VStack, Text } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import InfoTip from "../elements/InfoTip";
import DateSelect from "../elements/DateSelect";

function ChooseRedemption({ details, setDetails }) {
  const [redemption, setRedemption] = useState(
    details["extensions"]["redemption"]["active"]
  );

  const nowRedemption = new Date();
  const [redemptionStart, setRedemptionStart] = useState(
    nowRedemption.setDate(
      nowRedemption.getDate() +
        details["extensions"]["redemption"]["redemptionStart"]
    )
  );

  useEffect(() => {
    details["extensions"]["redemption"]["active"] = redemption;
    details["extensions"]["redemption"]["redemptionStart"] = redemptionStart;
    setDetails(details);
  }, [redemption, redemptionStart]);

  return (
    <>
      <HStack>
        <Checkbox
          name="redemption"
          value="redemption"
          size="sm"
          defaultValue={redemption}
          isChecked={redemption}
          onChange={() => setRedemption(!redemption)}
        >
          <Text fontSize="sm">Redemption</Text>
        </Checkbox>
        <InfoTip
          label={
            "Members can burn their DAO tokens to claim proportional share of DAO 🔥"
          }
        />
      </HStack>
      {redemption ? (
        <VStack>
          <Text fontSize="sm" htmlFor="redemptionStart">
            When should redemption start?
          </Text>
          <ReactDatePicker
            id="date-picker"
            selected={redemptionStart}
            onChange={(date) => setRedemptionStart(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </VStack>
      ) : null}
    </>
  );
}

export default ChooseRedemption;
