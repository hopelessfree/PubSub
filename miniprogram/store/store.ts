import PubSub from "./pubsub";

interface Params {
  actions?: Actions
  mutations?: Mutations
  state?: State
}

export type Actions = { [key: string]: (context: Store, payload: any) => void }
export type Mutations = { [key: string]: (state: State, payload: any) => void }
export type State = { [key: string | symbol]: any }


export default class Store {

  public actions: Actions = {}             // 存储异步方法
  public mutations: Mutations = {}           // 存储同步方法
  public state = {}               // 共享数据
  public status = 'resting'       // 防止手动更新
  public events = new PubSub()    // 

  constructor(params: Params) {
    if (params.actions) {
      this.actions = params.actions
    }

    if (params.mutations) {
      this.mutations = params.mutations
    }

    this.state = new Proxy(
      params.state || {},
      {
        set: (state: State, key: keyof State, value): boolean => {
          state[key] = value

          console.log(`stateChange: ${key.toString()}: ${value}`)
          this.events.publish('stateChange', this.state)

          if (this.status !== 'mutation') {
            console.warn(`You should use a mutation to set ${key.toString()}`);
          }

          this.status = 'resting'

          return true
        },

      }
    )

  }


  dispatch(actionKey: string, payload: any): boolean {

    // 判断是否存在方法
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey}" doesn't exist`);
      return false
    }


    this.status = 'action'
    this.actions[actionKey](this, payload)

    return true
  }

  commit(mutationKey: string, payload: any): boolean {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`)
      return false
    }

    this.status = 'mutation'

    let newState = this.mutations[mutationKey](this.state, payload)
    this.state = Object.assign(this.state, newState)
    return true
  }

}