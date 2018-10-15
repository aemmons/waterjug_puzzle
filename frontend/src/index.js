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

class Board extends React.Component {
    render(){
        return (
            <div className="board">
            <Form />
            </div>
        )
    }
}

function Jug(props){
    var classSize = props.bigSize ? "big" : "little",
        classes = `jug ${classSize}`;

    var fillPerc = props.jugSize > 0 ? Math.ceil( (props.fill / props.jugSize) * 100) : 0;
    var style = {
        height: fillPerc + "%",
        transition: "height 250ms ease"
    }

    return (
        <div className={classes}>
            <div className="waterContainer">
                <div className="water" style={style}>
                </div>
                <div className="waterAmount">{props.fill}</div>
            </div>
        </div>
    )
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
        <div className="step"><span>{props.stepText}</span><br /><span className="stepValue">[ {props.step[0]}, {props.step[1]} ]</span></div>
    )
}

function StepArrow(props) {
    return (
        <div className="stepArrow"><span>></span></div>
    )
}

function Path(props) {
    if(props.path.length > 0) {
        var idx = 0;
        return (
            <div className="path">
                <h3>PATH</h3>
                {props.path
                    .map( (step, i) => {
                        idx = `stepArrow${i}`;
                        return (
                            <Step
                                stepText = {step.text}
                                step = {step.step}
                                key = {i}
                            />
                        )
                    })
                    .reduce( (prev, curr) => [ prev, <StepArrow key={idx} />, curr])}
            </div>
        )
    }
    return null;
}

class PlayBtn extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            playing: false,
            currentStep: null
        };
    }

    handleClick() {
        this.setState({playing: true})
        this.props.handleClick( (step) => this.setState({currentStep: step}) )
        .then( () => this.setState({playing: false, currentStep: null}) )
    }

    handleUpdate() {
        this.setState({hasPath: true})
    }

    render() {
        var style = this.props.hasPath ? {}: {display: "none"};
        return (
            <button disabled={this.state.playing} style={style} onClick={() => this.handleClick()}>Play {this.state.currentStep}</button>
        )
    }
}

class Form extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            jugM: 0,
            jugN: 0,
            goal: 0,
            path: [],
            warning: false,
            currentStep: 0
        }
    }

  handleClick() {
      return fetch(url + "/" + this.state.jugM + "/" + this.state.jugN + "/" + this.state.goal + "/",
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

  handleJugMChange(e) {
      this.setState({ jugM: e.target.value});
  }

  handleJugNChange(e) {
      this.setState({ jugN: e.target.value});
  }

  handleGoalChange(e) {
      this.setState({ goal: e.target.value});
  }

  handlePlayBtnClick( callback ) {
        return new Promise( (resolve, reject) => {
            var j = this.state.path.length - 1,
                inter = null;
            inter = setInterval( () => {
                if(j > 0){
                    this.setState({currentStep: this.state.currentStep+1})
                    callback(this.state.currentStep)
                    j--;
                }else{
                    clearInterval(inter)
                    this.setState({currentStep: 0})
                    callback(0)
                    resolve();
                }
            }, 1000)
        })
  }

  render() {
    var mBig = this.state.jugM >= this.state.jugN;
    var nBig = this.state.jugN >= this.state.jugM;

    var currStep = this.state.path[this.state.currentStep] ? this.state.path[this.state.currentStep] : {step: [0,0], text: "Start"};
    var mFill = currStep.step[0];
    var nFill = currStep.step[1];

    return (
        <div className="form">
            <div className="jugs">
                <div className="jugsCenter">
                    <Jug jugSize={this.state.jugM} bigSize={mBig} fill={mFill} />
                    <Jug jugSize={this.state.jugN} bigSize={nBig} fill={nFill} />
                </div>
                <div className="jugText">
                    <span>{this.state.path.length > 0 ? currStep.text : null}</span>
                </div>
            </div>
            <form>
                <div className="formGroup">
                    <label name="jugM">Jug M</label>
                    <div><input type="text" id="jugM" name="jugM" size="5" value={this.state.jugM} onChange={ (e) => this.handleJugMChange(e) }></input></div>
                </div>

                <div className="formGroup">
                    <label name="jugN">Jug N</label>
                    <div><input type="text" id="jugN" name="jugN" size="5" value={this.state.jugN} onChange={ (e) => this.handleJugNChange(e) }></input></div>
                </div>

                <div className="formGroup">
                    <label name="goal">Goal</label>
                    <div><input type="text" id="goal" name="goal" size="5" value={this.state.goal} onChange={ (e) => this.handleGoalChange(e) }></input></div>
                </div>

                <div className="formGroup">
                    <button type="button" className="querybutton" onClick={ () => this.handleClick() }>
                        Find Path
                    </button>
                </div>
            </form>

            <br clear="both"/>

            <Warning warning={this.state.warning} />

            <PlayBtn hasPath={this.state.path.length > 0} handleClick={ (cb) => this.handlePlayBtnClick(cb) } currentStep={this.state.currentStep} />

            <Path path={this.state.path} />
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));