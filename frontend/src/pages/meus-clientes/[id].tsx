import { useParams } from "react-router"

export function Component() {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>My Client Progress {id}</h1>
            <p>Welcome to the my client progress page!</p>
        </div>
    )
}