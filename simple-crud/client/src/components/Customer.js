import "./Customer.css";
import { useState } from 'react';
import Axios from 'axios';
import Button from '@mui/material/Button' 
import {Routes, Route, useNavigate} from 'react-router-dom';
import menu from '../assets/menu.png';
  
function Customer(){

	 const [nickname, setNickname] = useState("");
	 const [item, setItem] = useState("");
	 const [qty, setQty] = useState(0);
	 const [phone, setPhone] = useState("");

	 const displayInfo = () => { console.log(nickname + item + qty); };

	 const [newItem, setNewItem] = useState("");
	 const [newQty, setNewQty] = useState(0);

	 const [orderList, setOrderList] = useState([]);


	 const navigate = useNavigate();
	 const navigateHome = () => {
		navigate ('/');
    }

	const current = new Date();
	const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;


	 const addOrder = () => {
		Axios.post('http://localhost:3001/create', {
			 nickname: nickname, 
			 item: item, 
			 qty: qty, 
			 date: date,
			 phone: phone,
			 }).then(() => { 
				  setOrderList([
				  		...orderList, 
						{
							 nickname: nickname,
							 item: item,
							 qty: qty,
							 date: date,
							 phone: phone,
						},
					]);
			 });
		};

		const getOrders = () => {
			 Axios.get("http://localhost:3001/orders").then((response) => {
				  setOrderList(response.data);
			 });
		};



		const updateOrderItem = (id) => {
			 Axios.put("http://localhost:3001/update", {item: newItem, id: id }).then(
			 (response) => {
				  setOrderList(
				  	orderList.map((val) => {
						 return val.id == id
						 ? {
							  id: val.id,
							  nickname: val.nickname,
							  item: val.item,
							  qty: val.qty,
							  date: date,
							  phone: val.phone,
							 }

							: val;
						})
					);
				 }
				);
		};


		const updateOrderQty = (id) => {
			 Axios.put("http://localhost:3001/updateq", {qty: newQty, id: id}).then(
			 (response) => {
				  setOrderList(
				  	orderList.map((val) => {
						 return val.id == id
						 ? {
							  id: val.id,
							  nickname: val.nickname,
							  item: val.item,
							  qty: val.qty,
							  date: date,
							  phone: val.phone
						 }

						 : val;
					})
				);
			}
		);
	};



		const deleteOrder = (id) => {
			 Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
				  setOrderList(
				  	orderList.filter((val) => {
						 return val.id !== id;
					})
				);
			});
		};


	 return(
	 <div className="button-top"> 
	  <Button onClick={navigateHome} sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white' }} variant='outlined' >Home</Button>
	  <div className="total">
	  <div className="Title">
	 	<h1 className="page-title">Place an order:</h1>
		</div>
		<div className="order_page">
		 <div className="order_col">
		 	<h2 className="pageText">Enter your order info here:</h2>
	 		<label className="label">Name:</label>
	 		<input className="label2" type ="text" onChange={(event) => { setNickname(event.target.value); }} />
	 		<label className="label">Item:</label>
	 		<input className="label2" type="text" onChange={(event) => { setItem(event.target.value); }} />
	 		<label className="label">Quantity:</label>
	 		<input  className="label2" type="number" onChange={(event) => { setQty(event.target.value); }}/>
			<label className="label">Email:</label>
			<input className="label2" type="text" onChange={(event) => { setPhone(event.target.value); }}/>

			<Button onClick={addOrder} sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white', minWidth: '30%', padding: '20px', margin: '20px'}} variant='outlined' >Submit Order</Button>
		
		
		 
		
        {orderList.map((val, key) => {
          return (
            <div className="order-confirm"> 
			  
              <div>
			  <h3>Order confirmation</h3>
                <h3>Nickname: {val.nickname}</h3>
                <h3>Item: {val.item}</h3>
                <h3>Qty: {val.qty}</h3>
                <h3>Order_Date: {val.date}</h3>
				<h3>Email: {val.phone}</h3>
             
              </div>
              <div>
                          
              </div>
            </div>
          );
		
        })}
      
	  </div>
	  <div className="order_col">
			<img src={menu} alt="spanky's menu" />
		</div>
	  </div>



		</div>
	</div>
	

	 )

}
  
export default Customer;
