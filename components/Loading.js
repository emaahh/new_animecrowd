import { Fireworks } from '@fireworks-js/react' //DA TOGLIERE
 

function Loading(props) {
    return (
        <>
        
            <div style={{width: '-webkit-fill-available', flexDirection: 'column', position: 'absolute', top: '0px', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
                <img className="heartbeat" src="/loadingGIF.gif" style={{width: '100px', height: 'auto', borderRadius: '30px'}}/> 

               {/* 
                    <Fireworks
                        options={{
                            rocketsPoint: {
                            min: 0,
                            max: 100
                            }
                        }}
                        style={{
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            background: 'transparent'
                        }}
                    />
                */}

            </div>
        </>
    )
}

export default Loading