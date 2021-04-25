import React, { useState } from 'react'

import './calculator.css'

export default function Core() {

    const [screen, setscreen] = useState(0)

    const [aux, setAux] = useState(0)

    const [currentOperation, setcurrentOperation] = useState()

    const [oldOperation, setoldOperation] = useState(false)

    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9,0,]

    const operations = ['SUM', 'SUB', 'MUL', 'DIV','=', 'AC',]

    const handleScreen = ({ target }) => {

        if(oldOperation){
            setAux(screen);
            setscreen(0);
        }

        const isOperation = operations.filter((operation) => {
            if (operation === target.name) { return true }
            else { return false }
        })

        console.log( 'tamaño operacion',isOperation)

        if (isOperation.length === 0) {
            if (screen === 0) {
                setscreen(target.name)
            } else if (screen > 0) {
                setscreen(screen => screen.toString() + target.name)
            }
            setoldOperation(false)
        } else {
            if (aux === 0) {
                setAux(screen);
                setscreen(0);
                setcurrentOperation(target.name);
            } else {
                
                handleOperation(target.name)

            }
            


        }
    }

    const handleOperation = (operation) => {
        if (operation) {
            if (operation === 'SUM') {
                setscreen(screen => parseFloat(aux) + parseFloat(screen));
            }else if(operation==='SUB'){   
                setscreen(screen =>  parseFloat(aux) - parseFloat(screen) );
            }else if(operation==='MUL'){   
                setscreen(screen => parseFloat(aux) * parseFloat(screen));
            }else if(operation==='DIV'){   
                setscreen(screen => parseFloat(aux) / parseFloat(screen));
            }else if(operation==='AC'){   
                setscreen(0);
                setAux(0);
                setoldOperation(false);
            }else if(operation==='='){
                handleOperation(currentOperation)
            }
            console.log('aux',aux,'scr',screen)
        }
        setAux(0)
        setoldOperation(true)
    }


    return (
        <>
            
            <div id='calculator-shell'>
            <input type='text' readOnly={true} name='screen' key='screen' value={screen} className='input-screen' />
            {
                numbers.map(number => {
                    return (<button
                        key={number}
                        name={number}
                        onClick={handleScreen}
                    >{number}</button>)
                })

            }
            {
                operations.map(operation => {
                    return (<button
                        key={operation}
                        name={operation}
                        onClick={handleScreen}
                    >{operation}</button>)
                })

            }
           

            </div>
        </>
    )
}
