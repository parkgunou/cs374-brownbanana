
export class Menus {

  constructor(key, json) {
    this.key = key
    this.description = json.description
    this.name = json.name
    this.price = json.price
    this.time_consumed_mins = json.time_consumed_mins
    this.image_url = json.image_url
  }
}