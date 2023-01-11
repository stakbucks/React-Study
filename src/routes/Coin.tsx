import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { useParams, useLocation, Link, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";
import { info } from "console";

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
`;
const Loader = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 40px;
`;

const Container = styled.div`
  width: 70%;
  height: 100%;
  max-width: 500px;
  position: relative;
`;

const Overview = styled.div`
  width: 100%;
  height: 60px;
  border-radius: 15px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 3vh 0;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: ${(props) => props.theme.overviewColor};
  span {
    margin: 5px 0;
  }
`;

const Description = styled.p`
  font-size: 20px;
  color: ${(props) => props.theme.textColor};
`;

const Tabs = styled.div`
  display: grid;
  grid-template: 1fr/ 1fr 1fr;
  width: 100%;
  height: 30px;
  gap: 10px;
  margin-bottom: 3vh;
`;

const Tab = styled.div`
  background-color: black;
  color: white;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  position: fixed;
  top: 10px;
  left: 10px;
  background: transparent;
  color: ${(props) => props.theme.accentColor};
  position: absolute;
  top: -60px;
  font-size: 30px;
`;
interface CoinParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: string;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<CoinParams>();
  const { state } = useLocation<RouteState>();
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );
  const loading = infoLoading || tickersLoading;
  return (
    <Page>
      <Helmet>
        <title>{infoData?.name}</title>
      </Helmet>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>
            {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          </Title>
          <Container>
            <Overview>
              <OverviewItem>
                <span>Rank</span>
                <span>#{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Symbol</span>
                <span>{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>OpenSource</span>
                <span>{infoData?.open_source === true ? "Yes" : "No"}</span>
              </OverviewItem>
            </Overview>
            <Description>{infoData?.description}</Description>
            <Overview>
              <OverviewItem>
                <span>Total Supplies</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supplies</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
            <Tabs>
              <Tab>
                <Link to={`/${coinId}/chart`}>CHART</Link>
              </Tab>
              <Tab>
                <Link to={`/${coinId}/price`}>PRICE</Link>
              </Tab>
            </Tabs>

            <BackBtn>
              <Link to="/">&larr;</Link>
            </BackBtn>

            <Switch>
              <Route path={`/:coinId/price`}>
                <Price price={tickersData?.quotes.USD.price} />
              </Route>
              <Route path={`/:coinId/chart`}>
                <Chart coinId={coinId} />
              </Route>
              <Route path="/"></Route>
            </Switch>
          </Container>
        </>
      )}
    </Page>
  );
}
export default Coin;
