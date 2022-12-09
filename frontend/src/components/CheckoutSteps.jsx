import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 flex-column flex-sm-row">
      <Nav.Item className="flex-fill">
        {step1 ? (
          <Nav.Link className="px-0" as={NavLink} to="/login">
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link className="px-0" as={NavLink} disabled>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="flex-fill">
        {step2 ? (
          <Nav.Link className="px-0" as={NavLink} to="/shipping">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link className="px-0" as={NavLink} disabled>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="flex-fill">
        {step3 ? (
          <Nav.Link className="px-0" as={NavLink} to="/payment">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link className="px-0" as={NavLink} disabled>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="flex-fill">
        {step4 ? (
          <Nav.Link className="px-0" as={NavLink} to="/placeorder">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link className="px-0" as={NavLink} disabled>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
