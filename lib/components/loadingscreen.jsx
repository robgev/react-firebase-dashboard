import React, { Component } from 'react';

export default
class LoadingScreen extends Component {
  constructor() {
    super();
    this.state = {
      promiseState : '',
      error : {},
      value : {},
    }
  }

  componentWillMount() {
    this.observePromise(this.props.promise)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.promise !== nextProps.promise) {
      this.observePromise(nextProps.promise)
    }
  }

  observePromise(p) {
    this.setState({promiseState: 'pending'});
    p.then(v => this.setState({promiseState: 'fulfilled', value: v}),
           e => this.setState({promiseState: 'rejected', error: e}))
  }

  render() {
    if (this.props.promise == {})
      return null;
    if (this.state.promiseState == 'pending')
      return this.props.whenPending();
    if (this.state.promiseState == 'rejected')
      return (
        <div>Error: {this.state.error}</div>
      );
    if (this.state.promiseState == 'fulfilled') {
      return this.props.whenResolved(this.state.value)
    }
  }
}
