import React, { useEffect, useState } from "react";
import {
  Popover, 
  PopoverBody, 
  PopoverTrigger
} from 'nr1';
import styled from "styled-components";
import Hexagon from "react-hexagon";
import isFunction from "lodash/isFunction";
import Gradient from "./Gradient";

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

const tryInvoke = (func, params = [], defaultValue = null) => {
  return isFunction(func) ? func(...params) : defaultValue;
};

const renderHexagonContent = (label) => {
  return (
    <text
      x="50%"
      y="56%"
      fontSize={100}
      fontWeight="lighter"
      style={{ fill: "white" }}
      textAnchor="middle"
    >
      {label}
    </text>
  );
};

const Hex = ({ children, hexLabel, style, ...rest }) => (
  <Hexagon style={style} {...rest}>
    {tryInvoke(renderHexagonContent, [hexLabel], <tspan />)}
  </Hexagon>
);

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
      {getRows().map((row, index) => (
        <Row key={index}>
          {row.map((sli, index) => (
            <Popover>
                <PopoverTrigger>
                  <Hex key={index}
                    className="hex"
                    hexLabel={sli.id}
                    style={{ fill: `${sli.color}`, stroke: "none", strokeWidth }}
                  >
                  </Hex>
                </PopoverTrigger>
                <PopoverBody>
                    <div className="popover-text">
                      <p>{sli.id}</p>
                      <p>asdfasdfasdfasdf</p>
                      <p>nvioerwjoi</p>
                      <p>popwoj</p>
                      <p>qwqwqqw</p>
                      <p>ojjwnvninvindiwnowdonvowdvmowodmvw</p>
                    </div>
                </PopoverBody>
            </Popover>
            
          ))}
        </Row>
      ))}
    </Wrapper>
  );
  
}

export default Grid;