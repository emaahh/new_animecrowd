import Image from 'next/image'
import loadingGIF from '/public/loadingGIF.gif';
import favicon from "/public/favicon.ico";

function Loading(props) {
    return (
        <div style={{width: '-webkit-fill-available', flexDirection: 'column-reverse', position: 'absolute', top: '0px', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
            <Image className="heartbeat" src={loadingGIF} style={{width: '100px', height: 'auto', borderRadius: '30px'}}/> 
            <br></br>
        </div>
    )
}

export default Loading