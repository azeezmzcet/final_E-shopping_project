import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";

const ProductSectionItem = ({ id, img, name, text, size, price, color, totalPrice }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);

    const user = useSelector((state) => state.user.user);
    const { authUser } = user;

    const defaultSize = size[0];
    const defaultColor = color[0];

    const handleAddToCartClick = () => {
        if (authUser) {
            dispatch(
                addToCart({
                    id,
                    img,
                    text,
                    amount: 1,
                    price,
                    totalPrice,
                    name,
                    size: defaultSize,
                    color: defaultColor,
                })
            );
        }
    };

    return (
        <div>
            <Card className="w-full md:w-96 relative">
                <Typography
                    variant="h4"
                    className={`mb-2 absolute top-2 right-2 z-10 text-red-700 animate-zoom-in-out text-sm md:text-lg ${
                        isHovered ? "opacity-100" : "opacity-0"
                    }`}
                >
                    OFFER%
                </Typography>
                <CardHeader floated={false} className="h-64 md:h-80 lg:h-96">
                    <img
                        src={img}
                        alt={name}
                        className="h-full w-full object-cover transition-transform transform-gpu hover:scale-105"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    />
                </CardHeader>
                <CardBody className="text-center p-4 md:p-6">
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-2 text-sm md:text-md lg:text-lg"
                    >
                        {name}
                    </Typography>
                    <Typography color="gray" className="font-medium text-xs md:text-sm lg:text-md">
                        {text}
                    </Typography>
                    <div className="flex justify-between items-center pt-4 text-xs md:text-sm lg:text-md">
                        <Typography color="red" className="font-medium text-xs md:text-sm lg:text-md">
                            Size left:{" "}
                            <span className="text-gray-400 text-xs md:text-sm lg:text-md">
                                {defaultSize}
                            </span>
                        </Typography>
                        <Typography color="gray" className="font-medium text-xs md:text-sm lg:text-md">
                            Color:{" "}
                            <span
                                className="px-2 rounded-full ml-2"
                                style={{ backgroundColor: defaultColor }}
                            ></span>
                        </Typography>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-center gap-4 md:gap-7 pt-2">
                    <Tooltip
                        content={authUser ? "Add to Cart" : "Please log in to add to cart"}
                        placement="bottom"
                    >
                        <Button
                            onClick={handleAddToCartClick}
                            size="sm md:lg"
                            color="gray"
                            variant="outlined"
                            ripple
                            disabled={!authUser}
                        >
                            Add to Cart
                        </Button>
                    </Tooltip>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductSectionItem;
