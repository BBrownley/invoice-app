import React from "react";
import useScreenWidth from "../custom-hooks/useScreenWidth";
import { useDarkMode } from "../../darkModeContext";

import { Container, MobileItem } from "./Item.elements";

export default function Item({ item }) {
  const width = useScreenWidth();
  const darkMode = useDarkMode();

  return (
    <Container darkMode={darkMode}>
      {width >= 701 && (
        <>
          <h3 className="item-name">{item.name}</h3>
          <span className="item-quantity">{item.quantity}</span>
          <span className="item-price">$ {item.price.toFixed(2)}</span>
          <span className="item-total">$ {item.total.toFixed(2)}</span>
        </>
      )}

      {width < 701 && (
        <MobileItem darkMode={darkMode}>
          <div className="item-name">
            <h4>{item.name}</h4>
            <span>
              {item.quantity} x $ {item.price.toFixed(2)}
            </span>
          </div>
          <span className="item-total">$ {item.total.toFixed(2)}</span>
        </MobileItem>
      )}
    </Container>
  );
}
