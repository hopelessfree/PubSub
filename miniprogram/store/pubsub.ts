export default class PubSub {
  public events: { [key: string]: Array<(data: any) => void> } = {}

  constructor() {
    this.events = {}
  }

  subscribe(event: string, classback: (data: any) => void) {
    if (Object.prototype.hasOwnProperty.call(this.events, event) === false) {
      this.events[event] = []
    }

    return this.events[event].push(classback)
  }

  publish(event: string, data: any) {
    if (Object.prototype.hasOwnProperty.call(this.events, event) === false) {
      return []
    }

    return this.events[event].map(callback => callback(data))
  }

}