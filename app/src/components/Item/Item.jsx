import React from "react";
import useScreenWidth from "../custom-hooks/useScreenWidth";

import { Container, MobileItem } from "./Item.elements";

export default function Item({ item }) {
  const width = useScreenWidth();

  return (
    <Container>
      {width >= 701 && (
        <>
          <h3 className="item-name">{item.name}</h3>
          <span>{item.quantity}</span>
          <span>$ {item.price.toFixed(2)}</span>
          <span>$ {item.total.toFixed(2)}</span>
        </>
      )}

      {width < 701 && (
        <MobileItem>
          <div className="info-left">
            <h4>{item.name}</h4>
            <span>
              {item.quantity} x $ {item.price.toFixed(2)}
            </span>
          </div>
          <span className="info-right">$ {item.total.toFixed(2)}</span>
        </MobileItem>
      )}
    </Container>
  );
}
