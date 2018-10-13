import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var url = "http://127.0.0.1:5000/find-path";
class App extends React.Component {
    render() {
        return (
            <div className="app">
            <Board />
            </div>
        )
    }
}

class Board extends React.Component{
    render(){
        return (
            <div className="board">
            <Form />
            </div>
        )
    }
}

function Warning(props) {
    if(props.warning === true){
        return (
            <div className="warning">
                <span>No Path to Goal.</span>
            </div>
        )
    } else {
        return null;
    }
}

class Form extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            bigJug: 0,
            littleJug: 0,
            goal: 0,
            path: [],
            warning: false
        }

        this.handleBigJugChange = this.handleBigJugChange.bind(this);
        this.handleLittleJugChange = this.handleLittleJugChange.bind(this);
        this.handleGoalChange = this.handleGoalChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

  handleClick(){
      return fetch(url + "/" + this.state.bigJug + "/" + this.state.littleJug + "/" + this.state.goal + "/",
      {crossDomain: true})
      .then( (response) => {
          return response.json();
      })
      .then( (data) => {
        if(data.status === "success"){
            this.setState({path: data.payload.path});
        }else{
            this.setState({warning: true, path: []});
        }
      });
  }

  handleBigJugChange(e){
      this.setState({ bigJug: e.target.value});
  }

  handleLittleJugChange(e){
      this.setState({ littleJug: e.target.value});
  }

  handleGoalChange(e){
      this.setState({ goal: e.target.value});
  }

  renderPath(){
    var path = this.state.path.map( (step, i) => {
        var arrow = null;
        if (i !== this.state.path.length-1){
            arrow = <span> > </span>;
        }

        return (
            <div className="step" key={i}>[ {step[0]}, {step[1]} ]{arrow}</div>
        )
    });
    return path;
  }

  render() {
    return (
        <div className="form">
            <form>
                <div className="formGroup">
                    <label name="bigjug">BigJug</label>
                    <div><input type="text" id="bigjug" name="bigjug" size="5" value={this.state.bigJug} onChange={this.handleBigJugChange}></input></div>
                </div>

                <div className="formGroup">
                    <label name="littlejug">LittleJug</label>
                    <div><input type="text" id="littlejug" name="littlejug" size="5" value={this.state.littleJug} onChange={this.handleLittleJugChange}></input></div>
                </div>

                <div className="formGroup">
                    <label name="goal">Goal</label>
                    <div><input type="text" id="goal" name="goal" size="5" value={this.state.goal} onChange={this.handleGoalChange}></input></div>
                </div>

                <div className="formGroup">
                    <button type="button" className="querybutton" onClick={this.handleClick}>
                        Find Path
                    </button>
                </div>
            </form>

            <br clear="both"/>

            <Warning warning={this.state.warning} />

            <div className="path">
                {this.renderPath()}
            </div>
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));