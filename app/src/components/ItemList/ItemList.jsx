import React from 'react'

import Item from "../Item/Item";

import {Container, ListWrapper, Total, List} from "./ItemList.elements";

export default function ItemList({items, total}) {
  return (
    <Container>
      <ListWrapper>
        <div>
          <span>Item Name</span>
          <span>QTY.</span>
          <span>Price</span>
          <span>Total</span>
        </div>
        <List>
          {items.map((item, key) => {
            return <Item item={item} key={key}/>
          })}
        </List>
      </ListWrapper>
      <Total>
        <span className="amt-due">Amount Due</span>
        <h2>$ {total.toFixed(2)}</h2>
      </Total>
    </Container>
  )
}
