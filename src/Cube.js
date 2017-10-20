import React, { Component } from 'react'
import { Button } from 'antd'

import './Cube.css'
// 6面颜色, 0前 1右 2后 3左 4上 5下
// const colors = ['red', 'green', 'orange', 'blue', 'yellow', 'white']
// 6 faces, 
// 0 down(white)  
// 1 front(red) 
// 2 behind(orange)  
// 3 right(green)  
// 4 left(blue)
// 5 up(yellow)
const colors = ['white', 'red', 'orange', 'green', 'blue', 'yellow']

// 6面旋转
const rotations = [
  { x: -90, y:   0, z: 0 },  // down
  { x:   0, y:   0, z: 0 },  // front
  { x:   0, y: 180, z: 0 }, // behind
  { x:   0, y:  90, z: 0 }, // right
  { x:   0, y: -90, z: 0 }, // left
  { x:  90, y:   0, z: 0 }  // up
]

// 6面的旋转轴
const rotationDims = [
  'y', 'z', 'z', 'x', 'x', 'y'
]
const rotationValues = [
  90, 90, -90, 90, -90, -90
]

// 9个sticker的偏移系数，相对sticker大小
const translations = [
  { x: -1, y: -1, z: 1.5 },
  { x:  0, y: -1, z: 1.5 },
  { x:  1, y: -1, z: 1.5 },
  { x: -1, y:  0, z: 1.5 },
  { x:  0, y:  0, z: 1.5 },
  { x:  1, y:  0, z: 1.5 },
  { x: -1, y:  1, z: 1.5 },
  { x:  0, y:  1, z: 1.5 },
  { x:  1, y:  1, z: 1.5 }
]

// 每面相关的，4个面, 每个面 6个stickers
const linkedStickers = [
  // 0
  [
    { face: 1, stickers: [ 6, 7, 8, 3, 4, 5 ] },
    { face: 3, stickers: [ 6, 7, 8, 3, 4, 5 ] },
    { face: 2, stickers: [ 6, 7, 8, 3, 4, 5 ] },
    { face: 4, stickers: [ 6, 7, 8, 3, 4, 5 ] }
  ],
  // 1
  [
    { face: 5, stickers: [ 6, 7, 8, 3, 4, 5 ] },
    { face: 3, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 0, stickers: [ 2, 1, 0, 5, 4, 3 ] },
    { face: 4, stickers: [ 8, 5, 2, 7, 4, 1 ] }
  ],
  // 2
  [
    { face: 5, stickers: [ 2, 1, 0, 5, 4, 3 ] },
    { face: 4, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 0, stickers: [ 6, 7, 8, 3, 4, 5 ] },
    { face: 3, stickers: [ 8, 5, 2, 7, 4, 1 ] }
  ],
  // 3
  [
    { face: 5, stickers: [ 8, 5, 2, 7, 4, 1 ] },
    { face: 2, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 0, stickers: [ 8, 5, 2, 7, 4, 1 ] },
    { face: 1, stickers: [ 8, 5, 2, 7, 4, 1 ] }
  ],
  // 4
  [
    { face: 5, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 1, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 0, stickers: [ 0, 3, 6, 1, 4, 7 ] },
    { face: 2, stickers: [ 8, 5, 2, 7, 4, 1 ] }
  ],
  // 5
  [
    { face: 2, stickers: [ 2, 1, 0, 5, 4, 3 ] },
    { face: 3, stickers: [ 2, 1, 0, 5, 4, 3 ] },
    { face: 1, stickers: [ 2, 1, 0, 5, 4, 3 ] },
    { face: 4, stickers: [ 2, 1, 0, 5, 4, 3 ] }
  ]
]

// 按钮配置
const retoationButtons = [
  ["D", "D'", "d", "d'"],
  ["F", "F'", "f", "f'"],
  ["B", "B'", "b", "b'"],
  ["R", "R'", "r", "r'"],
  ["l", "l'", "l", "l'"],
  ["U", "U'", "u", "u'"]
]

class Cube extends Component {
  constructor(props) {
    super(props)
    // initial 6 faces, 54 stickers (6 X 9)
    const size = 60
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

    this.state = {
      // cube整体旋转
      cubeRotation: {
        x: 330,
        y: 30,
        z: 0
      },
      // cube旋转
      cubeRotating: false,
      // 单页面旋转
      faceRotating: false,
      faceTransition: true, // 是否执行过渡动画
      faceRotations: [
        { x: 0, y: 0, z: 0 }, 
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ],
      faces,
      size,
      stickerIdVisible: false,
      mirrorVisible: false
    }
  }

  getTransformStyle = obj => {
    const { size } = this.state
    const defaultStatus = { x: 0, y: 0, z: 0 }
    const { rotation = defaultStatus, translation = defaultStatus }= obj
    return `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg) translateX(${translation.x * size}px) translateY(${translation.y * size}px) translateZ(${translation.z * size}px)`
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

  // 自动旋转
  autoRotate = () => {
    const { cubeRotating } = this.state
    this.setState({
      cubeRotating: !cubeRotating
    })
  }

  // 随机打乱cube
  disrupt = () => {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      return 
    }
    this.timer = setInterval(() => {
      const faceId = Math.floor(Math.random() * 6)
      const clockwise = Math.random() > 0.5
      const double = Math.random() > 0.8
      this.retateFace(faceId, clockwise, double)
    }, 550)
  }

  // face id = 0
  retateFace = (faceId, clockwise, double = false) => {
    if (this.rotating) {
      return
    }
    this.rotating = true

    const { faces, faceRotations } = this.state
    // 更新12个关联面
    const relations = linkedStickers[faceId]
    const number = double ? 6 : 3
    relations.forEach((relation, i) => {
      const { face, stickers } = relation
      for (let j = 0; j < number; j++) {
        const relatedSticker = faces[face][stickers[j]]
        faces[faceId][9 + (number * i ) + j] =  Object.assign({}, relatedSticker)
        faces[faceId][9 + (number * i ) + j].visible = true
        relatedSticker.visible = false
      }
    })

    setTimeout(() => {
      // 隐藏相关的12个sticker
      for (let i = 0; i < 24; i++) {
        faces[faceId][i + 9] && (faces[faceId][i + 9].visible = false)
      }
      // 归位
      faceRotations[faceId][rotationDims[faceId]] = 0
      this.adjustOuterStickerColor(faceId, clockwise, double)
      this.adjustInnerStickerColor(faceId, clockwise)
      // 调整sticker, 无过度动画
      this.setState({ faces, faceRotations, faceTransition: false }, () => {
        this.rotating = false
      })
    }, 500)
    
    if (clockwise) {
      faceRotations[faceId][rotationDims[faceId]] += rotationValues[faceId]
    } else {
      faceRotations[faceId][rotationDims[faceId]] -= rotationValues[faceId]
    }
    this.setState({ faceRotations, faces, faceTransition: true })
  }

  // 旋转一次后，调整一面的相对位置
  adjustInnerStickerColor = (faceId, clockwise = true) => {
    const { faces } = this.state
    const stickers = faces[faceId]
    if (clockwise) {
      let tmp = stickers[0].color
      stickers[0].color = stickers[6].color
      stickers[6].color = stickers[8].color
      stickers[8].color = stickers[2].color
      stickers[2].color = tmp
      tmp = stickers[1].color
      stickers[1].color = stickers[3].color
      stickers[3].color = stickers[7].color
      stickers[7].color = stickers[5].color
      stickers[5].color = tmp
    } else {
      let tmp = stickers[0].color
      stickers[0].color = stickers[2].color
      stickers[2].color = stickers[8].color
      stickers[8].color = stickers[6].color
      stickers[6].color = tmp
      tmp = stickers[1].color
      stickers[1].color = stickers[5].color
      stickers[5].color = stickers[7].color
      stickers[7].color = stickers[3].color
      stickers[3].color = tmp
    }
  }

  // 旋转一次后，调整相关4 face, 12 stickers 的相对位置
  adjustOuterStickerColor = (faceId, clockwise = true, double = false) => {
    const { faces } = this.state
    const relations = linkedStickers[faceId] 
    // 0 1 2 3 4 5 6 7 8 9 10 11
    const number = double ? 6 : 3
    if (clockwise) {
      const tmpColors = relations[3].stickers.map(sticker => faces[relations[3].face][sticker].color)
      for (let i = 3; i > 0 ; i--) {
        const { face, stickers } = relations[i]
        for (let j = 0; j < number; j++) {
          faces[face][stickers[j]].color = faces[relations[i - 1].face][relations[i - 1].stickers[j]].color
          faces[face][stickers[j]].visible = true
        }
      }
      for (let j = 0; j < number; j++) {
        const { face, stickers } = relations[0]
        faces[face][stickers[j]].color = tmpColors[j]
        faces[face][stickers[j]].visible = true
      }
    } else {
      const tmpColors = relations[0].stickers.map(sticker => faces[relations[0].face][sticker].color)
      for (let i = 0; i < 3; i++) {
        const { face, stickers } = relations[i]
        for (let j = 0; j < number; j++) {
          faces[face][stickers[j]].color = faces[relations[i + 1].face][relations[i + 1].stickers[j]].color
          faces[face][stickers[j]].visible = true
        }
      }
      for (let j = 0; j < number; j++) {
        const { face, stickers } = relations[3]
        faces[face][stickers[j]].color = tmpColors[j]
        faces[face][stickers[j]].visible = true
      }
    }
  }

  renderMirror() {
    const { faces, faceRotations, faceTransition, size, cubeRotation, cubeRotating, stickerIdVisible, mirrorVisible } = this.state
    console.log('renderMirror')
    return (
      <div className={`cube ${cubeRotating ? 'rotating': ''}`} style={{ width: size, height: size,  transform: this.getTransformStyle({ rotation: cubeRotation }) }}>
        {faces.map((face, i) =>
          <div 
            id={i}
            key={i}
            className="face"
            
          >
            {face.filter((e, index) => index < 9).map((sticker, j) => {
              const { rotation, translation } = sticker
              return (
                <div
                  id={`${i}:${j}`}
                  key={`${i}:${j}`}
                  className="sticker mirror"
                  style={{ 
                    height: size, 
                    width: size, 
                    backgroundColor: sticker.color,
                    transform: this.getTransformStyle({
                      rotation,
                      translation: Object.assign({}, translation, { z: 5 })
                    })
                  }}
                >
                  {stickerIdVisible ? `${i}:${j}` : ''}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  renderCube() {
    const { faces, faceRotations, faceTransition, size, cubeRotation, cubeRotating, stickerIdVisible, mirrorVisible } = this.state
    return (
      <div className={`cube ${cubeRotating ? 'rotating': ''}`} style={{ width: size, height: size,  transform: this.getTransformStyle({ rotation: cubeRotation }) }}>
        {faces.map((face, i) =>
          <div 
            id={i}
            key={i}
            className="face"
            style={{
              transition: faceTransition ? '0.5s ease all' : '',
              transform: this.getTransformStyle({ rotation: faceRotations[i] }),
              transformOrigin: `${size/2}px ${size/2}px`
            }}
          >
            {face.map((sticker, j) => 
              <div
                id={`${i}:${j}`}
                key={`${i}:${j}`}
                className="sticker"
                style={{ 
                  height: size, 
                  width: size, 
                  display: sticker.visible ? 'flex': 'none', 
                  backgroundColor: sticker.color,
                  transform: this.getTransformStyle(sticker)
                }}
              >
                {stickerIdVisible ? `${i}:${j}` : ''}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // 显示sticker编号
  showStickerId = () => {
    const { stickerIdVisible } = this.state
    this.setState({
      stickerIdVisible: !stickerIdVisible
    })
  }

  // 显示镜子
  showMirror = () => {
    const { mirrorVisible } = this.state
    this.setState({
      mirrorVisible: !mirrorVisible
    })
  }

  renderController() {
    return (
      <div className="controller">
        <div className="item">
          <Button.Group>
            <Button type="primary" onClick={() => this.rotateCube('x', true)}>X +</Button>
            <Button onClick={() => this.rotateCube('x', false)}>X -</Button>
          </Button.Group>
        </div>
        <div className="item">
          <Button.Group>
            <Button type="primary" onClick={() => this.rotateCube('y', true)}>Y +</Button>
            <Button onClick={() => this.rotateCube('y', false)}>Y -</Button>
          </Button.Group>
        </div>
        <div className="item">
          <Button.Group>
            <Button type="primary" onClick={() => this.rotateCube('z', true)}>Z +</Button>
            <Button onClick={() => this.rotateCube('z', false)}>Z -</Button>
          </Button.Group>
        </div>
        
        <div className="item">
          <Button.Group>
            <Button type="primary" onClick={() => this.disrupt()}>打乱</Button>
            <Button onClick={() => this.showStickerId()}>编号</Button>
            <Button type="primary" onClick={() => this.showMirror()}>镜子</Button>
            <Button onClick={() => this.autoRotate()}>自转</Button>
          </Button.Group>
        </div>
        {retoationButtons.map((buttons, i) => 
          <div key={i} className="item">
            <Button.Group>
              {buttons.map(((button, j) => 
                <Button 
                  key={j}
                  type={j % 2 === 0 ? 'primary' : ''} onClick={() => this.retateFace(i, (j % 2) === 0, j > 1)}>{button}</Button>
              ))}
            </Button.Group>
          </div>
        )}
        <div className="item">
          <Button type="primary" onClick={() => this.disrupt()}>(R U U R' U') (R U R' U') (R U' R')</Button>
        </div>
      </div>
    )
  }

  render() {
    const { mirrorVisible } = this.state
    return (
      <div className="container">
        <div className="box">
          {this.renderCube()}
          {mirrorVisible && this.renderMirror()}
        </div>
        {this.renderController()}
      </div>
    )
  }
}

export default Cube