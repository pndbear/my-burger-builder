import React, { Component } from "react";
import Burger from "../../components/Burger/Burger.js";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((total, el) => total + el);

        this.setState({ purchasable: sum > 0 }, () => {
            console.log("this.state.purchasable", this.state.purchasable);
        });
    };

    addIngredientHandler = (type) => {
        // add an ingredient based on type
        const ingredientUpdatedCount = this.state.ingredients[type] + 1;

        // copy the state to update it in an immutable way
        const updatedIngredients = {
            ...this.state.ingredients,
        };

        // update the copy of the state with the new ingredient count
        updatedIngredients[type] = ingredientUpdatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // set state with updated information
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) {
            return;
        }

        const ingredientUpdatedCount = this.state.ingredients[type] - 1;

        const updatedIngredients = {
            ...this.state.ingredients,
        };
        updatedIngredients[type] = ingredientUpdatedCount;

        const oldPrice = this.state.totalPrice;

        this.setState({
            totalPrice: oldPrice - INGREDIENT_PRICES[type],
            ingredients: updatedIngredients,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
