import React, { Component } from 'react';
import './Joke.css'

class Joke extends Component {
  state = {}

  handleUp = () => {

    this.props.upVote(this.props.data.id)
  }
  handleDown = () => {

    this.props.downVote(this.props.data.id)
  }

  render() {
    const { data } = this.props
    return (
      <div className="card" style={{ margin: '10px auto', width: '50rem' }}>
        <div className="card-body">
          <h6 className="card-subtitle mb-2 text-muted">Score: {data.up - data.down}</h6>
          <p className="card-text">{data.joke}</p>
          <i onClick={this.handleDown} className="m-3 thumbs text-danger fas fa-thumbs-down"></i>
          <i onClick={this.handleUp} className="fas thumbs text-primary fa-thumbs-up"></i>
        </div>
      </div>
    );
  }
}

export default Joke;