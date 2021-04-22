import React from "react";
import useScreenWidth from "../custom-hooks/useScreenWidth";

import Item from "../Item/Item";

import {
  Container,
  ListWrapper,
  Header,
  Total,
  List
} from "./ItemList.elements";

export default function ItemList({ items, total }) {
  const width = useScreenWidth();

  return (
    <Container>
      <ListWrapper>
        <div className="header">
          <span>Item Name</span>
          <span>QTY.</span>
          <span>Price</span>
          <span>Total</span>
        </div>
        <List>
          {items.map((item, key) => {
            return <Item item={item} key={key} />;
          })}
        </List>
      </ListWrapper>
      <Total>
        <span className="amt-due">
          {width >= 701 ? "Amount Due" : "Grand Total"}
        </span>
        <h2>$ {total.toFixed(2)}</h2>
      </Total>
    </Container>
  );
}
