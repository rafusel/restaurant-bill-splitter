import React from 'react';
import './App.css';
import { Typography, Table } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { extractFloatStringFromCurrencyString } from './util';

const { Title } = Typography;

const columns = [
  {
    title: 'Orderer',
    dataIndex: 'orderer',
    key: 'orderer',
  },
  {
    title: 'Share of Total',
    dataIndex: 'shareOfTotal',
    key: 'shareOfTotal',
  },
];

export default class OutputTable extends React.Component {
  getMealItemTotalByOrderer(orderer) {
    const itemTotal = this.props.receipt.mealItems.reduce((total, mealItem) => (
      mealItem.orderer === orderer ? total + parseFloat(extractFloatStringFromCurrencyString(mealItem.cost)) : total
    ), 0);
    return itemTotal;
  }

  getSubtotal() {
    return this.props.receipt.mealItems.reduce((subtotal, mealItem) => (
      subtotal + parseFloat(extractFloatStringFromCurrencyString(mealItem.cost))
    ), 0);
  }

  getShareTotals() {
    const shareEquallyTotalPerPerson = (parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.deliveryFee))
      + parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.serviceFee))) / this.props.orderers.length;

    const totalMinusShareEquallyValues = parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.total)) - (
      parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.deliveryFee))
      + parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.serviceFee))
    );

    const totals = [];
    this.props.orderers.forEach((orderer) => {
      const mealItemTotalForOrderer = this.getMealItemTotalByOrderer(orderer.name);
      const fractionOfSubtotal = mealItemTotalForOrderer / this.getSubtotal();
      const ordererShareOfTotal = shareEquallyTotalPerPerson + (fractionOfSubtotal * totalMinusShareEquallyValues);
      const shareTotalObject = {
        orderer: orderer.name,
        shareOfTotal: `$${ordererShareOfTotal.toFixed(2)}`,
      }
      totals.push(shareTotalObject);
    })
    return totals;
  }

  render() {
    const totalFloat = parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.total));
    const serviceFeeFloat = parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.serviceFee));
    const deliveryFeeFloat = parseFloat(extractFloatStringFromCurrencyString(this.props.receipt.deliveryFee));
    const receiptValuesAreFloats = totalFloat && serviceFeeFloat && deliveryFeeFloat;
    const hasOrderers = this.props.orderers.length;
    const hasMealItems = this.props.receipt.mealItems.length;
    const totalMakesSense = totalFloat >= (this.getSubtotal() + serviceFeeFloat + deliveryFeeFloat);
    const mealCostsAreFloats = this.props.receipt.mealItems.every((mealItem) => (
      parseFloat(extractFloatStringFromCurrencyString(mealItem.cost)) >= 0
    ));
    const shareTotals = this.getShareTotals();
    const shareTotalsHaveValues = shareTotals.every((shareTotal) => (
      parseFloat(extractFloatStringFromCurrencyString(shareTotal.shareOfTotal)) >= 0 && shareTotal.orderer
    ));

    if (receiptValuesAreFloats && hasOrderers && mealCostsAreFloats
      && hasMealItems && totalMakesSense && shareTotalsHaveValues) {
      return (
        <div style={{ padding: '30px 0 30px 0' }}>
          <Title>
            Your splits
          </Title>
          <Table
            columns={columns}
            dataSource={this.getShareTotals()}
            pagination={false}
            className="mb-15"
          />
        </div>
      )
    }

    return (
      <div style={{ marginTop: '30px' }}>
        <Title level={2}>
          No splits to show
        </Title>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
        >
          <span style={{ margin: 'auto', fontSize: '100px' }}>
            <FrownOutlined />
          </span>
        </div>
      </div>
    )
  }
}