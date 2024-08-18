import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import DevicesIcon from '@mui/icons-material/Devices';
import PlayerApp from './Player';
export default function ShowCurrentTrack({mqttConnect,mqttDisconnect,connectStatus,currentTrack}:any){
    const initialConnectionOptions = {
        // ws or wss
        protocol: 'ws',
        host: 'broker.emqx.io',
        clientId: 'emqx_react_' + Math.random().toString(16).substring(2, 8),
        // ws -> 8083; wss -> 8084
        port: 8083,
        /**
         * By default, EMQX allows clients to connect without authentication.
         * https://docs.emqx.com/en/enterprise/v4.4/advanced/auth.html#anonymous-login
         */
        username: 'emqx_test',
        password: 'emqx_test',
      }
    const { protocol, host, clientId, port, username, password } = initialConnectionOptions
    const url = `${protocol}://${host}:${port}/mqtt`
    const options = {
      clientId,
      username,
      password,
      clean: true,
      reconnectPeriod: 1000, // ms
      connectTimeout: 30 * 1000, // ms
    }
    return(
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",height:"90px",backgroundColor:"#141213",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",marginTop:"auto",padding:"10px",gap:"10px"}}>
        <div style={{display:"flex",gap:"10px"}}>
            <div style={{width:"70px",height:"70px",backgroundColor:"#141213",borderRadius:"5px"}}>
            {currentTrack.thumbnail !== "" && <img style={{width:"100%",height:"100%",borderRadius:"10px"}} src={currentTrack?.thumbnail}></img>}
            </div>
            <div style={{display:"flex",flexDirection:"column",padding:"10px"}}>
                <p style={{color:"white"}}>{currentTrack.album_name}</p>
                <p style={{color:"grey"}}>{currentTrack.artist}</p>
            </div>
        </div>

        <div style={{width:"110px",height:"70px",backgroundColor:"#141213",borderRadius:"5px",alignSelf:"center",marginRight:currentTrack.album_name === "" ? "10px":"110px",justifyContent:"center",alignItems:"center",display:"flex"}}>
  
        {currentTrack.album_name !== "" &&  <PlayerApp key={currentTrack.name} currentsong={currentTrack}/>}
            
        </div>
        <a style={{cursor:"pointer"}}  onClick={() =>{if (connectStatus === "Connect"){mqttConnect(url, options)} else if (connectStatus === "Connected"){mqttDisconnect()}}}>
        <div style={{width:"50px",height:"50px",borderRadius:"5px",justifyContent:"center",alignItems:"center",display:"flex"}}>
            <DevicesIcon sx={{ fontSize: 40 }} style={{color:connectStatus === "Connected" ? "green" :"white"}}></DevicesIcon>

  
        </div>
        </a>
        </div>
    )
}
/*
          <SkipPreviousIcon sx={{ fontSize: 40 }}   style={{color:"white"}}/>
            <PauseIcon sx={{ fontSize: 40 }}  style={{color:"white"}}/>
            <SkipNextIcon sx={{ fontSize: 40 }}  style={{color:"white"}}/> */