import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// 6面颜色, 0前 1后 2右 3左 4上 5下
const colors = ['red', 'orange', 'green', 'blue', 'yellow', 'white']
// 6面旋转
const rotations = [
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 180, z: 0 },
  { x: 0, y: 90, z: 0 },
  { x: 0, y: -90, z: 0 },
  { x: 90, y: 0, z: 0 },
  { x: -90, y: 0, z: 0 }
]
  // 'rotateY(0deg)', 'rotateY(180deg)', 'rotateY(90deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)']
// 9个子面的偏移量
const translations = [
  ' translateZ(150px) translateX(-100px) translateY(-100px)',
  ' translateZ(150px) translateY(-100px)',
  ' translateZ(150px) translateX(100px) translateY(-100px)',
  ' translateZ(150px) translateX(-100px)',
  ' translateZ(150px) ',
  ' translateZ(150px) translateX(100px)',
  ' translateZ(150px) translateX(-100px) translateY(100px)',
  ' translateZ(150px) translateY(100px)',
  ' translateZ(150px) translateX(100px) translateY(100px)'
]

class App extends Component {
  constructor(props) {
    super(props)
    
    const faces = []
    for (let i = 0; i < 6; i++) {
      faces[i] = []
      for (let j = 0; j < 9; j++) {
        // 每面9个小块，1左上2上3右上4左5中6右7左下8下9右下
        faces[i][j] = {}
        faces[i][j].visible = true
        faces[i][j].color = colors[i]
        faces[i][j].rotation = rotations[i] 
        faces[i][j].translation = translations[j]
      }
    }

    // for (let i = 0; i < 3; i++) {
    //   faces[0][9 + i] = {}
    //   faces[0][9 + i].color = colors[parseInt(i / 3) + 2]
    //   faces[0][9 + i].rotation = rotations[parseInt(i / 3) + 2]
    //   faces[0][9 + i].translation = rotations[(i % 3) + 6]
    // }
  
    this.state = {
      faces,
      faceRotations: [
        { x: 0, y: 0, z: 0 }, 
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ],
      faceTransition: true
    }
  }

  retateFront = (clockwise) => {
    const { faces, faceRotations } = this.state
    
    // if (!faces[0][9]) {
      faces[0][9] = Object.assign({}, faces[2][0])
      faces[2][0].visible = false
      
      faces[0][10] = Object.assign({}, faces[2][3])
      faces[2][3].visible = false
  
      faces[0][11] = Object.assign({}, faces[2][6])
      faces[2][6].visible = false
  
      faces[0][12] = Object.assign({}, faces[3][2])
      faces[3][2].visible = false
  
      faces[0][13] = Object.assign({}, faces[3][5])
      faces[3][5].visible = false
  
      faces[0][14] = Object.assign({}, faces[3][8])
      faces[3][8].visible = false
  
      faces[0][15] = Object.assign({}, faces[4][6])
      faces[4][6].visible = false
  
      faces[0][16] = Object.assign({}, faces[4][7])
      faces[4][7].visible = false
  
      faces[0][17] = Object.assign({}, faces[4][8])
      faces[4][8].visible = false
  
      faces[0][18] = Object.assign({}, faces[5][0])
      faces[5][0].visible = false
  
      faces[0][19] = Object.assign({}, faces[5][1])
      faces[5][1].visible = false
  
      faces[0][20] = Object.assign({}, faces[5][2])
      faces[5][2].visible = false
    // }

    setTimeout(() => {
      for (let i = 0; i < 12; i++) {
        faces[0][i + 9] && (faces[0][i + 9].visible = false)
      }
      const tmpColor0 = faces[2][0].color
      const tmpColor1 = faces[2][3].color
      const tmpColor2 = faces[2][6].color

      this.changeCell(faces[2][0], faces[4][6])
      this.changeCell(faces[2][3], faces[4][7])
      this.changeCell(faces[2][6], faces[4][8])

      this.changeCell(faces[4][6], faces[3][8])
      this.changeCell(faces[4][7], faces[3][5])
      this.changeCell(faces[4][8], faces[3][2])

      this.changeCell(faces[3][2], faces[5][0])
      this.changeCell(faces[3][5], faces[5][1])
      this.changeCell(faces[3][8], faces[5][2])

      this.changeCell(faces[5][0], { color: tmpColor2 })
      this.changeCell(faces[5][1], { color: tmpColor1 })
      this.changeCell(faces[5][2], { color: tmpColor0 })

      faceRotations[0].z = 0
      this.setState({ faces, faceRotations, faceTransition: false })
    }, 500)

    if (clockwise) {
      faceRotations[0].z += 90
    } else {
      faceRotations[0].z -= 90
    }
    this.setState({ faceRotations, faces, faceTransition: true })
  }

  changeCell = (target, source) => {
    target.color = source.color
    target.visible = true
  }

  retateLeft = () => {
    const { faceRotations } = this.state
    faceRotations[3].x += 90
    this.setState({ faceRotations })
  }

  retateTop = () => {
    const { faceRotations } = this.state
    faceRotations[4].y += 90
    this.setState({ faceRotations })
  }

  renderFaces() {
    const { faces, faceRotations, faceTransition } = this.state

    console.log(faceRotations)
    return (
      <div className="cube">
      {faces.map((face, i) => 
        <div id={i} key={i} className="face" style={{ transition: faceTransition ? '0.5s ease all' : '', transform: `rotateX(${faceRotations[i].x}deg) rotateY(${faceRotations[i].y}deg)  rotateZ(${faceRotations[i].z}deg)` }}>
          {face.map((ceil, j) => 
            <li
              id={`${i}:${j}`}
              key={`${i}:${j}`}
              style={{ display: ceil.visible ? 'block': 'none', backgroundColor: ceil.color, transform: `rotateX(${ceil.rotation.x}deg) rotateY(${ceil.rotation.y}deg) rotateZ(${ceil.rotation.z}deg)` + ceil.translation }} >
              
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
        <button onClick={() => this.retateFront(true)}>Front</button>
        <button onClick={() => this.retateFront(false)}>Front'</button>
        <button onClick={this.retateLeft}>Left</button>
        <button onClick={this.retateTop}>Top</button>
      </div>
    );
  }
}

export default App;
