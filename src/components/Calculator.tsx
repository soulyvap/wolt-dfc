import {FC, useState} from "react";
import DeliveryForm, {FormData} from "./DeliveryForm";

const Calculator: FC = () => {
    const [price, setPrice] = useState<string | null>(null)

    //changes price state according to user input
    const handlePrice = (formData: FormData) => {
        const result: number = calculatePrice(formData)
        setPrice(result.toFixed(2))
    }

    //returns true if the date input is a friday between 3 - 7 PM
    const isFridayRush = (date:Date): boolean => {
        const isFriday = date.getDay() === 5
        const isRushHour = date.getHours() >= 15 
            && date.getHours() <= 19
        return isFriday && isRushHour
    }

    //returns delivery price
    const calculatePrice = (formData: FormData): number => {
        const {cartVal, distance, items, date} = formData
        
        //if the cart value is greater or equal to 100, the price is always 0
        if (cartVal! >= 100) {
            return 0
        } else {
            const selectedDate = new Date(date!)
            const isRush = isFridayRush(selectedDate)

            //small order surcharge when cart value is smaller than 10
            const smallValueCharge = (cartVal! < 10) ? 10 - cartVal! : 0
            //delivery fee according to distance
            const distanceCharge = (distance! <= 1000)
                ? 2
                : Math.ceil(distance! / 500)
            //surcharge given number of items
            const itemsCharge = (items! <= 4) ? 0 : (items! - 4) * 0.5

            //sum of fees and surcharges
            let sum = smallValueCharge + distanceCharge + itemsCharge

            //adding friday rush multiplier
            if (isRush) sum *= 1.1

            //making sure the total price is never over 15
            return Math.min(sum, 15)
        }
    }

    return (
        <>
            <div className="container" >
                <h1>Delivery Fee Calculator </h1>
                <DeliveryForm handleData={handlePrice} />
                <div className="priceRow">
                    <p className="deliveryPrice">{(price) ? 'Delivery price' : ' '}</p>
                    <p className="price">{(price) ? `${price} €` : ' '}</p>
                </div>
                
            </div>
        </>
    )
}

export default Calculator
