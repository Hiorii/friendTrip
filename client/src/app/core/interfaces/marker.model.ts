import {VoteStatusModel} from "./vote-status.model";

export interface MarkerModel {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  label: {
    id: string;
    color: string;
    text: string;
    voteStatus: VoteStatusModel[]
  };
  options: {
    [key: string]: boolean | string
  }
}
