import styled from "styled-components";

interface PriceProps {
  price?: number;
}

const PriceShow = styled.h1`
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Price({ price }: PriceProps) {
  return <PriceShow>${price?.toFixed(2)}</PriceShow>;
}
export default Price;
