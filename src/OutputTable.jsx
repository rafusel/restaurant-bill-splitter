import React from 'react';

export default class OutputTable extends React.Component {
  getMealItemTotalByOrderer(orderer) {

    const itemTotal = this.props.receipt.mealItems.reduce((total, mealItem) => (
      mealItem.orderer === orderer ? total + parseFloat(mealItem.cost) : total
    ), 0);
    return itemTotal;
  }

  getSubtotal() {
    return this.props.receipt.mealItems.reduce((subtotal, mealItem) => (
      subtotal + parseFloat(mealItem.cost)
    ), 0);
  }

  getShareTotals() {
    const shareEquallyTotalPerPerson = (parseFloat(this.props.receipt.deliveryFee)
      + parseFloat(this.props.receipt.serviceFee)) / this.props.orderers.length;

    const totalMinusShareEquallyValues = parseFloat(this.props.receipt.total) - (
      parseFloat(this.props.receipt.deliveryFee) + parseFloat(this.props.receipt.serviceFee)
    );

    const totals = [];
    this.props.orderers.forEach((orderer) => {
      const mealItemTotalForOrderer = this.getMealItemTotalByOrderer(orderer);
      const fractionOfSubtotal = mealItemTotalForOrderer / this.getSubtotal();
      const ordererShareOfTotal = shareEquallyTotalPerPerson + (fractionOfSubtotal * totalMinusShareEquallyValues);
      totals.push(ordererShareOfTotal);
    })
    return totals;
  }

  render() {
    const totalFloat = parseFloat(this.props.receipt.total);
    const serviceFeeFloat = parseFloat(this.props.receipt.serviceFee);
    const deliveryFeeFloat = parseFloat(this.props.receipt.deliveryFee);
    const receiptValuesAreFloats = totalFloat && serviceFeeFloat && deliveryFeeFloat;
    const hasOrderers = this.props.orderers.length;
    const mealCostsAreFloats = this.props.receipt.mealItems.every((mealItem) => (
      parseFloat(mealItem.cost)
    ));

    if (receiptValuesAreFloats && hasOrderers && mealCostsAreFloats) {
      return (
        <div>
          <h1>
            Your splits
          </h1>
          <table>
            <tr>
              <th>
                Orderer
              </th>
              <th>
                Share of Total
              </th>
            </tr>
            {
              this.getShareTotals().map((total, index) => (
                <tr>
                  <td>{this.props.orderers[index]}</td>
                  <td>{`$${total.toFixed(2)}`}</td>
                </tr>
              ))
            }
          </table>
        </div>
      )
    }

    return (
      <div>
        <h1>
          Your splits
        </h1>
        <p>
          Something's not quite right.
        </p>
      </div>
    )
  }
}