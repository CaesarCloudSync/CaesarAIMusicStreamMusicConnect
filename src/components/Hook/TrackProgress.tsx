export default function TrackProgress({progess=0}:any){
    return(
        <div style={{display:"flex",alignItems:"center",width:`100%`,height:"5px",backgroundColor:"grey",borderTopLeftRadius:"2px",borderTopRightRadius:"2px",marginTop:"auto"}}>
                    <div style={{display:"flex",alignItems:"center",width:`${progess}%`,height:"5px",backgroundColor:"white",borderTopLeftRadius:"2px",borderTopRightRadius:"2px",marginTop:"auto"}}>

                    </div>

        </div>
    )
}