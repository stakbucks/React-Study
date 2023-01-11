import { fetchCoins } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  margin-top: 5vh;
  margin-bottom: 3vh;
  position: relative;
`;
const Loader = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
`;

const CoinsList = styled.ul`
  width: 70%;
  height: 100%;
  max-width: 500px;
`;

const Coin = styled.li`
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  width: 100%;
  height: 60px;
  border-radius: 15px;
  margin-bottom: 8px;
  font-size: 25px;
  a {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

const Img = styled.img`
  height: 35px;
  margin: 0 7px;
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: 50px;
  right: 50px;
  border: 1px solid ${(props) => props.theme.accentColor};
  background: transparent;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  return (
    <>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Page>
        {isLoading ? (
          <Loader>Loading...</Loader>
        ) : (
          <>
            <Title>Hot Coins</Title>
            <ThemeToggle onClick={toggleDarkAtom}>Toggle Theme</ThemeToggle>
            <CoinsList>
              {data?.slice(0, 100).map((coin) => (
                <Coin>
                  <Link
                    to={{
                      pathname: `/${coin.id}`,
                      state: { name: coin.name },
                    }}
                  >
                    <Img
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                    {coin.name} &rarr;
                  </Link>
                </Coin>
              ))}
            </CoinsList>
          </>
        )}
      </Page>
    </>
  );
}
export default Coins;
