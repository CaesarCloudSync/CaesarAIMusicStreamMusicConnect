export default function TrackProgress({progress,duration}:any){
    console.log(progress,duration)
    return(
        <div style={{display:"flex",alignItems:"center",width:`100%`,height:"5px",backgroundColor:"grey",borderTopLeftRadius:"2px",borderTopRightRadius:"2px"}}>
                    <div style={{display:"flex",alignItems:"center",width:`${(progress/ duration) * 100}%`,height:"5px",backgroundColor:"white",borderTopLeftRadius:"2px",borderTopRightRadius:"2px",marginTop:"auto"}}>

                    </div>

        </div>
    )
}