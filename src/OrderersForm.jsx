import React, { useState } from 'react';
import { Typography, Button, Input, AutoComplete } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import OrdererCard from './OrdererCard';
import './App.css';

const { Title } = Typography;

export default function OrderersForm(props) {
  const orderers = props.orderers.map((orderer, index) => {
    return (
      <OrdererCard
        name={orderer.name}
        backgroundColor={orderer.color}
        handleDelete={() => { props.deleteOrderer(index) }}
      />
    );
  });

  const previousOrderersInitialValue = JSON.parse(window.localStorage.getItem('previousOrderers') || '[]');

  const [newOrderer, setNewOrderer] = useState('');
  const [previousOrderers, setPreviousOrderers] = useState(previousOrderersInitialValue);

  const isNewOrdererInPreviousOrderers = () => previousOrderers.some(o => o === newOrderer)

  const onAddOrdererClick = () => {
    setNewOrderer('');
    const isNotPreviousOrderer = !isNewOrdererInPreviousOrderers();
    if (isNotPreviousOrderer && newOrderer) {
      const newPreviousOrderers = previousOrderers
      newPreviousOrderers.push(newOrderer);
      setPreviousOrderers(newPreviousOrderers);
      window.localStorage.setItem('previousOrderers', JSON.stringify(newPreviousOrderers));
    }
    props.addOrderer(newOrderer);
  }

  return (
    <div style={{ marginTop: '60px' }}>
      <Title level={2}>Orderer Details</Title>
      <Title level={5}>
        Add Orderer
      </Title>

      <AutoComplete
        options={!newOrderer || isNewOrdererInPreviousOrderers() ? [] : previousOrderers.map(o => ({ value: o }))}
        filterOption={(inputValue, option) => {
          if (option) {
            return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
          } else {
            return false;
          }
        }}
        className="mb-15 w-100-percent"
        value={newOrderer}
        onChange={(value) => { setNewOrderer(value) }}
        onKeyPress={event => event.key === 'Enter' && onAddOrdererClick()}
      >
        <Input
          size="large"
          placeholder="Orderer name"
          prefix={<UserOutlined />}
          suffix={
            <Button type="primary" onClick={onAddOrdererClick}>
              <PlusOutlined />
            </Button>
          }
        />
      </AutoComplete>
      {orderers}
    </div>

  );
}