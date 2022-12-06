import React from 'react';

import Button from '@mui/material/Button' 
import "./Order.css";
import { useState } from 'react';
import Axios from 'axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { outlinedInputClasses } from '@mui/material';
import {useEffect} from 'react';




const current = new Date();
const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`

  
function Order(){

	 const [nickname, setNickname] = useState("");
	 const [item, setItem] = useState("");
	 const [qty, setQty] = useState(0);
	 const [phone, setPhone] = useState("");

	 const displayInfo = () => { console.log(nickname + item + qty); };

	 const [newItem, setNewItem] = useState("");
	 const [newQty, setNewQty] = useState(0);

	 const [orderList, setOrderList] = useState([]);
	 const [completed, setCompleted] = useState(0);


	 const navigate = useNavigate();
	 const navigateHome = () => {
		navigate ('/');
    }

	const navigateArchive = () => {
		navigate('/orderarchive');
	}
	const navigateEmployee = () => {
		navigate('/Employee');
	}



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

		const getOpenOrders = () => {
			Axios.get("http://localhost:3001/openorders").then((response) => {
				 setOrderList(response.data);
			});
	   };

	   const markComplete = (id) => {
		Axios.put("http://localhost:3001/complete", {completed: 1, id: id}).then(
		(response) => {
			 setOrderList(
				 orderList.map((val) => {
					return val.id == id
					? {
						 id: val.id,
						 nickname: val.nickname,
						 item: val.item,
						 qty: val.qty,
						 phone: val.phone,
						 date: val.date,
						 completed: val.completed,
					}

					: val;
			   })
		   );
	   }
   );
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
							  date: val.date,
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
							  date: val.date,
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

	



		const sendEmail = (val) => {
			Axios.post('http://localhost:3001/send', {
				 nickname: val.nickname, 
				 item: val.item, 
				 qty: val.qty, 
				 date: val.date, 
				 phone: val.phone,	
				 })
			};



		const handleClick = event => {

		}


	useEffect(() => {
		getOpenOrders();
	}, []);

	 return(
	 <div> 
		<div className="topButtons">
	    <Button onClick={navigateEmployee} sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}>Back to employee menu</Button>

		</div>
	  <div className="header-final">
	 	<h1 className="PageTitle-final">Order queue:</h1>
		</div>

		<div className="order_page_final">
		<div className="choices-final">
		
        {orderList.map((val, key) => {
          return (
            <div className="order-final"> 
              <div className="data-final">

				<div className="col-final">
                <h3 className="field-name-final">Nickname:</h3>
					 <h3 className="field-final"> {val.nickname}</h3>
					</div>
					<div className="col-final">
                <h3 className="field-name-final">Item:</h3>
					 <h3 className="field-final"> {val.item}</h3>
					 </div>
					 <div className="col-final">
                <h3 className="field-name-final">Qty:</h3>
					 <h3 className="field-final"> {val.qty}</h3>
					 </div>
					 <div className="col-final">
                <h3 className="field-name-final">Order_Date:</h3>
					 <h3 className="field-final"> {val.date}</h3>
					 </div>
					 <div className="col-final">
                <h3 className="field-name-final">ID:</h3>
					 <h3 className="field-final"> {val.id}</h3>
					 </div>
			

              </div>
              <div className="data-final">
				<div className="col-final">
                <input
                  type="text"
                  placeholder="Update item here"
                  onChange={(event) => {
                    setNewItem(event.target.value);
                  }}

 				/>
                <Button className="updateButtons"
                  onClick={() => {
                    updateOrderItem(val.id);
                  }}
				  sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}
                  >
                  {" "}
                  Submit
                </Button>
				  </div>

				<div className="col-final">
				<input
				type="number"
				placeholder="Update quantity here"
				onChange={(event) => {
				setNewQty(event.target.value);
				}}
				/>

				<Button
					onClick={() => {
					updateOrderQty(val.id);
					}}  
					sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'orange' }}			
					>
					{" "}
					Submit
					</Button>
				</div>	

				<div className="col-final">	
                <Button
                  onClick={() => {
                    deleteOrder(val.id);
                  }} 
				  sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white' }} 
                 >
                  Cancel order
                </Button>
				</div>

				<div className="col-final">
				<Button
                  onClick={ () => {
                    sendEmail(val); markComplete(val.id); getOpenOrders()
				   }}
				   sx={{ color: 'white', backgroundColor: 'orange', borderColor: 'white' }} 
                 >
                  Mark Complete
                </Button>
				</div>

              </div>
            </div>
          );
        })}
      </div>
	  </div>
		</div> 

	 )

}
  
export default Order;

