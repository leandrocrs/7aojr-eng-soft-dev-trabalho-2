import { useParams } from "react-router";

export function Component() {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>Editando o treino {id}</h1>
            <p>Welcome to the manage training edit page!</p>
        </div>
    )
}