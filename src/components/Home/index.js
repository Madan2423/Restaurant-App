import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'

import Header from '../Header'
import DishCategoryTab from '../DishCategoryTab'
import DishItem from '../DishItem'

const apiStatusConstants = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.inProgress,
    activeTabId: '',
    restaurantName: '',
    tableMenuList: [],
  }

  componentDidMount() {
    this.getRestaurantMenu()
  }

  getRestaurantMenu = async () => {
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error('Failed to fetch restaurant menu')
      }

      const data = await response.json()

      const tableMenuList = data[0].table_menu_list

      this.setState({
        apiStatus: apiStatusConstants.success,
        restaurantName: data[0].restaurant_name,
        tableMenuList,
        activeTabId: tableMenuList[0].menu_category_id,
      })
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeActiveTab = id => {
    this.setState({activeTabId: id})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-mesg">
      <h1>Failed To Load...</h1>
      <button type="button" onClick={this.getRestaurantMenu}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {tableMenuList, activeTabId, restaurantName} = this.state

    const activeCategory = tableMenuList.find(
      each => each.menu_category_id === activeTabId,
    )

    if (!activeCategory) {
      return null
    }

    const updatedTableMenuData = tableMenuList.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
    }))

    const updatedDishesArray = activeCategory.category_dishes.map(dish => ({
      addonCat: dish.addonCat || [],
      dishAvailability: dish.dish_Availability,
      dishCalories: dish.dish_calories,
      dishCurrency: dish.dish_currency,
      dishDescription: dish.dish_description,
      dishId: dish.dishId,
      dishImage: dish.dish_image,
      dishName: dish.dish_name,
      dishPrice: dish.dish_price,
    }))

    return (
      <>
        <Header restaurantName={restaurantName} />

        <div className="dish-item-category-div">
          <ul className="tabs-container">
            {updatedTableMenuData.map(each => (
              <DishCategoryTab
                key={each.menuCategoryId}
                isActiveTab={each.menuCategoryId === activeTabId}
                menuData={each}
                onChangeTabId={this.onChangeActiveTab}
              />
            ))}
          </ul>
        </div>

        <ul className="dish-items-containers">
          {updatedDishesArray.map(each => (
            <DishItem dish={each} key={each.dishId} />
          ))}
        </ul>
      </>
    )
  }

  renderDiffViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-main-container">{this.renderDiffViews()}</div>
  }
}

export default Home
