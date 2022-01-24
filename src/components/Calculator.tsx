import {FC, useState} from "react";
import DeliveryForm, {FormData} from "./DeliveryForm";

const Calculator: FC = () => {
    const [price, setPrice] = useState<string | null>(null)

    const handlePrice = (formData: FormData) => {
        const result: number = calculatePrice(formData)
        setPrice(result.toFixed(2))
    }

    const isFridayRush = (date:Date): boolean => {
        const isFriday = date.getDay() === 5
        const isRushHour = date.getHours() >= 15 
            && date.getHours() <= 19
        return isFriday && isRushHour
    }

    const calculatePrice = (formData: FormData): number => {
        const {cartVal, distance, items, date} = formData
        
        if (cartVal! >= 100) {
            return 0
        } else {
            const selectedDate = new Date(date!)
            const isRush = isFridayRush(selectedDate)

            const smallValueCharge = (cartVal! < 10) ? 10 - cartVal! : 0
            const distanceCharge = (distance! <= 1000)
                ? 2
                : Math.ceil(distance! / 500)
            const itemsCharge = (items! <= 4) ? 0 : (items! - 4) * 0.5

            let sum = smallValueCharge + distanceCharge + itemsCharge

            if (isRush) sum *= 1.1

            console.log(isRush, smallValueCharge, distanceCharge, itemsCharge)

            return Math.min(sum, 15)
        }
    }

    return (
        <>
            <div className="container" >
                <h1>Delivery Fee Calculator </h1>
                <DeliveryForm passData={handlePrice} />
                <p>{(price) ? `Delivery price: ${price} €` : ' '}</p>
            </div>
        </>
    )
}

export default Calculator
