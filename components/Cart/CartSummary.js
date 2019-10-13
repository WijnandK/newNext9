import { Button, Segment, Divider } from "semantic-ui-react";

function CartSummary() {
  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $0
        <Button icon="cart" color="teal" floated="right" content="checkout" />
      </Segment>
    </>
  );
}

export default CartSummary;
