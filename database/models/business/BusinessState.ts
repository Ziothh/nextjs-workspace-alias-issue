import { registerEnumType } from "type-graphql"

enum BusinessState {
    PUBLIC,
    DRAFT,
    PENDING_APROVAL
}

registerEnumType(BusinessState, {
    name: "BusinessState",
    description: "The state of the business."
})

export default BusinessState