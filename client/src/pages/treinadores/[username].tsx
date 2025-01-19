import { useParams } from "react-router";

export function Component() {
    const { username } = useParams<{ username: string }>()

    return (
        <div>
            Treinador(a) {username}
        </div>
    )
}