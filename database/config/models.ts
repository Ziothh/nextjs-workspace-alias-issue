import Business from "@models/business/Business.model"
import Image from "@models/Image.model"
import Site from "@models/Site.model"
import User from "@models/user/User.model"

const DB_MODELS: any[] = [
    // registered entities
    Business,
    Image,
    Site,
    User,
]

export default DB_MODELS