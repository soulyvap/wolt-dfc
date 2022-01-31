import React, {FC, useState} from "react";

//defining prop types for DeliveryForm
interface Props {
    handleData: (formData: FormData) => void
}

//defining data types for form
interface FormData {
    cartVal: number | null
    distance: number | null
    items: number | null
    date: string | null
}

//form taking user input
const DeliveryForm: FC<Props> = (props) => {
    const handleData = props.handleData

    //state of inputs
    const [inputs, setInputs] = useState<FormData>({
        cartVal: null,
        distance: null,
        items: null,
        date: null,
    })

    //changes inputs state on user input change
    const handleChange = (event: React.SyntheticEvent) => {
        const name = (event.target as HTMLInputElement).name
        const value = (event.target as HTMLInputElement).value;
        setInputs(values => ({...values, [name]: value}))
    }

    //passes data to calculator on submit and triggers calculation
    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        handleData(inputs)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>

                <div className="row">
                    <label>Cart value (€)</label>
                    <input
                        type="number"
                        step={0.01}
                        min={0.00}
                        required
                        name="cartVal"
                        value={inputs.cartVal || ''}
                        onChange={handleChange} />
                </div>

                <div className="row">
                    <label>Delivery distance (m)</label>
                    <input
                        type="number"
                        step={1}
                        min={0}
                        required
                        name="distance"
                        value={inputs.distance || ''}
                        onChange={handleChange} />
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
