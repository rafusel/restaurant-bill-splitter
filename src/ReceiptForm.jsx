import React from 'react';
import { Typography, Table, Button, Input, Select, Row, Col } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

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

  handleMealOrdererUpdate(orderer) {
    this.setState({ orderer });
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
      <div style={{ marginTop: '30px' }}>
        <Title>
          Meal Details
        </Title>

        <Title level={2}>
          Add Meal Items
        </Title>

        <Row style={{ marginBottom: '20px' }}>
          <Col flex="auto" className="pr-5 pb-10">
            <Input
              value={this.state.name}
              onChange={this.handleMealNameUpdate}
              prefix={<ShoppingCartOutlined />}
              size="large"
              placeholder="Meal item name"
            />
          </Col>

          <Col flex="auto" className="pr-5 pb-10">
            <Input
              value={this.state.cost}
              onChange={this.handleMealCostUpdate}
              prefix={<DollarOutlined />}
              size="large"
              placeholder="Meal item price"
            />
          </Col>

          <Col flex="auto" className="pr-5 pb-10">
            <Select
              style={{ width: '100%' }}
              size="large"
              value={this.state.orderer}
              onChange={this.handleMealOrdererUpdate}
            >
              <Option value="changeme">Orderer</Option>
              {
                this.props.orderers.map((orderer, index) => (
                  <Option value={orderer}>{orderer}</Option>
                ))
              }
            </Select>
          </Col>

          <Col flex="10px">
            <Button
              type="primary"
              size="large"
              onClick={this.addMealItem}
            >
              <PlusOutlined />
            </Button>
          </Col>
        </Row>

        {
          !!this.props.receipt.mealItems.length && (
            <Table
              key={this.props.receipt.mealItems}
              dataSource={this.props.receipt.mealItems.map((item, index) => {
                item.index = index;
                return item;
              })}
              columns={this.getColumns()}
            />
          )
        }

        <Title level={2}>
          Total
        </Title>
        <Input
          value={this.props.receipt.total.toString()}
          onChange={(e) => { this.props.updateTotal(e.target.value) }}
          size="large"
          prefix={<DollarOutlined />}
          className="mb-15 max-w-300"
        />

        <Title level={2}>
          Delivery Fee
        </Title>
        <Input
          value={this.props.receipt.deliveryFee.toString()}
          onChange={(e) => { this.props.updateDeliveryFee(e.target.value) }}
          size="large"
          prefix={<DollarOutlined />}
          className="mb-15 max-w-300"
        />

        <Title level={2}>
          Service Fee
        </Title>
        <Input
          value={this.props.receipt.serviceFee.toString()}
          onChange={(e) => { this.props.updateServiceFee(e.target.value) }}
          size="large"
          prefix={<DollarOutlined />}
          className="mb-15 max-w-300"
        />
      </div>
    );
  }
}