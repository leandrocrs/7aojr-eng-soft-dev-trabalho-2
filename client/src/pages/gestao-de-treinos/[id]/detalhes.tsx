import { useParams } from "react-router";

export function Component() {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>Training Details {id}</h1>
            <p>Welcome to the training details page!</p>
        </div>
    )
}