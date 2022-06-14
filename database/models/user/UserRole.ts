import { registerEnumType } from "type-graphql";

enum UserRole {
    DEVELOPER,
    ADMIN
}
registerEnumType(UserRole, {
    name: "UserRole"
})

export default UserRole