import { ReactNode } from "react"
import { Fragment } from "react/jsx-runtime"

interface Props{
 titulo?: string,
 texto: string
}
interface Props_father{
    children: ReactNode,
 
   }
   
function Titulo(props:Props_father) {
    const {children} = props
  return (
    <div className="card" style={{
        width: "500px",
    }}>

  <img className="card-img-top" src="..." alt="Card image cap"/>
  <div className="card-body">
   {children}
  </div>
</div>
  )
}

export function Cartbody(props:Props) {
 const {titulo ,texto} = props
    return (
        <Fragment>
    <h5 className="card-title">{titulo}</h5>
<p className="card-text">{texto}</p>
<a href="#" className="btn btn-primary">Go somewhere</a>
</Fragment>
      )
  }

export default Titulo
