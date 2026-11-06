import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoCartOutline} from 'react-icons/io5'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {history, restaurantName = 'UNI Resto Cafe'} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCart = () => {
    history.push('/cart')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const count = cartList.reduce((total, each) => total + each.quantity, 0)

        return (
          <div className="header-container">
            <Link to="/" className="link">
              <h1 className="logo-heading">{restaurantName}</h1>
            </Link>

            <div className="nav-items">
              <p className="my-order-txt">My Orders</p>

              <button
                type="button"
                className="cart-card"
                data-testid="cart"
                onClick={onClickCart}
              >
                <IoCartOutline className="cart-icon" />
                <span className="cart-count">{count}</span>
              </button>

              <button
                type="button"
                className="logout-desktop-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
