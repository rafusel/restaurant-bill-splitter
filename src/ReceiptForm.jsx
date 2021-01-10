import React from 'react';

export default class ReceiptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cost: '',
      orderer: 'changeme',
    };

    this.handleMealCostUpdate = this.handleMealCostUpdate.bind(this);
    this.handleMealNameUpdate = this.handleMealNameUpdate.bind(this);
    this.handleMealOrdererUpdate = this.handleMealOrdererUpdate.bind(this);
    this.addMealItem = this.addMealItem.bind(this);
    this.deleteMealItem = this.deleteMealItem.bind(this);
  }

  handleMealNameUpdate(event) {
    this.setState({
      name: event.target.value,
    });
  }

  handleMealCostUpdate(event) {
    this.setState({
      cost: event.target.value,
    });
  }

  handleMealOrdererUpdate(event) {
    this.setState({
      orderer: event.target.value,
    });
  }

  addMealItem() {
    if (this.state.orderer !== 'changeme') {
      this.setState({
        name: '',
        orderer: 'changeme',
        cost: '',
      });
      this.props.addMealItem(this.state);
    } else {
      alert('Change the orderer for this meal item.')
    }
  }

  deleteMealItem(index) {
    this.props.deleteMealItem(index);
  }

  render() {
    return (
      <div>
        <h1>
          Meal Details
        </h1>

        <h2>
          Meal Items
        </h2>
        <table>
          <tr>
            <th>
              Item
            </th>
            <th>
              Cost
            </th>
            <th>
              Orderer
            </th>
            <th>
              Delete Button
            </th>
          </tr>
          {this.props.receipt.mealItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.cost}</td>
              <td>{item.orderer}</td>
              <td><button onClick={() => { this.deleteMealItem(index) }}>Delete Me</button></td>
            </tr>
          ))}
        </table>

        <h3>
          Add Meal Items
        </h3>
        <label>
          Meal Item Name
        </label>
        <input value={this.state.name} onChange={this.handleMealNameUpdate} />

        <label>
          Meal Item Cost
        </label>
        <input value={this.state.cost} onChange={this.handleMealCostUpdate} />

        <label>
          Meal Item Orderer
        </label>
        <select value={this.state.orderer} onChange={this.handleMealOrdererUpdate}>
          <option value="changeme">Change Me</option>
          {
            this.props.orderers.map((orderer, index) => (
              <option value={orderer}>{orderer}</option>
            ))
          }
        </select>

        <button onClick={this.addMealItem}>Add Meal Item</button>

        <h2>
          Total
        </h2>
        <input value={this.props.receipt.total.toString()}  onChange={(e) => { this.props.updateTotal(e.target.value) }} />

        <h2>
          Delivery Fee
        </h2>
        <input value={this.props.receipt.deliveryFee.toString()} onChange={(e) => { this.props.updateDeliveryFee(e.target.value) }} />

        <h2>
          Service Fee
        </h2>
        <input value={this.props.receipt.serviceFee.toString()} onChange={(e) => { this.props.updateServiceFee(e.target.value) }} />
      </div>
    );
  }
}