import { Fireworks } from '@fireworks-js/react' //DA TOGLIERE
 

function Loading(props) {
    return (
        <>
            <div style={{width: '-webkit-fill-available', flexDirection: 'column', position: 'absolute', top: '0px', left: '0', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', height: '100vh', zIndex: '9999', display: 'flex', flexWrap: 'nowrap'}}>
                <img className="heartbeat" src="/loadingGIF.gif" style={{width: '100px', height: 'auto', borderRadius: '30px'}}/> 
                
                <br></br>

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

                <p>BUON 2023 🎆</p>
                <p>dal team di AnimeCrowd</p>
            </div>
                
                <style>
                    {`
                        .slitta {

                            -moz-animation: slittaanim 4s infinite;
                            -webkit-animation: slittaanim 4s infinite;
                                -o-animation: slittaanim 4s infinite;
                                    animation: slittaanim 4s infinite;
                            
                            margin-right: auto;
                            margin-left: -200px;
                            position: relative;
                            z-index: 444444;

                            display: block;
                            
                            width: 50%;
                        }
                        @keyframes slittaanim {
                            from {left: 0vw}
                            to {left: 150vw}
                        }
                    `}
                </style>
        </>
    )
}

export default Loading