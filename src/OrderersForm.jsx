import React,  {useState} from 'react';
import { Typography, Button, Input } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import OrdererCard from './OrdererCard';
import './App.css';

const { Title } = Typography;

export default function OrderersForm(props) {
  const orderers = props.orderers.map((orderer, index) => {
    return (
      <OrdererCard
        name={orderer.toString()}
        handleDelete={() => { props.deleteOrderer(index) }}
      />
    );
  });

  const [newOrderer, setNewOrderer] = useState('');

  const onAddOrdererClick = () => {
    setNewOrderer('');
    props.addOrderer(newOrderer);
  }

  return (
    <div style={{ marginTop: '60px' }}>
      <Title>Orderer Details</Title>
      <Title level={2}>
        Add Orderer
      </Title>
      <Input
        size="large"
        placeholder="Orderer name"
        prefix={<UserOutlined />}
        value={newOrderer}
        onChange={(event) => { setNewOrderer(event.target.value) }}
        onKeyPress={event => event.key === 'Enter' && onAddOrdererClick()}
        suffix={
          <Button type="primary" onClick={onAddOrdererClick}>
            <PlusOutlined />
          </Button>
        }
        style={{ marginBottom: '10px' }}
      />
       {orderers}
    </div>

  );
}