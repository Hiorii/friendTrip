export interface TripItemModel {
  itemId: string,
  itemName: string,
  itemCost: number,
  itemOwner: string,
  itemDescription: string,
  alreadyPaid: {tripId?: string, user: string, amount: number}[],
}
