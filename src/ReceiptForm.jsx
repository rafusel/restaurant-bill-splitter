import React from 'react';
import { Typography, Table, Button, Input, Select, Space, message, Modal } from 'antd';
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
      isModalVisible: false,
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
        isModalVisible: false,
      });
      this.props.addMealItem(this.state);
    } else {
      message.error('Change the orderer for this meal item.');
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

        <Button
          type="primary"
          size="large" onClick={() => { this.setState({ isModalVisible: true }) }}
          className="mb-15"
        >
          Add Meal Items
          <PlusOutlined />
        </Button>

        <Modal
          title="Add Meal Item"
          visible={this.state.isModalVisible}
          okText="Add Meal Item"
          onOk={this.addMealItem}
          onCancel={() => { this.setState({ isModalVisible: false }) }}
        >
          <Space direction="vertical"  className="w-100-percent">
            <Input
              value={this.state.name}
              onChange={this.handleMealNameUpdate}
              prefix={<ShoppingCartOutlined />}
              size="large"
              placeholder="Meal item name"
              className="w-100-percent"
            />
            <Input
              value={this.state.cost}
              onChange={this.handleMealCostUpdate}
              prefix={<DollarOutlined />}
              size="large"
              placeholder="Meal item price"
              className="w-100-percent"
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
                return item;
              })}
              columns={this.getColumns()}
              pagination={false}
              className="mb-15"
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