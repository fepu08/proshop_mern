import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ location }) => {
  const [searchParams] = useSearchParams();
  const qty = Number(searchParams.get('qty'));
  const { id } = useParams();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [id, qty, dispatch]);

  return <div>Cart</div>;
};

export default CartScreen;
