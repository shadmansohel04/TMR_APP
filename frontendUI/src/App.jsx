import { useEffect, useState } from 'react'
import './App.css'

import wheelImg from "./assets/wheel.png"
import silo from "./assets/silo.png"
import claw from "./assets/claw.png"

function App() {
  const [wheels, setWheels] = useState([128, 128, 128, 128, 128, 128])
  const [shoulder, setShoulder] = useState(128)
  const [gantryUp, setUp] = useState(128)
  const [elbowval, setElbow] = useState(128)
  const [clawval, setClaw] = useState(128)
  const [wl, setwl] = useState(0)
  const [wr, setwr] = useState(0)
  
  const [turning, setTurn] = useState("")
  const [wheelStyle, setStyles] = useState([
    {
      on: false,
      direction: "up"
    }, 
    {
      on: false,
      direction: "up"
    }, 
    {
      on: false,
      direction: "up"
    }, {
      on: false,
      direction: "up"
    }, {
      on: false,
      direction: "up"
    }, {
      on: false,
      direction: "up"
    }
  ])
  
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080");

    console.log("listening")
    socket.addEventListener("message", (event) => {
      const data = event.data
      console.log("Message from server ", event.data);
      if(data[0] == "D"){
        wheelSet(data)
      }
      else if(data[0] == "A"){
        roboset(data)
      }

    });


  }, [])

  function roboset(data){
    data = data.split("_").splice(1)
    data = data.map((each) => parseInt(each))
    console.log(data)

    setUp(data[4])
    setShoulder(data[5])
    setElbow(data[0])
    setClaw(data[3])
    setwl(data[2])
    setwr(data[1])

  }

  function wheelSet(data){
    data = data.split("_").splice(1)
    directionCheck(data)
    setWheels(data)    
  }

  function directionCheck(numbers){
    numbers = numbers.map((each) => parseInt(each))

    let leftVsRight = 0

    numbers.forEach((each, index)=>{
      let num
      console.log(each)
      if(each == 128 || each == 127){
        num = 0
      }
      else if(index % 2 === 0){
        num = each
      }
      else{
        num = -1 * each
      }

      leftVsRight += num

    })

    let dummy = []

    numbers.forEach((each)=>{
      if(each == 127 || each == 128){
        dummy.push({
          on: false,
          direction: "up"
        })
      }

      else if(each < 127){
        console.log("pwopo")
        dummy.push({
          on: true,
          direction: "down"
        })
      }

      else{
        dummy.push({
          on: true,
          direction: "up"
        })
      }

    })

    setStyles(dummy)
    
    if(leftVsRight > 0){
      setTurn("left")
    } 
    else if(leftVsRight < 0){
      setTurn("right")
    }
    else{
      setTurn("")
    }

  }
  
  return (
    <div className="wrapper">
      <h1>TMR</h1>
      <div className='bodyBox'>
        <div className='wheelWrap'>
          <h2>WHEELS</h2>
          <div className='leftSide'>

          <div className='wheel'>
                <h2>Val: {wheels[0]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG' style={turning=="right"?{transform: `rotate(20deg)`}: turning=="left"?{transform: "rotate(-20deg)"}: {}} src={wheelImg} alt="" />
                  {wheelStyle[0].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[0].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

            <div className='wheel'>
                <h2>Val: {wheels[1]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG' style={turning=="right"?{transform: "rotate(20deg)"}: turning=="left"?{transform: "rotate(-20deg)"}: {}} src={wheelImg} alt="" />
                  {wheelStyle[1].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[1].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

            <div className='wheel'>
                <h2>Val: {wheels[2]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG'src={wheelImg} alt="" />
                  {wheelStyle[2].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[2].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

            <div className='wheel'>
                <h2>Val: {wheels[3]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG'src={wheelImg} alt="" />
                  {wheelStyle[3].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[3].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

            <div className='wheel'>
                <h2>Val: {wheels[4]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG'src={wheelImg} alt="" />
                  {wheelStyle[4].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[4].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

            <div className='wheel'>
                <h2>Val: {wheels[5]}</h2>
                <div className='wheelBox'>
                  <img className='wheelIMG'src={wheelImg} alt="" />
                  {wheelStyle[5].on ? (
                  
                  <img 
                    className='arrow' 
                    style={wheelStyle[5].direction === "up" ? {} : { transform: "rotate(180deg)" }} 
                    src="https://cdn.pixabay.com/animation/2022/10/26/02/47/02-47-00-744_512.gif" 
                    alt="" 
                  />

                ) : null}
                </div>
            </div>

          </div>
        </div>

        <div className='centered'>
          <h2>Gantry: {gantryUp}</h2>
          <img className='wholeThing' src={silo} alt="" />
          <div className='ughhh'>
            <h2>Wrist right: {wr}</h2>
            <h2>Wrist left: {wl}</h2>
          </div>
        </div>


        <div className="wheelWrap smaller">
          <h2>ROBOT</h2>
          <div className='robot'>
            <div className='onesection'>
                <h4>Shoulder: {shoulder}</h4>
                <img className='rotating' style={{ transform: "scaleX(-1)" }} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazlieDN6dG12M2xmbmZrYjV5ZmZycjd0eWxhc3N5MmNuMmZibDFhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pkck2unt0XQfc4gs3R/giphy.webp" alt="" />
            </div>

            <div className='onesection'>
                <h4>Claw: {clawval}</h4>
                <img className='claw' src={claw} alt="" />
                <img className='rotating' style={{ transform: "scaleX(-1)" }} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazlieDN6dG12M2xmbmZrYjV5ZmZycjd0eWxhc3N5MmNuMmZibDFhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pkck2unt0XQfc4gs3R/giphy.webp" alt="" />
            </div>

            <div className='onesection'>
                <h4>Elbow: {elbowval}</h4>
                <img className='claw' src={claw} alt="" />
                <img className='rotating' style={{ transform: "scaleX(-1)" }} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExazlieDN6dG12M2xmbmZrYjV5ZmZycjd0eWxhc3N5MmNuMmZibDFhbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Pkck2unt0XQfc4gs3R/giphy.webp" alt="" />
            </div>


          </div>
        </div>
        
      </div>
    </div>
  )
}

export default App
