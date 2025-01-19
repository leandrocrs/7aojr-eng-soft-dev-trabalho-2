import { useParams } from "react-router"

export function Component() {
    const { id } = useParams<{ id: string }>()

    return (
        <div>
            <h1>Edit Playlist {id}</h1>
            <p>Welcome to the edit playlist page!</p>
        </div>
    )
}