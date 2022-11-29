import React from "react";
import renderer from "react-test-renderer";
import "jest-styled-components";
import Input from "./Input";

test("it works", () => {
  const tree = renderer.create(<Input />).toJSON();
//   const input = expect(tree.getByRole("input"))
//   expect(tree).toHave;
});
