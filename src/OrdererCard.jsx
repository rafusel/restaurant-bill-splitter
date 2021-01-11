import React, { useState } from 'react';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function OrdererCard(props) {
  const backgroundColors = ['#ff8519', '#07d907', '#c904db', '#fa0c34', '#0cfae2', '#ff1979'];
  const [backgroundColor] = useState(
    backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
  );
  const styles = {
    backgroundColor: backgroundColor,
    borderRadius: '10px',
    color: 'white',
    fontSize: '25px',
    padding: '5px 15px 5px 15px',
    margin: '0 10px 10px 0',
    display: 'inline-flex',
    alignItems: 'center',
  };

  return (
    <span style={styles}>
      <UserOutlined style={{ marginRight: '5px' }} />
      {props.name}
      <Button type="primary" onClick={props.handleDelete} style={{ marginLeft: '20px' }}>
        <DeleteOutlined />
      </Button>
    </span>
  );
}