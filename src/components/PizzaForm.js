import React from "react"

const initialState = {
  topping: "",
  size: "Small",
  vegetarian: null
}
class PizzaForm extends React.Component{

  state = initialState

  componentDidUpdate(prevProps){
    if (prevProps.currentPizza.id !== this.props.currentPizza.id){
      this.setState({
        topping: this.props.currentPizza.topping,
        size: this.props.currentPizza.size,
        vegetarian: this.props.currentPizza.vegetarian
      })   
    } 
  }
  
  

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleVegetarianChange = e => {
    this.setState({[e.target.name]: e.target.value}, ()=> console.log(this.state.vegetarian))
  }

  handleSubmit = (event) => {
    event.preventDefault()
      let vegetarian;
      if (this.state.vegetarian === "true"){
        vegetarian = true
      } else if (this.state.vegetarian === "false"){
        vegetarian = false
      }
      
    fetch(`http://localhost:3000/pizzas/${this.props.currentPizza.id}`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          topping: this.state.topping,
          size: this.state.size,
          vegetarian
        })
      }
    )
    .then(res=>res.json())
    .then(data=>{
      this.setState(initialState)
      this.props.updatePizza(data)
      console.log(data)
    })
  }



  render(){
    return(
        <form className="form-row" onSubmit={this.handleSubmit}>
          <div className="col-5">
              <input type="text" className="form-control" name = "topping" placeholder="Pizza Topping" value={this.state.topping} onChange={this.handleChange}/>
          </div>
          <div className="col">
            <select name="size" value={this.state.size} className="form-control" onChange={this.handleChange}>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" name = "vegetarian" type="radio" value={true} checked={this.state.vegetarian===true ? true : null } onClick={this.handleVegetarianChange}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" name = "vegetarian" type="radio" value={false} checked={this.state.vegetarian===false ? true : null } onClick={this.handleVegetarianChange}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>

  

    )
  }
}

export default PizzaForm
