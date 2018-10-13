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

function Step(props) {
    return (
        <div className="step" key="step{props.stepNum}"><span>{props.stepText}</span><br /><span className="stepValue">[ {props.step[0]}, {props.step[1]} ]</span></div>
    )
}

function Path(props) {
    if(props.path.length > 0) {
        return (
            <div className="path">
                {props.path
                    .map( (step, i) => {
                        return (
                            <Step
                                stepText = {step.text}
                                step = {step.step}
                            />
                        )
                    })
                    .reduce( (prev, curr) => [ prev, <div className="stepArrow"><span>></span></div>, curr])}
            </div>
        )
    }
    return null;
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
            this.setState({warning: false, path: data.payload.path});
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

            <Path path={this.state.path} />
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));