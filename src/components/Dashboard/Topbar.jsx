import logo from "../../assets/logos/ielts-logo.png"

export const Topbar = ()=> {

    return (
        <div className="w-scren h-[6vh] flex justify-between items-center px-10 py-1 shadow-sm">
            
            <img src={logo} alt="" className="w-[80px] h-full" />
            
        </div>
    )
}