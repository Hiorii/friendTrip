import {UsersModel} from "./users.model";
import {VotingStatusModel} from "../enums/voting-status.model";

export interface VoteStatusModel {
  status: VotingStatusModel
  votesCount: number
  user: UsersModel
}
