import './Pitanje.css'

function Pitanje(props){
    function handleClick1(){
        props.akcija1()
    }
    function handleClick2(){
        props.akcija2()
    }
    function handleClick3(){
        props.akcija3()
    }
    function handleClick4(){
        props.akcija4()
    }

    return(
        <div>
            <h3>{props.pit}</h3>
            <button className='buttonPitanje' onClick={handleClick1}>{props.odg1}</button>
            <button className='buttonPitanje' onClick={handleClick2}>{props.odg2}</button>
            <button className='buttonPitanje' onClick={handleClick3}>{props.odg3}</button>
            <button className='buttonPitanje' onClick={handleClick4}>{props.odg4}</button>
        </div>
    )
}
export default Pitanje