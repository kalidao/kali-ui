import { useEffect } from "react";

export default function Test() {

  const first =
  `query {
    tokens {
      id
      dao
      name
    }
  }`;

  const shiv =
  `query {
    members(where: {
      address: "0xCB0592589602B841BE035e1e64C2A5b1Ef006aa2"
    }) {
      dao {
        id
        token {
          name
        }
      }
    }
  }`;

  const jordan =
  `query {
    members(where: {
      address: "0xE3bbFD7dbd338a2C1c4F28F8e06aC00589118c4B"
    }) {
      dao {
        id
        token {
          name
        }
      }
    }
  }`;

  const dinoDao =
  `query {
    daos(where: {
      id: "0x0b21b16f9d67c3ed18663dd8d953f02b50440e7b"
    }) {
      id
      token {
        id
        name
        symbol
        paused
      }
      docs
      votingPeriod
      gracePeriod
      quorum
      supermajority
      members {
        address
        shares
      }
      proposals
      extensions
      extensionsData
    }
  }`;

  const trexDao =
  `query {
    members(where: {
      address: "0xB80E796a42FD9E3483cD410216Fbd2eb02fFf430"
    }) {
      dao {
        id
        token {
          name
        }
      }
    }
  }`;

  useEffect(() => {
    query();
  }, []);

  const query = async() => {
    const result = await fetch(`https://api.thegraph.com/subgraphs/name/nerderlyne/kali`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: dinoDao
      }),
    }).then((res) => res.json());
    console.log(result)
  }

  return(
    <></>
  );

}
