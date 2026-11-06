import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {Component} from 'react'

import './App.css'

import Home from './components/Home'
import Cart from './components/Cart'
import LoginForm from './components/LoginFrom'
import ProtectedRoute from './components/ProtectedRoute'

import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dishId !== id),
    }))
  }

  addCartItem = item => {
    this.setState(prevState => {
      const existingItem = prevState.cartList.find(
        each => each.dishId === item.dishId,
      )

      if (existingItem) {
        return {
          cartList: prevState.cartList.map(each =>
            each.dishId === item.dishId
              ? {...each, quantity: each.quantity + item.quantity}
              : each,
          ),
        }
      }

      return {
        cartList: [...prevState.cartList, item],
      }
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each =>
        each.dishId === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(each =>
          each.dishId === id ? {...each, quantity: each.quantity - 1} : each,
        )
        .filter(each => each.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state

    const contextValue = {
      cartList,
      addCartItem: this.addCartItem,
      removeAllCartItems: this.removeAllCartItems,
      removeCartItem: this.removeCartItem,
      incrementCartItemQuantity: this.incrementCartItemQuantity,
      decrementCartItemQuantity: this.decrementCartItemQuantity,
    }

    return (
      <CartContext.Provider value={contextValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
