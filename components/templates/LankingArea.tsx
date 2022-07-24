import { useQuery } from "@apollo/client";
import { GET_ALL_GAMES } from "../../queries/queries";
import { GetAllGamesQuery } from "../../types/generated/graphql";
import LankingCard from "../organisms/LankingCard";

const LankingArea = () => {
  const { data, error, loading } = useQuery<GetAllGamesQuery>(GET_ALL_GAMES);
  return (
    <>
      <div className="mt-7">
        <h3 className="text-center font-bold text-md">世界ランキング</h3>
        { loading && "ローディング中..." }
        { data && data.games.map((game, index) => (
          <LankingCard key={index} lank={index} game={game} />
        ))}
      </div>
    </>
  );
};
export default LankingArea;
