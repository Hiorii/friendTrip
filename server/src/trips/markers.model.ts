import {UsersType} from "../users/users.model";
import {VotingStatusModel} from "./voting-status.enum";

export interface MarkersModel {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  label: {
    id: string;
    color: string;
    text: string;
    voteStatus: VoteStatusModel;
  };
  options: {
    [key: string]: boolean | string;
  };
}

interface VoteStatusModel {
  status: VotingStatusModel;
  votesCount: number;
  user: UsersType;
}
