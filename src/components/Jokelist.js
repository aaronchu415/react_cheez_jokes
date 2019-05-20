import React, { Component } from 'react';
import Joke from './Joke'
import axios from 'axios'

class JokeList extends Component {
  state = {
    jokesData: [],
    loading: true
  }

  getNewJokes = async () => {
    let response = await axios.get(`https://icanhazdadjoke.com/search?limit=10&page=${Math.floor(Math.random() * 28) + 1}`, {
      headers: {
        Accept: 'application/json',
      }
    });

    let jokesData = response.data.results
    jokesData = jokesData.map(joke => {
      joke.up = 0
      joke.down = 0

      return joke
    })

    localStorage.setItem('jokesData', JSON.stringify(jokesData));
    this.setState({ jokesData, loading: false })
  }

  async componentDidMount() {


    //get joke from local storage and set to state

    let jsonString = localStorage.getItem('jokesData');
    let jokesData = JSON.parse(jsonString)

    if (jsonString === undefined) await this.getNewJokes();
    else {
      this.setState({ jokesData, loading: false })
    }

  }

  handleUp = (id) => {

    let jokesData = this.state.jokesData.map(joke => {

      if (joke.id === id) joke.up++
      return joke
    })

    this.setState({ jokesData })
  }
  handleDown = (id) => {


    let jokesData = this.state.jokesData.map(joke => {

      if (joke.id === id) joke.down++
      return joke
    })

    this.setState({ jokesData })
  }

  render() {

    const { jokesData, loading } = this.state

    jokesData.sort((prevJoke, currJoke) => {
      let prevScore = prevJoke.up - prevJoke.down
      let currScore = currJoke.up - currJoke.down

      return currScore - prevScore
    })

    console.log('RENDER', jokesData)

    if (jokesData.length !== 0) {
      localStorage.setItem('jokesData', JSON.stringify(jokesData));
    }

    return (
      <div>

        {loading ? <img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-030f7b87ee31.gif"></img>
          :
          <div>
            <button className="btn btn-success" onClick={this.getNewJokes}>Get New Jokes</button>
            {jokesData.map(joke => <Joke
              key={joke.id}
              upVote={this.handleUp}
              downVote={this.handleDown}
              data={joke} />)}
          </div>
        }
      </div>
    );
  }
}

export default JokeList;