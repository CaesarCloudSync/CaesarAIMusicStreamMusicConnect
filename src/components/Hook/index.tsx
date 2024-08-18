import React, { createContext, useEffect, useState } from 'react'
import Connection from './Connection'
import Publisher from './Publisher'
import Subscriber from './Subscriber'
import Receiver from './Receiver'
import mqtt from 'mqtt'
import useWindowDimensions from '../hooks/useWIndowDimensions'
import ShowCurrentTrack from './ShowCurrentTrack'
import TrackProgress from './TrackProgress'
export const QosOption = createContext([])
// https://github.com/mqttjs/MQTT.js#qos
const qosOption = [
  {
    label: '0',
    value: 0,
  },
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
]

const HookMqtt = () => {
  const dimensions = useWindowDimensions()
  const [client, setClient] = useState(null)
  const [isSubed, setIsSub] = useState(false)
  const [payload, setPayload] = useState({album_name:"",thumbnail:"",artist_name:"",name:"",progess:0,duration:0})
  const [connectStatus, setConnectStatus] = useState('Connect');
  const [subscription,setSubscription] = useState({topic: 'caesaraimusicstreamconnect/current-track',qos: 2});
  const [text,setText] = useState("");
  const mqttConnect = (host:any, mqttOption:any) => {
    setConnectStatus('Connecting')
    /**
     * if protocol is "ws", connectUrl = "ws://broker.emqx.io:8083/mqtt"
     * if protocol is "wss", connectUrl = "wss://broker.emqx.io:8084/mqtt"
     *
     * /mqtt: MQTT-WebSocket uniformly uses /path as the connection path,
     * which should be specified when connecting, and the path used on EMQX is /mqtt.
     *
     * for more details about "mqtt.connect" method & options,
     * please refer to https://github.com/mqttjs/MQTT.js#mqttconnecturl-options
     */
    setClient(mqtt.connect(host, mqttOption))
  }

  useEffect(() => {
    if (client) {
      // https://github.com/mqttjs/MQTT.js#event-connect
      client.on('connect', () => {
        setConnectStatus('Connected')
        console.log('connection successful')
        mqttSub()
      })

      // https://github.com/mqttjs/MQTT.js#event-error
      client.on('error', (err:any) => {
        console.error('Connection error: ', err)
        client.end()
        mqttUnSub()
      })

      // https://github.com/mqttjs/MQTT.js#event-reconnect
      client.on('reconnect', () => {
        setConnectStatus('Reconnecting')
      })

      // https://github.com/mqttjs/MQTT.js#event-message
      client.on('message', (topic:any, message:any) => {
        /*IMPORTANT HERE */
        const payload:any = { topic, message: message.toString() }
        setPayload(payload)
        console.log(`received message: ${message} from topic: ${topic}`)
      })
    }
  }, [client])

  // disconnect
  // https://github.com/mqttjs/MQTT.js#mqttclientendforce-options-callback
  const mqttDisconnect = () => {
    if (client) {
      try {
        client.end(false, () => {
          setConnectStatus('Connect')
          console.log('disconnected successfully')
        })
      } catch (error) {
        console.log('disconnect error:', error)
        mqttUnSub()
      }
    }
  }

  // publish message
  // https://github.com/mqttjs/MQTT.js#mqttclientpublishtopic-message-options-callback
  const mqttPublish = () => {
    if (client) {
      // topic, QoS & payload for publishing message
      const { topic, qos, payload } = Object.assign({},subscription,{payload:text})//context
      client.publish(topic, payload, { qos }, (error:any) => {
        if (error) {
          console.log('Publish error: ', error)
        }
      })
    }
  }

  const mqttSub = () => {
    if (client) {
      // topic & QoS for MQTT subscribing
      const { topic, qos } =  subscription
      // subscribe topic
      // https://github.com/mqttjs/MQTT.js#mqttclientsubscribetopictopic-arraytopic-object-options-callback
      client.subscribe(topic, { qos }, (error:any) => {
        if (error) {
          console.log('Subscribe to topics error', error)
          return
        }
        console.log(`Subscribe to topics: ${topic}`)
        setIsSub(true)
      })
    }
  }

  // unsubscribe topic
  // https://github.com/mqttjs/MQTT.js#mqttclientunsubscribetopictopic-array-options-callback
  const mqttUnSub = () => {
    if (client) {
      const { topic, qos } =  subscription
      client.unsubscribe(topic, { qos }, (error:any) => {
        if (error) {
          console.log('Unsubscribe error', error)
          return
        }
        console.log(`unsubscribed topic: ${topic}`)
        setIsSub(false)
      })
    }
  }

  return (
    <div style={{padding:"20px",display:"flex",flexDirection:"column",gap:"50px",height:dimensions.height}}>
      
      <div style={{display:"flex",gap:"10px"}}>
      <div style={{width:"130px",height:"100px",backgroundColor:"grey",borderRadius:"10px",marginTop:"auto"}}>

      </div>


        <h1  className="text-3xl font-bold underline" style={{color:"white",position:"relative",top:"24px"}}>CaesarAIMusicStream</h1>
      </div>
      <div style={{width:"80%",height:`${dimensions.height * 0.6}px`,backgroundColor:"grey",borderRadius:"10px",marginTop:"auto"}}>

      </div>
      {/*
            <input onChange={(e) =>{setText(e.target.value)}}></input>
      <button style={{color:"white"}} onClick={() =>{mqttPublish()}}>
      Publish
      </button>
 */}
      <div>
      <TrackProgress progess={payload.progess}></TrackProgress>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",height:"90px",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",marginTop:"auto",padding:"10px",gap:"10px"}}>

        </div>
        {payload.album_name !== "" && <ShowCurrentTrack mqttConnect={mqttConnect} mqttDisconnect={mqttDisconnect} connectStatus={connectStatus}></ShowCurrentTrack>}


      </div>


    </div>
  )
}

export default HookMqtt
/*

    <Connection
      connect={mqttConnect}
      disconnect={mqttDisconnect}
      connectBtn={connectStatus}
    />
    <QosOption.Provider value={qosOption}>
      <Subscriber sub={mqttSub} unSub={mqttUnSub} showUnsub={isSubed} />
      <Publisher publish={mqttPublish} />
    </QosOption.Provider>
    <Receiver payload={payload} />
      */