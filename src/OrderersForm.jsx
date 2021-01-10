import React,  {useState} from 'react';

export default function OrderersForm(props) {
  const orderers = props.orderers.map((orderer, index) => {
    return (
      <React.Fragment>
        <li>{orderer.toString()}</li>
        <button onClick={() => { props.deleteOrderer(index) }}>Delete Me</button>
      </React.Fragment>
    );
  });

  const [newOrderer, setNewOrderer] = useState('');

  const onAddOrdererClick = () => {
    setNewOrderer('');
    props.addOrderer(newOrderer);
  }

  return (
    <div>
      <h1>Orderers</h1>
      <ul>
        {orderers}
      </ul>
      <h2>
        Add Orderer
      </h2>
      <input value={newOrderer} onChange={(event) => { setNewOrderer(event.target.value) }} />
      <button onClick={onAddOrdererClick}>Add Orderer</button>
    </div>

  );
}