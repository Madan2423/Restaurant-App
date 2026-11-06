import {Component} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

class DishItem extends Component {
  state = {
    quantity: 0,
  }

  onClickIncrease = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  onClickDecrease = () => {
    this.setState(prevState => ({
      quantity: Math.max(0, prevState.quantity - 1),
    }))
  }

  render() {
    const {quantity} = this.state
    const {dish} = this.props

    const {
      dishName,
      dishImage,
      dishCalories,
      dishAvailability,
      dishCurrency,
      dishDescription,
      dishPrice,
      addonCat,
    } = dish

    return (
      <CartContext.Consumer>
        {value => {
          const {addCartItem} = value

          const onAddToCart = () => {
            if (dishAvailability && quantity > 0) {
              addCartItem({
                ...dish,
                quantity,
              })
            }
          }

          return (
            <li className="dish-item-card">
              <div className="circle-content-card">
                <div
                  className={`box ${dishPrice > 10 ? 'high-rate-props' : ''}`}
                >
                  <p
                    className={`circle ${
                      dishPrice > 10 ? 'high-rate-circle' : ''
                    }`}
                  />
                </div>

                <div className="content-div">
                  <h1 className="name">{dishName}</h1>

                  <p className="money">
                    {dishCurrency} {dishPrice}
                  </p>

                  <p className="description">{dishDescription}</p>

                  {dishAvailability ? (
                    <>
                      <div className="qunatity-control-card">
                        <button
                          type="button"
                          className="control"
                          onClick={this.onClickDecrease}
                        >
                          -
                        </button>

                        <p className="qunatity">{quantity}</p>

                        <button
                          type="button"
                          className="control"
                          onClick={this.onClickIncrease}
                        >
                          +
                        </button>
                      </div>

                      {quantity > 0 && (
                        <button
                          type="button"
                          onClick={onAddToCart}
                          className="add-to-cart"
                        >
                          ADD TO CART
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="not-availble">Not available</p>
                  )}

                  {addonCat && addonCat.length > 0 && (
                    <p className="customization-text">
                      Customizations available
                    </p>
                  )}
                </div>
              </div>

              <p className="calories-num calories-num-sm">
                {dishCalories} Calories
              </p>

              <div className="cal-img-card">
                <p className="calories-num calories-num-lg">
                  {dishCalories} Calories
                </p>

                <img className="dish-img" alt={dishName} src={dishImage} />
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default DishItem
