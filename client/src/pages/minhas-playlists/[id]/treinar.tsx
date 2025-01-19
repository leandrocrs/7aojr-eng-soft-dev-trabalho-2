import { useParams } from "react-router"

export function Component() {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>My Playlist Workout {id}</h1>
            <p>Welcome to the my playlist workout page!</p>
        </div>
    )
}