import { DataStore } from './dataStore'
import { Component } from 'composi'

export class DataStoreComponent extends Component {
  /**
   * @typedef {Object.<string, any>} Props
   * @property {DataStore} Props.dataStore
   * @param {Props} props 
   */
  constructor(props) {
    super(props)
    /**
     * @property {DataStore} dataStore
     */
    this.dataStore = /** @type {DataStore}*/(props.dataStore)
    if (props.dataStore instanceof DataStore) {
      props.dataStore.watch('stateChange', () => this.update(props.dataStore.state))
    }
  }
}
