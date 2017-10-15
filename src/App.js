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
  ' translateX(-100px) translateY(-100px) translateZ(150px)',
  ' translateY(-100px) translateZ(150px)',
  ' translateX(100px) translateY(-100px) translateZ(150px)',
  ' translateX(-100px) translateZ(150px) ',
  ' translateZ(150px) ',
  ' translateX(100px) translateZ(150px)',
  ' translateX(-100px) translateY(100px) translateZ(150px)',
  ' translateY(100px) translateZ(150px)',
  ' translateX(100px) translateY(100px) translateZ(150px)'
]

class App extends Component {
  constructor(props) {
    super(props)
    
    // 初始化54 stickers (6 X 9)
    const stickers = []
    for (let i = 0; i < 6; i++) {
      stickers[i] = []
      for (let j = 0; j < 9; j++) {
        // 每面9个小块，1左上2上3右上4左5中6右7左下8下9右下
        stickers[i][j] = {}
        stickers[i][j].visible = true
        stickers[i][j].color = colors[i]
        stickers[i][j].rotation = rotations[i] 
        stickers[i][j].translation = translations[j]
      }
    }
  
    this.state = {
      // cube整体旋转
      cubeRotation: {
        x: 320,
        y: 30,
        z: 0
      },
      stickers,
      faceRotations: [
        { x: 0, y: 0, z: 0 }, 
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ],
      faceTransition: true, // 是否执行过渡动画
      stickerIdVisible: false // face
    }
  }

  // face id = 0
  retateFront = (clockwise) => {
    const { stickers, faceRotations } = this.state
    
      stickers[0][9] = Object.assign({}, stickers[2][0])
      stickers[2][0].visible = false
      
      stickers[0][10] = Object.assign({}, stickers[2][3])
      stickers[2][3].visible = false
  
      stickers[0][11] = Object.assign({}, stickers[2][6])
      stickers[2][6].visible = false
  
      stickers[0][12] = Object.assign({}, stickers[3][2])
      stickers[3][2].visible = false
  
      stickers[0][13] = Object.assign({}, stickers[3][5])
      stickers[3][5].visible = false
  
      stickers[0][14] = Object.assign({}, stickers[3][8])
      stickers[3][8].visible = false
  
      stickers[0][15] = Object.assign({}, stickers[4][6])
      stickers[4][6].visible = false
  
      stickers[0][16] = Object.assign({}, stickers[4][7])
      stickers[4][7].visible = false
  
      stickers[0][17] = Object.assign({}, stickers[4][8])
      stickers[4][8].visible = false
  
      stickers[0][18] = Object.assign({}, stickers[5][0])
      stickers[5][0].visible = false
  
      stickers[0][19] = Object.assign({}, stickers[5][1])
      stickers[5][1].visible = false
  
      stickers[0][20] = Object.assign({}, stickers[5][2])
      stickers[5][2].visible = false

    setTimeout(() => {
      for (let i = 0; i < 12; i++) {
        stickers[0][i + 9] && (stickers[0][i + 9].visible = false)
      }
      const tmpColor0 = stickers[2][0].color
      const tmpColor1 = stickers[2][3].color
      const tmpColor2 = stickers[2][6].color

      this.changeCell(stickers[2][0], stickers[4][6])
      this.changeCell(stickers[2][3], stickers[4][7])
      this.changeCell(stickers[2][6], stickers[4][8])

      this.changeCell(stickers[4][6], stickers[3][8])
      this.changeCell(stickers[4][7], stickers[3][5])
      this.changeCell(stickers[4][8], stickers[3][2])

      this.changeCell(stickers[3][2], stickers[5][0])
      this.changeCell(stickers[3][5], stickers[5][1])
      this.changeCell(stickers[3][8], stickers[5][2])

      this.changeCell(stickers[5][0], { color: tmpColor2 })
      this.changeCell(stickers[5][1], { color: tmpColor1 })
      this.changeCell(stickers[5][2], { color: tmpColor0 })

      faceRotations[0].z = 0
      this.adjustStickerColor(0, clockwise)
      this.setState({ stickers, faceRotations, faceTransition: false })
    }, 500)

    if (clockwise) {
      faceRotations[0].z += 90
    } else {
      faceRotations[0].z -= 90
    }
    this.setState({ faceRotations, stickers, faceTransition: true })
  }

  // 旋转一次后，调整一面的相对位置
  adjustStickerColor = (faceId, clockwise = true) => {
    const { stickers } = this.state
    const cells = stickers[faceId]
    if (clockwise) {
      let tmp = cells[0].color
      cells[0].color = cells[6].color
      cells[6].color = cells[8].color
      cells[8].color = cells[2].color
      cells[2].color = tmp
      tmp = cells[1].color
      cells[1].color = cells[3].color
      cells[3].color = cells[7].color
      cells[7].color = cells[5].color
      cells[5].color = tmp
    } else {
      let tmp = cells[0].color
      cells[0].color = cells[2].color
      cells[2].color = cells[8].color
      cells[8].color = cells[6].color
      cells[6].color = tmp
      tmp = cells[1].color
      cells[1].color = cells[5].color
      cells[5].color = cells[7].color
      cells[7].color = cells[3].color
      cells[3].color = tmp
    }
    // this.setState({ stickers })
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
    const { stickers, faceRotations, stickerIdVisible, faceTransition, cubeRotation } = this.state

    console.log(faceRotations)
    return (
      <div className="cube" style={{ transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg) rotateZ(${cubeRotation.z}deg)` }}>
      {stickers.map((face, i) => 
        <div id={i} key={i} className="face" style={{ transition: faceTransition ? '0.5s ease all' : '', transform: `rotateX(${faceRotations[i].x}deg) rotateY(${faceRotations[i].y}deg)  rotateZ(${faceRotations[i].z}deg)` }}>
          {face.map((ceil, j) => 
            <li
              id={`${i}:${j}`}
              key={`${i}:${j}`}
              style={{ display: ceil.visible ? 'block': 'none', backgroundColor: ceil.color, transform: `rotateX(${ceil.rotation.x}deg) rotateY(${ceil.rotation.y}deg) rotateZ(${ceil.rotation.z}deg)` + ceil.translation }} 
            >
              {stickerIdVisible ? `${i}:${j}` : ''}
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
        <div className="controller">
        <button onClick={() => this.rotateCube('x', true)}>cubeRotateX +</button>
        <button onClick={() => this.rotateCube('x', false)}>cubeRotateX -</button>
        <button onClick={() => this.rotateCube('y', true)}>cubeRotateY +</button>
        <button onClick={() => this.rotateCube('y', false)}>cubeRotateY -</button>
        <button onClick={() => this.rotateCube('z', true)}>cubeRotateZ +</button>
        <button onClick={() => this.rotateCube('z', false)}>cubeRotateZ -</button>
        <button onClick={() => this.showFaceId()}>showFaceId</button> 
        <br/>
        <button onClick={() => this.retateFront(true)}>Front</button>
        <button onClick={() => this.retateFront(false)}>Front'</button>
        <button onClick={this.retateLeft}>Left</button>
        <button onClick={this.retateTop}>Top</button>
        </div>
      </div>
    )
  }

  // 旋转cube整体
  rotateCube = (dim, clockwise) => {
    const { cubeRotation } = this.state
    if (clockwise) {
      cubeRotation[dim] += 10
    } else {
      cubeRotation[dim] -= 10
    }    
    this.setState({
      cubeRotation
    })
  }

  // 显示sticker编号
  showFaceId = () => {
    const { stickerIdVisible } = this.state
    this.setState({
      stickerIdVisible: !stickerIdVisible
    })
  }
}

export default App;
