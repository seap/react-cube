import React, { Component } from 'react';
import './App.css';

// 6面颜色, 0前 1右 2后 3左 4上 5下
const colors = ['red', 'green', 'orange', 'blue', 'yellow', 'white']
// 6面旋转
const rotations = [
  { x: 0, y: 0, z: 0 },  // front
  { x: 0, y: 90, z: 0 }, // right
  { x: 0, y: 180, z: 0 }, // behind
  { x: 0, y: -90, z: 0 }, // left
  { x: 90, y: 0, z: 0 },  // up
  { x: -90, y: 0, z: 0 }  // down
]
// 6面的旋转轴
const rotationDims = [
  'z', 'x', 'z', 'x', 'y', 'y'
]
// 9个sticker的偏移量
const translations = [
  { x: -100, y: -100, z: 150 },
  { x:    0, y: -100, z: 150 },
  { x:  100, y: -100, z: 150 },
  { x: -100, y:    0, z: 150 },
  { x:    0, y:    0, z: 150 },
  { x:  100, y:    0, z: 150 },
  { x: -100, y:  100, z: 150 },
  { x:    0, y:  100, z: 150 },
  { x:  100, y:  100, z: 150 }
]
// 每面相关的，4个面, 12个stickers
const linkedStickers = [
  // 0，红
  [
    { face: 4, sticker: 6 },
    { face: 4, sticker: 7 },
    { face: 4, sticker: 8 },
    { face: 1, sticker: 0 },
    { face: 1, sticker: 3 },
    { face: 1, sticker: 6 },
    { face: 5, sticker: 2 },
    { face: 5, sticker: 1 },
    { face: 5, sticker: 0 },
    { face: 3, sticker: 8 },
    { face: 3, sticker: 5 },
    { face: 3, sticker: 2 }
  ],
  // 1，绿
  [
    { face: 4, sticker: 8 },
    { face: 4, sticker: 5 },
    { face: 4, sticker: 2 },
    { face: 2, sticker: 0 },
    { face: 2, sticker: 3 },
    { face: 2, sticker: 6 },
    { face: 5, sticker: 8 },
    { face: 5, sticker: 5 },
    { face: 5, sticker: 2 },
    { face: 0, sticker: 8 },
    { face: 0, sticker: 5 },
    { face: 0, sticker: 2 }
  ],
  // 2，橙
  [
    { face: 4, sticker: 2 },
    { face: 4, sticker: 1 },
    { face: 4, sticker: 0 },
    { face: 3, sticker: 0 },
    { face: 3, sticker: 3 },
    { face: 3, sticker: 6 },
    { face: 5, sticker: 6 },
    { face: 5, sticker: 7 },
    { face: 5, sticker: 8 },
    { face: 1, sticker: 8 },
    { face: 1, sticker: 5 },
    { face: 1, sticker: 2 }
  ],
  // 3，蓝
  [
    { face: 4, sticker: 0 },
    { face: 4, sticker: 3 },
    { face: 4, sticker: 6 },
    { face: 0, sticker: 0 },
    { face: 0, sticker: 3 },
    { face: 0, sticker: 6 },
    { face: 5, sticker: 0 },
    { face: 5, sticker: 3 },
    { face: 5, sticker: 6 },
    { face: 2, sticker: 8 },
    { face: 2, sticker: 5 },
    { face: 2, sticker: 2 }
  ],
  // 4, 黄
  [
    { face: 2, sticker: 2 },
    { face: 2, sticker: 1 },
    { face: 2, sticker: 0 },
    { face: 1, sticker: 2 },
    { face: 1, sticker: 1 },
    { face: 1, sticker: 0 },
    { face: 0, sticker: 2 },
    { face: 0, sticker: 1 },
    { face: 0, sticker: 0 },
    { face: 3, sticker: 2 },
    { face: 3, sticker: 1 },
    { face: 3, sticker: 0 }
  ],
  // 5, 白
  [
    { face: 0, sticker: 6 },
    { face: 0, sticker: 7 },
    { face: 0, sticker: 8 },
    { face: 1, sticker: 6 },
    { face: 1, sticker: 7 },
    { face: 1, sticker: 8 },
    { face: 2, sticker: 6 },
    { face: 2, sticker: 7 },
    { face: 2, sticker: 8 },
    { face: 3, sticker: 6 },
    { face: 3, sticker: 7 },
    { face: 3, sticker: 8 }
  ]
]

class App extends Component {
  constructor(props) {
    super(props)
    // initial 6 faces, 54 stickers (6 X 9)
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

    this.rotating = false
  
    this.state = {
      // cube整体旋转
      cubeRotation: {
        x: 320,
        y: 30,
        z: 0
      },
      faces,
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
  retateFace = (faceId, clockwise) => {
    if (this.rotating) {
      return
    }
    this.rotating = true

    const { faces, faceRotations } = this.state
    // 更新12个关联面
    for (let i = 0; i < 12; i++) {
      const relation = linkedStickers[faceId][i]
      const relatedSticker = faces[relation.face][relation.sticker]
      faces[faceId][i + 9] = Object.assign({}, relatedSticker)
      faces[faceId][i + 9].visible = true
      relatedSticker.visible = false
    }

    setTimeout(() => {
      // 隐藏相关的12个sticker
      for (let i = 0; i < 12; i++) {
        faces[faceId][i + 9] && (faces[faceId][i + 9].visible = false)
      }
      // 归位
      faceRotations[faceId][rotationDims[faceId]] = 0
      this.adjustOuterStickerColor(faceId, clockwise)
      this.adjustInnerStickerColor(faceId, clockwise)
      // 调整sticker, 无过度动画
      this.setState({ faces, faceRotations, faceTransition: false }, () => {
        this.rotating = false
      })
    }, 500)
    
    let value = 90
    // 三个面，需要反向处理
    if ([2, 3, 4].includes(faceId)) {
      value = -90
    }

    if (clockwise) {
      faceRotations[faceId][rotationDims[faceId]] += value
    } else {
      faceRotations[faceId][rotationDims[faceId]] -= value
    }
    this.setState({ faceRotations, faces, faceTransition: true })
  }

  // 旋转一次后，调整一面的相对位置
  adjustInnerStickerColor = (faceId, clockwise = true) => {
    const { faces } = this.state
    const cells = faces[faceId]
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
    // this.setState({ faces })
  }

  // 旋转一次后，调整相关4 face, 12 stickers 的相对位置
  adjustOuterStickerColor = (faceId, clockwise = true) => {
    const { faces } = this.state
    const relations = linkedStickers[faceId] 
    // 0 1 2 3 4 5 6 7 8 9 10 11
    if (clockwise) {
      for (let i = 0; i < 3; i++) {
        const tmp = faces[relations[i].face][relations[i].sticker].color
        faces[relations[i].face][relations[i].sticker].color = faces[relations[i + 9].face][relations[i + 9].sticker].color
        faces[relations[i].face][relations[i].sticker].visible = true
        faces[relations[i + 9].face][relations[i + 9].sticker].color = faces[relations[i + 6].face][relations[i + 6].sticker].color
        faces[relations[i + 9].face][relations[i + 9].sticker].visible = true
        faces[relations[i + 6].face][relations[i + 6].sticker].color = faces[relations[i + 3].face][relations[i + 3].sticker].color
        faces[relations[i + 6].face][relations[i + 6].sticker].visible = true
        faces[relations[i + 3].face][relations[i + 3].sticker].color = tmp
        faces[relations[i + 3].face][relations[i + 3].sticker].visible = true
      }
    } else {
      for (let i = 0; i < 3; i++) {
        const tmp = faces[relations[i].face][relations[i].sticker].color
        faces[relations[i].face][relations[i].sticker].color = faces[relations[i + 3].face][relations[i + 3].sticker].color
        faces[relations[i].face][relations[i].sticker].visible = true
        faces[relations[i + 3].face][relations[i + 3].sticker].color = faces[relations[i + 6].face][relations[i + 6].sticker].color
        faces[relations[i + 3].face][relations[i + 3].sticker].visible = true
        faces[relations[i + 6].face][relations[i + 6].sticker].color = faces[relations[i + 9].face][relations[i + 9].sticker].color
        faces[relations[i + 6].face][relations[i + 6].sticker].visible = true
        faces[relations[i + 9].face][relations[i + 9].sticker].color = tmp
        faces[relations[i + 9].face][relations[i + 9].sticker].visible = true
      }
    }
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
    const { faces, faceRotations, stickerIdVisible, faceTransition, cubeRotation } = this.state

    return (
      <div className="cube" style={{ transform: `rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg) rotateZ(${cubeRotation.z}deg)` }}>
      {faces.map((face, i) => 
        <div id={i} key={i} className="face" style={{ transition: faceTransition ? '0.5s ease all' : '', transform: `rotateX(${faceRotations[i].x}deg) rotateY(${faceRotations[i].y}deg)  rotateZ(${faceRotations[i].z}deg)` }}>
          {face.map((sticker, j) => (
            <li
              id={`${i}:${j}`}
              key={`${i}:${j}`}
              style={{ display: sticker.visible ? 'block': 'none', backgroundColor: sticker.color, transform: `rotateX(${sticker.rotation.x}deg) rotateY(${sticker.rotation.y}deg) rotateZ(${sticker.rotation.z}deg) translateX(${sticker.translation.x}px) translateY(${sticker.translation.y}px) translateZ(${sticker.translation.z}px)` }} 
            >
              {stickerIdVisible ? `${i}:${j}` : ''}
            </li>
          ))}
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
          <button onClick={() => this.showStickerId()}>showStickerId</button> 
          <br/>
          <button onClick={() => this.retateFace(0, true)}>Front</button>
          <button onClick={() => this.retateFace(0, false)}>Front'</button>
          <button onClick={() => this.retateFace(1, true)}>Right</button>
          <button onClick={() => this.retateFace(1, false)}>Right'</button>
          <button onClick={() => this.retateFace(2, true)}>Behind</button>
          <button onClick={() => this.retateFace(2, false)}>Behind'</button>
          <button onClick={() => this.retateFace(3, true)}>Left</button>
          <button onClick={() => this.retateFace(3, false)}>Left'</button>
          <button onClick={() => this.retateFace(4, true)}>Up</button>
          <button onClick={() => this.retateFace(4, false)}>Up'</button>
          <button onClick={() => this.retateFace(5, true)}>Down</button>
          <button onClick={() => this.retateFace(5, false)}>Down'</button>
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
  showStickerId = () => {
    const { stickerIdVisible } = this.state
    this.setState({
      stickerIdVisible: !stickerIdVisible
    })
  }
}

export default App;
