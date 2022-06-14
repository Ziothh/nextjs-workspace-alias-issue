import { useRef } from "react"

export default function Test() {
    const inputElement = useRef<HTMLInputElement>(null)

    const submitForm = (event: any) => {
        event.preventDefault()
        const files = inputElement.current?.files

        if (files) {
            const fileReader = new FileReader()

            fileReader.onload = async () => {
                try {
                    const result = fileReader.result as string
                    try {
                        console.log(result)
                        await fetch("http://localhost:3000/api/graphql", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                query: `
                                mutation AddImg($img: Upload!) {
                                    addImg(img: $img)
                                }
                                `,
                                variables: {
                                    img: files[0],
                                },
                            }),
                        })
                    } catch (error) {
                        console.log(error)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fileReader.readAsDataURL(files[0])
        }
    }

    return (
        <form>
            <input ref={inputElement} type="file"></input>
            <button onClick={(event) => submitForm(event)}>Submit</button>
        </form>
    )
}
