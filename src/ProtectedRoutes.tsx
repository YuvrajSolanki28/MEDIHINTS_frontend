import React, { useEffect } from 'react'

const ProtectedRoutes = (props:any) => {
const [allowed, setAllowed] = React.useState(false)
    const pasentUrls = ['/home']
    useEffect(() => {
      localStorage.getItem("")
    if(pasentUrls.includes(window.location.pathname)){
            setAllowed(true)
            }else{
                setAllowed(false)
                }
    }
    ,[]);
  return (
    allowed?    <div>{props.children}</div>:<div>Not Allowed</div>
  )
}

export default ProtectedRoutes