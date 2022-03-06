import React, { useEffect, useState } from "react";
import Hex from "./Hex";
import styled from "styled-components";
import { PlatformStateContext } from 'nr1';

const hexWidth = 65;
const strokeWidth = 4;

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 40px;
  background-color: white;

  svg {
    width: ${hexWidth}px;
  }
`;

const Row = styled.div`
  > * {
    &:not(:last-child) {
      margin-right: 4px;
    }
  }

  &:nth-child(1n + 2) {
    margin-top: calc((${hexWidth}px * 0.375 * -1) + ${hexWidth / 12}px);
  }

  &:nth-child(even) :first-child {
    margin-left: calc((${hexWidth}px / 2) + 2px);
  }
`;

const Grid = props => {
  const [gridWidth, setGridWidth] = useState(0);
  const [gridRef, setGridRef] = useState(null);

  function updateWidth() {
    if (gridRef) {
      const computedWidth = window
        .getComputedStyle(gridRef)
        .getPropertyValue("width")
        .replace("px", "");
      setGridWidth(parseInt(computedWidth, 10));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
    return () => window.removeEventListener("resize", updateWidth);
  }, [gridRef]); 

  useEffect(() => {
    
  }, [props.slis]);

  function getRows() {
    const hexesPerRow = Math.floor(
      gridWidth / (hexWidth + strokeWidth)
    );
    let rows = [];
    if (props.slis) {
      rows = props.slis.map(
        (sli, index) =>
          index % hexesPerRow === 0 ? buildRow(hexesPerRow, index) : null
      );
    }
    return rows.filter(item => item);
  }

  function buildRow(hexesPerRow, index) {
    const even = (index / hexesPerRow) % 2 === 0;
    const sliceEnd = even ? hexesPerRow : hexesPerRow - 1;
    return props.slis.slice(index, index + sliceEnd);
  }

  return (
    <Wrapper ref={element => setGridRef(element)}>
      <PlatformStateContext.Consumer>
        {
          (platformState) => {
              return <>
                {getRows().map((row, index) => (
                  <Row key={index}>
                    {row.map((sli, index) => (
                      <Hex key={index} sli={sli} timerange={platformState.timerange} strokeWidth />
                    ))}
                  </Row>
                ))}
              </>
          }
        }
      </PlatformStateContext.Consumer>
    </Wrapper>
  );
  
}

export default Grid;