export default function TrackProgress({progess=100}:any){
    return(
        <div style={{display:"flex",alignItems:"center",width:`${progess}%`,height:"10px",backgroundColor:"red",borderTopLeftRadius:"2px",borderTopRightRadius:"2px",marginTop:"auto"}}>
        </div>
    )
}