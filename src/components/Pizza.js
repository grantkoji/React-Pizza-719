import React from "react"

const Pizza = (props) => {
  return(
    <tr>
      <td>{props.pizza.topping}</td>
      <td>{props.pizza.size}</td>
      <td>Vegetarian: {props.pizza.vegetarian ? "✅": "❌"}</td>
      <td><button type="button" className="btn btn-primary" onClick = {()=>props.editPizza(props.pizza)}>Edit Pizza</button></td>
    </tr>
  )
}

export default Pizza
