import {Tokens} from "../../tokens/interfaces/tokens";
import {User} from "../../users/interfaces/user"

export interface PublicUserData extends Tokens {
  user: User
}