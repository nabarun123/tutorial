import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';

function Checkout() {
    const location = useLocation();
    const { productId } = useParams(); // If using productId in URL path (optional)
    const { product } = location.state;

    if (!product) {
        return <div>Loading...</div>;
    }

    const checkoutClick = () => {
        alert('Product purchased successfully!');
    }

    return (
        <div className='checkout_container' style={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
                <img
                    alt="Sample"
                    src={product.image}
                    className='card_image'
                />
                <CardBody>
                    <CardTitle tag="h5">
                        {product.title}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {product.category}
                    </CardSubtitle>
                    <CardText>
                        {product.description}
                    </CardText>
                    <CardText>
                        ${product.price}
                    </CardText>
                    <CardText>
                        {product.rating.rate}&#9734;
                    </CardText>
                    <Button color="primary" onClick={checkoutClick}>
                        Proceed to Checkout
                    </Button>
                </CardBody>
            </Card>

        </div>
    );
}

export default Checkout;
