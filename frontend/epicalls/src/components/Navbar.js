'use client'

export function Navbar() {


  return (
    <>
   <div className="w-screen h-24 px-20 shadow-md flex justify-between items-end py-2">
    <div>EPI</div>
    <div>user</div>
   </div>
   <div className="w-screen h-12 py-2 shadow-md flex justify-center items-center px-72">

   <nav className="w-9/12 h-full flex justify-between items-center">
    <div className="text-teal-600 cursor-pointer">Home</div>
    <div className="text-teal-600 cursor-pointer">Users</div>
    <div className="text-teal-600 cursor-pointer">Projects</div>
    <div className="text-teal-600 cursor-pointer">Calls</div>
    <div className="text-teal-600 cursor-pointer">Charts</div>
   </nav>
   </div>
    </>

    
  )
}
