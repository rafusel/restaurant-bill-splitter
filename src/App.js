import React from 'react';
import './App.css';
import OrderersForm from './OrderersForm';
import ReceiptForm from './ReceiptForm';
import OutputTable from './OutputTable';
import { Layout } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receipt: {
        mealItems: [],
        deliveryFee: '',
        serviceFee: '',
        total: '',
      },
      orderers: [],
    };
  }

  addOrderer = (orderer) => {
    const orderers = this.state.orderers;
    orderers.push(orderer);
    this.setState({ orderers });
  }

  deleteOrderer = (index) => {
    const orderers = this.state.orderers;
    const orderer = orderers[index];
    orderers.splice(index, 1);
    this.setState({ orderers });

    // We need to delete all meal items that this person ordered
    const mealItems = this.state.receipt.mealItems;
    const mealItemIndices = []
    mealItems.forEach((mealItem, index) => {
      if (mealItem.orderer === orderer) {
        mealItemIndices.push(index);
      }
    });

    mealItemIndices.reverse().forEach((index) => {
      mealItems.splice(index, 1);
    });

    const receipt = this.state.receipt;
    receipt.mealItems = mealItems;
    this.setState({ receipt });
  }

  updateTotal = (total) => {
    const receipt = this.state.receipt;
    receipt.total = total;
    this.setState({ receipt });
  }

  updateDeliveryFee = (deliveryFee) => {
    const receipt = this.state.receipt;
    receipt.deliveryFee = deliveryFee;
    this.setState({ receipt });  }

  updateServiceFee = (serviceFee) => {
    const receipt = this.state.receipt;
    receipt.serviceFee = serviceFee;
    this.setState({ receipt });  }

  addMealItem = (mealItem) => {
    const mealItems = this.state.receipt.mealItems;
    mealItems.push(mealItem);

    const receipt = this.state.receipt;
    receipt.mealItems = mealItems
    this.setState({ receipt });
  }

  deleteMealItem = (index) => {
    const mealItems = this.state.receipt.mealItems;
    mealItems.splice(index, 1);

    const receipt = this.state.receipt;
    receipt.mealItems = mealItems;
    this.setState({ receipt });
  }

  render() {
    return (
      <Layout>
        <Layout.Header className="white fs-30">
          <CoffeeOutlined spin={true} />
          {'   '}
          Fair Share
        </Layout.Header>
        <Layout>
          <Layout.Content className="main-content">
            <OrderersForm
              orderers={this.state.orderers}
              addOrderer={this.addOrderer}
              deleteOrderer={this.deleteOrderer}
            />

            <ReceiptForm
              updateServiceFee={this.updateServiceFee}
              updateDeliveryFee={this.updateDeliveryFee}
              updateTotal={this.updateTotal}
              addMealItem={this.addMealItem}
              deleteMealItem={this.deleteMealItem}
              orderers={this.state.orderers}
              receipt={this.state.receipt}
            />

            <OutputTable
              receipt={this.state.receipt}
              orderers={this.state.orderers}
            />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default App;
