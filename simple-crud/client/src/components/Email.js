import React from 'react';
import { Email, Item, A} from 'react-html-email';

export default function InlineLink({val}) {
  return (
  <Email title='link'>
    <Item>
       Hello {val.name},
       Your order from Spanky's is ready to be picked up. 

       Order details:
       Name: {val.name}
       Item: {val.item}
       Quantity: {val.qty}
       Order date: {val.date}
       Email: {val.phone}
    </Item>

  </Email>
)};