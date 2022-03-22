import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Input, Button } from "@chakra-ui/react";
import { createToast } from "../../utils/toast";
import tribAbi from "../../abi/KaliDAOtribute.json";

export default function ProcessModule(props) {
  const value = useContext(AppContext);
  const { web3, loading, account, abi, address, dao } = value.state;
  const tribAddress = dao["extensions"]["tribute"]["address"];
  const p = props["p"];
  const i = props["i"];
  var disabled = true;
  if (i == 0) {
    disabled = false;
  }

  const process = async (event) => {
    event.preventDefault();
    value.setLoading(true);

    if (p["proposer"] === tribAddress) {
      try {
        const tribContract = new web3.eth.Contract(tribAbi, tribAddress);
        // console.log(p["id"].toString(), dao["address"], account, tribAddress);
        let result = await tribContract.methods
          .releaseTributeProposalAndProcess(dao["address"], p["id"])
          .send({ from: account });
        console.log(
          "This is result from processing tribute proposal - ",
          result
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        let object = event.target;
        var array = [];
        for (let i = 0; i < object.length; i++) {
          array[object[i].name] = object[i].value;
        }

        const { dao, id } = array;

        try {
          const instance = new web3.eth.Contract(abi, address);

          let result = await instance.methods
            .processProposal(id)
            .send({ from: account });
        } catch (e) {
          value.toast(e);
          value.setLoading(false);
        }
      } catch (e) {
        value.toast(e);
        value.setLoading(false);
      }
    }

    value.setLoading(false);
  };

  return (
    <form onSubmit={process}>
      <Input type="hidden" name="dao" />
      <Input type="hidden" name="id" value={p["id"]} />
      {i == 0 || p["proposalType"] == 9 ? (
        <Button type="submit" className="transparent-btn">
          Process
        </Button>
      ) : (
        <Button type="submit" className="transparent-btn" disabled>
          In Queue
        </Button>
      )}
    </form>
  );
}
