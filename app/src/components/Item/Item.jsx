import React from "react";

import { Container } from "./Item.elements";

export default function Item({ item }) {
  return (
    <Container>
      <h3>{item.name}</h3>
      <span>{item.quantity}</span>
      <span>$ {item.price.toFixed(2)}</span>
      <span>$ {item.total.toFixed(2)}</span>
    </Container>
  );
}
