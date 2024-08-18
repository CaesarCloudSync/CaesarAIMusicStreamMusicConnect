export default function ShowCurrentTrack({mqttConnect,mqttDisconnect,connectStatus}:any){
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",height:"90px",backgroundColor:"grey",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px",marginTop:"auto",padding:"10px",gap:"10px"}}>
        <div style={{display:"flex",gap:"10px"}}>
            <div style={{width:"70px",height:"70px",backgroundColor:"green",borderRadius:"5px"}}>
                
            </div>
            <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <p >Hello</p>
            </div>
        </div>

        <div style={{width:"110px",height:"70px",backgroundColor:"green",borderRadius:"5px",alignSelf:"center"}}>
            
        </div>
        <a style={{cursor:"pointer"}}  onClick={() =>{if (connectStatus === "Connect"){mqttConnect(url, options)} else if (connectStatus === "Connected"){mqttDisconnect()}}}>
        <div style={{width:"50px",height:"50px",backgroundColor:connectStatus === "Connected" ? "yellow" :"black",borderRadius:"5px"}}>

  
        </div>
        </a>
        </div>
    )
}