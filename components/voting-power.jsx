import { gql, useQuery } from "@apollo/client";

function numberWithCommas(rawNumber) {
  return rawNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** VOTING POWER query to retrieve the voting power info */
const VP = gql`
  query geetVotingPower {
    vp(
      voter: "0x020cA66C30beC2c4Fe3861a94E4DB4A498A35872"
      space: "apecoin.eth"
    ) {
      vp
      vp_by_strategy
    }
  }
`;
const VotingPower = () => {
  const { loading, error, data } = useQuery(VP);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const votingPower = data.vp;
  return (
    <>
      <div>Voting Power</div>
      <div>{numberWithCommas(votingPower.vp.toFixed(0))}</div>
      {votingPower.vp_by_strategy.map((strategy, index) => (
        <div key={index}>{numberWithCommas(strategy.toFixed(0))}</div>
      ))}
    </>
  );
};

export default VotingPower;
