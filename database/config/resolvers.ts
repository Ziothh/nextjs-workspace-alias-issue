import { NonEmptyArray } from "type-graphql";
import BusinessResolver from "@resolvers/Business.resolver";
import SiteResolver from "@resolvers/SiteResolver.resolver";
import { isDev } from "@workspace/shared/constants/env";
import DevResolver from "@resolvers/DevResoler.resolver";

const RESOLVERS: NonEmptyArray<any> = [
    BusinessResolver,
    SiteResolver,
]

if (isDev) (RESOLVERS as any[]).push(
    DevResolver
)

export default RESOLVERS