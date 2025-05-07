import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value, updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, seltTitle] = useState("");
    const [price, seltPrice] = useState(0);
    const [image, seltImage] = useState("")
    const { mutate, isSuccess, isPending} = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])
    
    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Título" value={title} updateValue={seltTitle}></Input>
                    <Input label="Preço" value={price} updateValue={seltPrice}></Input>
                    <Input label="Imagem" value={image} updateValue={seltImage}></Input>
                </form>
                <button onClick={submit} className="btn-secondary">{isPending ? 'postando...' : 'Postar'}
                </button>
            </div>
        </div>
    )
}