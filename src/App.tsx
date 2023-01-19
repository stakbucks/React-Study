import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
  delay,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Container = styled.div`
  display: grid;
  grid-template: repeat(1, 1fr) / repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:last-child,
  div:first-child {
    grid-column: span 2;
  }
`;


const Box = styled(motion.div)`
  top: 100px;
  height: 300px;
  background-color: white;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;


function App() {
  const [id, setId] = useState<null | string>(null);

  return (
    <Wrapper>
      <Container>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setId(n)} key={n} layoutId={n} />
        ))}
      </Container>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId={id} style={{ width: 800, height: 500 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>





    </Wrapper>
  );
}
export default App;
