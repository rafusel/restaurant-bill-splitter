import React from 'react';
import { Typography, Table, Button, Input, Select, Space, message, Modal, AutoComplete } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { extractFloatStringFromCurrencyString } from './util';

const { Title } = Typography;
const { Option } = Select;

export default class ReceiptForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      cost: '',
      orderer: 'changeme',
      isModalVisible: false,
      previousMealItems: JSON.parse(window.localStorage.getItem('previousMealItems') || '[]'),
    };

    this.handleMealCostUpdate = this.handleMealCostUpdate.bind(this);
    this.handleMealNameUpdate = this.handleMealNameUpdate.bind(this);
    this.handleMealOrdererUpdate = this.handleMealOrdererUpdate.bind(this);
    this.addMealItem = this.addMealItem.bind(this);
    this.deleteMealItem = this.deleteMealItem.bind(this);
  }

  getColumns() {
    const columns = [
      {
        title: 'Item',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'cost',
        key: 'cost',
      },
      {
        title: 'Orderer',
        dataIndex: 'orderer',
        key: 'orderer',
      },
      {
        title: 'Delete',
        dataIndex: 'deleteFunction',
        render: (text, record) => (
          <Button type="primary" onClick={() => { this.deleteMealItem(record.index) }}>
            <DeleteOutlined />
          </Button>
        ),
      },
    ];
    return columns;
  }

  handleMealNameUpdate(value) {
    this.setState({
      name: value,
    });
  }

  handleMealCostUpdate(event) {
    this.setState({
      cost: this.formatCurrencyString(this.state.cost, event.target.value),
    });
  }

  handleMealOrdererUpdate(orderer) {
    this.setState({ orderer });
  }

  addMealItem() {
    if (this.state.orderer !== 'changeme' && this.state.name && this.state.cost) {
      const isNotPreviousMealItem = !this.isNewMealItemInPreviousMealItems();
      if (isNotPreviousMealItem && this.state.name) {
        const newPreviousMealItems = this.state.previousMealItems;
        newPreviousMealItems.push({
          name: this.state.name,
          cost: this.state.cost,
        })
        this.setState({
          previousMealItems: newPreviousMealItems
        });
        window.localStorage.setItem('previousMealItems', JSON.stringify(newPreviousMealItems));
      }
      this.setState({
        name: '',
        orderer: 'changeme',
        cost: '',
      });
      this.props.addMealItem(this.state);
    } else {
      message.error('Change the orderer for this meal item.');
    }
  }

  deleteMealItem(index) {
    this.props.deleteMealItem(index);
  }

  removeAllNonDigits(string) {
    return string.replace(/\D/g, '');
  }

  processCurrencyDecimals(string) {
    return this.removeAllNonDigits(string).slice(0, 2);
  }

  processCurrencyWholeDollars(string) {
    return this.addCurrencyCommas(this.removeAllNonDigits(string));
  }

  addCurrencyCommas(string) {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  formatCurrencyString(previous, curr) {
    let newString = curr.trim();
    const hasDecimalAlready = previous.includes('.');
    const newStringHasDecimal = newString.includes('.');

    if (this.removeAllNonDigits(newString) === '') {
      return '';
    }

    if (hasDecimalAlready && newStringHasDecimal) {
      const newStringArray = newString.split('.');
      return `$ ${this.processCurrencyWholeDollars(newStringArray[0])}.${this.processCurrencyDecimals(newStringArray[1])}`
    } else if (newStringHasDecimal) {
      return `$ ${this.processCurrencyWholeDollars(newString)}.`;
    } else {
      return `$ ${this.processCurrencyWholeDollars(newString)}`
    }
  }

  isNewMealItemInPreviousMealItems() {
    return this.state.previousMealItems.some(
      mealItem => mealItem.name === this.state.name && mealItem.cost === this.state.cost
    );
  }

  render() {
    return (
      <div style={{ marginTop: '30px' }}>
        <Title level={2}>
          Order Details
        </Title>

        <Button
          type="primary"
          size="large" onClick={() => { this.setState({ isModalVisible: true }) }}
          className="mb-15"
        >
          Add Meal Item
          <PlusOutlined />
        </Button>

        <Modal
          title="Add Meal Item"
          visible={this.state.isModalVisible}
          okText="Add Meal Item"
          onOk={this.addMealItem}
          onCancel={() => { this.setState({ isModalVisible: false }) }}
        >
          <Space direction="vertical" className="w-100-percent">
            <AutoComplete
              options={
                !this.state.name || this.isNewMealItemInPreviousMealItems()
                  ? [] : this.state.previousMealItems.map(mealItem => ({
                    value: `${mealItem.name} - ${mealItem.cost}`,
                    name: mealItem.name,
                    cost: mealItem.cost,
                  }))
              }
              filterOption={(inputValue, option) => {
                if (option) {
                  return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
                } else {
                  return false;
                }
              }}
              className="w-100-percent"
              value={this.state.name}
              onChange={this.handleMealNameUpdate}
              onSelect={(value, option) => {
                this.setState({
                  name: option.name,
                  cost: option.cost,
                })
              }}
            >
              <Input
                suffix={<ShoppingCartOutlined />}
                size="large"
                placeholder="Meal item name"
              />
            </AutoComplete>
            <Input
              value={this.state.cost}
              onChange={this.handleMealCostUpdate}
              suffix={<DollarOutlined />}
              size="large"
              placeholder="Meal item price"
              className="w-100-percent"
              inputMode="decimal"
            />
            <Select
              style={{ width: '100%' }}
              size="large"
              value={this.state.orderer}
              className="w-100-percent"
              onChange={this.handleMealOrdererUpdate}
            >
              <Option value="changeme">Orderer</Option>
              {
                this.props.orderers.map((orderer, index) => (
                  <Option value={orderer.name}>{orderer.name}</Option>
                ))
              }
            </Select>
          </Space>
        </Modal>

        {
          !!this.props.receipt.mealItems.length && (
            <Table
              key={this.props.receipt.mealItems}
              dataSource={this.props.receipt.mealItems.map((item, index) => {
                item.index = index;
                const floatString = extractFloatStringFromCurrencyString(item.cost);
                const floatParsed = parseFloat(floatString);
                item.cost = `$${floatParsed.toFixed(2)}`;
                return item;
              })}
              columns={this.getColumns()}
              pagination={false}
              className="mb-15"
            />
          )
        }

        <Title level={5}>
          Total
        </Title>
        <Input
          value={this.props.receipt.total.toString()}
          onChange={(e) => { this.props.updateTotal(this.formatCurrencyString(this.props.receipt.total, e.target.value)); }}
          size="large"
          placeholder="$ 0.00"
          suffix={<DollarOutlined />}
          className="mb-15 max-w-300"
          inputMode="decimal"
        />

        <Title level={5}>
          Delivery Fee
        </Title>
        <Input
          value={this.props.receipt.deliveryFee.toString()}
          onChange={(e) => { this.props.updateDeliveryFee(this.formatCurrencyString(this.props.receipt.deliveryFee, e.target.value)); }}
          size="large"
          placeholder="$ 0.00"
          suffix={<DollarOutlined />}
          className="mb-15 max-w-300"
          inputMode="decimal"
        />

        <Title level={5}>
          Service Fee
        </Title>
        <Input
          value={this.props.receipt.serviceFee.toString()}
          onChange={(e) => { this.props.updateServiceFee(this.formatCurrencyString(this.props.receipt.serviceFee, e.target.value)); }}
          size="large"
          placeholder="$ 0.00"
          suffix={<DollarOutlined />}
          className="mb-15 max-w-300"
          inputMode="decimal"
        />
      </div>
    );
  }
}