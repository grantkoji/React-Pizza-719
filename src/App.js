import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state ={
    pizzas: [],
    currentPizza: {},

  }

  componentDidMount(){
    fetch('http://localhost:3000/pizzas')
    .then(res=>res.json())
    .then(pizzas=> this.setState({pizzas}))
  }

  handleEditClick = pizza=> {
    this.setState({ currentPizza: pizza})
  }

  updatePizza = dataPizza => {
    let pizzas = this.state.pizzas.map(pizza=>{ 
      if(pizza.id === dataPizza.id){
      let updatedPizza = dataPizza
      return updatedPizza
      } 
    return pizza
    })
    this.setState({pizzas, currentPizza: {}})
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm currentPizza={this.state.currentPizza} updatePizza={this.updatePizza} />
        <PizzaList editPizza = {this.handleEditClick} pizzas = {this.state.pizzas}/>
      </Fragment>
    );
  }
}

export default App;
