import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    var subface=new Array();
    for(let i=1;i<=6;i++){
      //6个面，1前2后3右4左5上6下
      subface[i]=new Array();
      for(let j=1;j<=9;j++){
        //每面9个小块，1左上2上3右上4左5中6右7左下8下9右下
        subface[i][j]=new Array();
        for(let k=1;k<=2;k++)
        //k=1设置背景颜色，k=2设置位置
          subface[i][j][k]="";
      }
    }

    //初始化大面颜色和位置
	for(let j=1;j<=9;j++){
		subface[1][j][1]='red';
		subface[1][j][2]+="rotateY(0deg)";
	}
	for(let j=1;j<=9;j++){
		subface[2][j][1]="orange";
		subface[2][j][2]+="rotateY(180deg)";
	}
	for(let j=1;j<=9;j++){
		subface[3][j][1]="green";
		subface[3][j][2]+="rotateY(90deg)";
	}
	for(let j=1;j<=9;j++){
		subface[4][j][1]="blue";
		subface[4][j][2]+="rotateY(-90deg)";
	}
	for(let j=1;j<=9;j++){
		subface[5][j][1]="yellow";
		subface[5][j][2]+="rotateX(90deg)";
	}
	for(let j=1;j<=9;j++){
		subface[6][j][1]="white";
		subface[6][j][2]+="rotateX(-90deg)";
	}
	
	//初始化子面位置
	for(let i=1;i<=6;i++){
		subface[i][1][2]+="  translateX(-100px) translateY(-100px) ";
		subface[i][2][2]+="  translateY(-100px)";
		subface[i][3][2]+="  translateX(100px) translateY(-100px)";
		subface[i][4][2]+="  translateX(-100px)";
		subface[i][5][2]+=" ";
		subface[i][6][2]+="  translateX(100px)";
		subface[i][7][2]+="  translateX(-100px) translateY(100px)";
		subface[i][8][2]+="  translateY(100px)";
		subface[i][9][2]+="  translateX(100px) translateY(100px)";
	}
  
    this.state = {
      subface,
      faceRetate: [
        {},
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
        { rotateX: 0, rotateY: 0, translateX: 0, translateY: 0, translateZ: 0 },
      ]
    }
  }

  retateFront = () => {
    const { subface, faceRetate } = this.state
    for(let j=1;j<=3;j++){
      let tmp = subface[1][j][2]
      subface[1][j][2] = subface[3][j][2]
      subface[3][j][2] = subface[2][j][2]
      subface[2][j][2] = subface[4][j][2]
      subface[4][j][2] = tmp
      // tmp = subface[1][j][1]
      // subface[1][j][1]=subface[3][j][1];
      // subface[3][j][1]=subface[2][j][1];
      // subface[2][j][1]=subface[4][j][1];
      // subface[4][j][1]=tmp;
    }
    faceRetate[5].rotateY += 90

    this.setState({
      subface,
      faceRetate
    })
  }

  retateLeft = () => {
    const { subface, faceRetate } = this.state
    // for (let j=1;j<=3;j++){
    //   let tmp = subface[1][j][2]
    //   subface[1][j][2] = subface[3][j][2]
    //   subface[3][j][2] = subface[2][j][2]
    //   subface[2][j][2] = subface[4][j][2]
    //   subface[4][j][2] = tmp
    //   // tmp = subface[1][j][1]
    //   // subface[1][j][1]=subface[3][j][1];
    //   // subface[3][j][1]=subface[2][j][1];
    //   // subface[2][j][1]=subface[4][j][1];
    //   // subface[4][j][1]=tmp;
    // }

    faceRetate[4].rotateX += 90 
    faceRetate[4].translateY = -50 
    faceRetate[4].translateZ = -50 
    this.setState({
      subface,
      faceRetate
    })
  }

  renderFaces() {
    const { subface, faceRetate } = this.state
    console.log(subface)
    return (
      <div className="cube">
      {subface.map((face, i) => 
        <div id={i} key={i} className="face" style={{ transform: `rotateX(${faceRetate[i].rotateX}deg) rotateY(${faceRetate[i].rotateY}deg) translateX(${faceRetate[i].translateX}px) translateY(${faceRetate[i].translateY}px) translateZ(${faceRetate[i].translateZ}px)` }}>
          {face.map((cell, j) => 
            <li
              key={`${i}:${j}`}
              style={{ backgroundColor: cell[1], transform: `${cell[2]} translateZ(150px)` }} >
            </li>
          )}
        </div>
      )}
      </div>
    )
  }
  
  render() {
    return (
      <div className="container">
        <ul className="box">
          {this.renderFaces()}
        </ul>
        <button onClick={this.retateFront}>Front</button><button onClick={this.retateFront}>F</button> <button onClick={this.retateFront}>F</button>
        <button onClick={this.retateLeft}>Left</button>
      </div>
    );
  }
}

export default App;
