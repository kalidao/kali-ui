import { useEffect, useState } from "react";
import { HStack, Checkbox, Text, VStack } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import InfoTip from "../elements/InfoTip";
import DateSelect from "../elements/DateSelect";

function ChooseCrowdsale({ details, setDetails }) {
  const [crowdsale, setCrowdsale] = useState(
    details["extensions"]["crowdsale"]["active"]
  );

  // sale date conversion
  const nowSale = new Date();
  const [saleEnds, setSaleEnds] = useState(
    nowSale.setDate(
      nowSale.getDate() + details["extensions"]["crowdsale"]["saleEnds"]
    )
  );

  useEffect(() => {
    details["extensions"]["crowdsale"]["active"] = crowdsale;
    details["extensions"]["crowdsale"]["saleEnds"] = saleEnds;
    setDetails(details);
  }, [crowdsale, saleEnds]);

  return (
    <>
      <HStack>
        <Checkbox
          name="crowdsale"
          value="crowdsale"
          size="sm"
          isChecked={crowdsale}
          defaultValue={crowdsale}
          onChange={() => setCrowdsale(!crowdsale)}
        >
          <Text fontSize="sm">Crowdsale</Text>
        </Checkbox>
        <InfoTip label={"Sell DAO token for ETH or any ERC20 tokens 🚀"} />
      </HStack>
      {crowdsale ? (
        <VStack>
          <Text fontSize="sm" htmlFor="saleEnds">
            When should the crowdsale end?
          </Text>
          <ReactDatePicker
            id="date-picker"
            selected={saleEnds}
            onChange={(date) => setSaleEnds(date)}
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

export default ChooseCrowdsale;
