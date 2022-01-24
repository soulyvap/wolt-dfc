import React, {FC, useState} from "react";

interface Props {
    passData: (formData: FormData) => void
}

interface FormData {
    cartVal: number | null
    distance: number | null
    items: number | null
    date: string | null
}

const DeliveryForm: FC<Props> = (props) => {
    const passData = props.passData

    const [inputs, setInputs] = useState<FormData>({
        cartVal: null,
        distance: null,
        items: null,
        date: null,
    })

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        console.log(inputs)
        passData(inputs)
    }

    const handleChange = (event: React.SyntheticEvent) => {
        const name = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="row">
                    <label>Cart value</label>
                    <input
                        type="number"
                        step={0.01}
                        min={0.00}
                        required
                        name="cartVal"
                        value={inputs.cartVal || ''}
                        onChange={handleChange} />
                    <p>€</p>
                </div>

                <div className="row">
                    <label>Delivery distance</label>
                    <input
                        type="number"
                        step={1}
                        min={0}
                        required
                        name="distance"
                        value={inputs.distance || ''}
                        onChange={handleChange} />
                    <p>m</p>
                </div>

                <div className="row">
                    <label>Number of items</label>
                    <input
                        type="number"
                        step={1}
                        min={0}
                        required
                        name="items"
                        value={inputs.items || ''}
                        onChange={handleChange} />
                </div>

                <div className="row">
                    <label>Time</label>
                    <input
                        type="datetime-local"
                        required
                        name="date"
                        value={inputs.date || ''}
                        onChange={handleChange} />
                </div>

                <div className="spacer"></div>

                <input className="submitBtn" type="submit" value="Calculate delivery fee" />

            </form>
        </>
    )
}

export default DeliveryForm;
export type {FormData};
