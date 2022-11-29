import React from "react";
import styled from "styled-components";
import renderer from "react-test-renderer";
import "jest-styled-components";
import { StyledButton } from "./StyledButton";

test("it works", () => {
  const tree = renderer.create(<StyledButton />).toJSON();
  expect(tree).toHaveStyleRule("width", "fit-content");
  expect(tree).toHaveStyleRule("padding", "8px 13px");
  expect(tree).toHaveStyleRule("border-radius", "3px");
  expect(tree).toHaveStyleRule("color", "white");
  expect(tree).toHaveStyleRule("background-color", "#404040");
});
