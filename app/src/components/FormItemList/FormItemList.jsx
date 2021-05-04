import React, { useState, useEffect } from "react";

import {
  Container,
  List,
  TableHeaders,
  Item,
  DeleteItem
} from "./FormItemList.elements";
import { FormInput } from "../shared/FormInput.elements";
import { Button } from "../shared/Button.elements";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function FormItemList({ items, setItems }) {
  const addItem = () => {
    setItems(prevState => [
      ...prevState,
      { name: "", quantity: 0, price: 0, total: 0 }
    ]);
  };

  const deleteItem = index => {
    setItems(prevState => {
      const result = [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1)
      ];

      return result;
    });
  };

  const updateItem = e => {
    const index = parseInt(e.target.getAttribute("data-index"));
    const fieldName = e.target.getAttribute("name");
    let updatedValue =
      fieldName !== "name" ? parseInt(e.target.value) : e.target.value;

    if (isNaN(updatedValue) && fieldName !== "name") updatedValue = 0;

    setItems(prevState => {
      let result = [];

      for (let i = 0; i < prevState.length; i++) {
        if (i === index) {
          // Update object
          let updatedObject = {
            ...prevState[i],
            [fieldName]: updatedValue
          };
          const updatedTotal = updatedObject.quantity * updatedObject.price;
          updatedObject = { ...updatedObject, total: updatedTotal };

          result.push(updatedObject);
        } else {
          result.push(prevState[i]);
        }
      }

      return result;
    });
  };

  console.log(items);

  return (
    <Container>
      <h2>Item List</h2>
      <TableHeaders>
        <span>Item Name</span>
        <span>Qty.</span>
        <span>Price</span>
        <span>Total</span>
      </TableHeaders>
      <form>
        <List>
          {items.map((item, index) => {
            return (
              <Item key={index}>
                <FormInput
                  value={item.name}
                  name="name"
                  className="item-name"
                  data-index={index}
                  onChange={updateItem}
                  placeholder="Item name"
                />
                <FormInput
                  value={item.quantity}
                  name="quantity"
                  className="quantity"
                  data-index={index}
                  onChange={updateItem}
                />
                <FormInput
                  value={item.price}
                  name="price"
                  className="price"
                  data-index={index}
                  onChange={updateItem}
                />
                <div>
                  <span>{item.total.toFixed(2)}</span>
                  <DeleteItem onClick={() => deleteItem(index)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </DeleteItem>
                </div>
              </Item>
            );
          })}
        </List>
      </form>
      <Button color="white" onClick={addItem} className="add-item">
        + Add New item
      </Button>
    </Container>
  );
}
