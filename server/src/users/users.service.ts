import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersType } from './users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { log } from 'util';
import { MessageModel } from '../chat/message.model';
import { MarkersModel } from '../trips/markers.model';
import { TripsType } from '../trips/trips.model';
import {VotingStatusModel} from "../trips/voting-status.enum";
import {WaypointsModel} from "../trips/waypoints.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModule: Model<UsersType>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<UsersType[]> {
    return this.usersModule.find().exec();
  }

  async getUser(condition: any): Promise<UsersType> {
    return this.usersModule.findOne({ email: condition });
  }

  async getUserById(id: any): Promise<UsersType> {
    return this.usersModule.findOne({ id: id });
  }

  async getCurrentUser(email: string) {
    return this.usersModule.findOne({ email: email });
  }

  async addNewUser(userData: UsersType): Promise<UsersType> {
    const { email } = userData;
    const existingUser = await this.usersModule.findOne({ email });

    if (!existingUser) {
      const newUser = new this.usersModule({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: userData.password,
        photo: userData.photo,
        creationDate: userData.creationDate,
        usersTrips: [],
        isActive: userData.isActive,
      });

      await newUser.save();

      return newUser;
    } else {
      return existingUser;
    }
  }

  async userLogin(userData: UsersType, response: Response) {
    const { email, password } = userData;
    const user = await this.getUser(email);

    if (!user) {
      throw new BadRequestException('Invalid login data');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password data');
    }

    const jwt = await this.jwtService.signAsync({ id: user._id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return user;
  }

  async user(request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.getUserById({ id: data['id'] });

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async userLogout(response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'Logout success',
    };
  }

  async getUserTrips(data: any) {
    return this.usersModule
      .findOne({ email: data.userEmail })
      .select('usersTrips -_id');
  }

  async getUserTrip(tripData: any) {
    let currentTripData;

    await this.getUserTrips(tripData).then((data) => {
      const currentTrip = data.usersTrips.filter(
        (trip) => trip._id.toString() === tripData.id,
      );

      currentTrip.map((data) => (currentTripData = data));
    });

    return currentTripData;
  }

  async addNewUserTrip(newTripData: any): Promise<any> {
    const filter = { email: newTripData.currentUser.email };
    const user = await this.getUser(newTripData.currentUser.email);
    const dataToUpdate = {
      usersTrips: [...user.usersTrips, newTripData.tripData],
    };
    // user.usersTrips.map((data) => {
    //   if (
    //     data.travelInfoData.travelName ===
    //     newTripData.tripData.travelInfoData.travelName
    //   ) {
    //     return { message: 'Trip with such name already exist' };
    //   }
    // });

    const newUserTrips = await this.usersModule.findOneAndUpdate(
      filter,
      dataToUpdate,
    );

    await newUserTrips.save();

    return newUserTrips;
  }

  async addMessagesToTrip(id: string, messages: MessageModel[]) {
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === id);

        trip.usersTrips.forEach((a) => {
          if (a.id === id) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          data.messages.push(messages);
        });

        tripToUpdate = currentTrip;
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });
  }

  async addMarkersToTrip(
    tripId: string,
    currentUser: any,
    markers: MarkersModel[],
  ) {
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === tripId);

        trip.usersTrips.forEach((a) => {
          if (a.id === tripId) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          data.markers.push(markers);
        });

        tripToUpdate = currentTrip;
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });
  }

  async removeMarkerFromTrip(tripId, query) {
    const { markerId } = query;
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === tripId);

        trip.usersTrips.forEach((a) => {
          if (a.id === tripId) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          let currMarker;
          let index;

          data.markers.map((marker) =>
            marker.markers.map((m) => {
              if (m.label.id === markerId) {
                currMarker = m;
                index = marker.markers.indexOf(m);

                if (index > -1) {
                  marker.markers.splice(index, 1);
                }
              }
            }),
          );
        });

        tripToUpdate = [...new Set(currentTrip)];
        tripToUpdate.map((data) =>
          data.markers.map((m) => {
            const index = data.markers.indexOf(m);

            if (index > -1) {
              if (m.markers.length === 0) {
                data.markers.splice(index, 1);
              }
            }
          }),
        );
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });

    return tripToUpdate;
  }

  async removeWaypointsFromTrip(tripId, query) {
    const { waypointId } = query;
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === tripId);

        trip.usersTrips.forEach((a) => {
          if (a.id === tripId) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          let currWaypoint;
          let index;

          data.waypoints.map((waypoint) => {
            if (waypoint.waypoints.id === waypointId) {
              currWaypoint = data.waypoints.filter(w => w.waypoints === waypoint.waypoints)

              index = data.waypoints.indexOf(...currWaypoint);

              if (index > -1) {
                data.waypoints.splice(index, 1);
              }
            }
          });
        });

        tripToUpdate = [...new Set(currentTrip)];
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });

    return tripToUpdate;
  }

  async voteOnMarker(id: string, currentUser: any, votingStatus: any) {
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === id);

        trip.usersTrips.forEach((a) => {
          if (a.id === id) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          data.markers.map((marker) =>
            marker.markers.map((m) => {
              m.label.voteStatus.forEach(us => {
                if (us.user.email === currentUser.currentUser.email) {
                  us.status = votingStatus.votingStatus;
                  us.votesCount = 0;
                }
              })
            }),
          );
        });

        tripToUpdate = currentTrip;
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });
    return tripToUpdate;
  }

  async addNewWaypoints(
    tripId: string,
    currentUser: any,
    waypoints: WaypointsModel,
  ) {
    let tripToUpdate;
    let currentTrip;
    const userList = [];

    await this.getAllUsers().then((data) => {
      data.forEach((trip) => {
        currentTrip = trip.usersTrips.filter((tr) => tr.id === tripId);

        trip.usersTrips.forEach((a) => {
          if (a.id === tripId) {
            data.map((b) => userList.push(b.email));
          }
        });

        //currentTrip.map((data) => (data.messages = messages));

        currentTrip.forEach((data) => {
          data.waypoints.push(waypoints);
        });

        tripToUpdate = currentTrip;
      });
    });

    this.usersModule
      .updateMany(
        { email: { $in: userList } },
        { $set: { usersTrips: tripToUpdate } },
        { multi: true },
      )
      .then((res) => {
        console.log(res);
      });
    return tripToUpdate;
  }
}
