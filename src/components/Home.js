import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Spinner } from 'reactstrap';
import "./Home.css";

function Home() {
    const [responseData, setResponseData] = useState([]);
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    // Fetch data from API
    const fetchData = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setLoader(false);
            setResponseData(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Handle navigation to checkout with product details
    const handleBuyNow = (productDetails, productId) => {
        navigate(`/checkout/${productId}`, { state: { product: productDetails } });
    }

    return (
        <>
            {loader ? <div><Spinner /></div> : <div className='home_container'>
                <div className="custom-file-upload">
                    <label htmlFor="fileInput">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63I8thR7pRS8BGi1uZmuTStZFaZobxUgpx4i1XGswSki7p2BGHEujeBOP0pwqLtSNOxM&usqp=CAU" alt="Upload File" width="100" height="100" />
                    </label>
                    <input
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        className="hidden"
                    />
                </div>
                {responseData.map((item, index) => (
                    <div key={index} className='home_card'>
                        <Card style={{ width: '18rem' }}>
                            <img
                                alt="Sample"
                                src={item.image}
                                className='card_image'
                            />
                            <CardBody>
                                <CardTitle tag="h5">
                                    {item.title}
                                </CardTitle>
                                <CardSubtitle className="mb-2 text-muted" tag="h6">
                                    {item.category}
                                </CardSubtitle>
                                <CardText>
                                    {item.description.substring(0, 100)}...
                                </CardText>
                                <CardText>
                                    ${item.price}
                                </CardText>
                                <CardText>
                                    {item.rating.rate}&#9734;
                                </CardText>
                                <Button color="primary" onClick={() => handleBuyNow(item, item.id)}>
                                    Buy Now
                                </Button>
                            </CardBody>

                        </Card>
                    </div>
                ))}
            </div>}
        </>

    );
}

export default Home;
