const Counter = ({title, desc}) => {

    return (
        <div className="text-white p-10 flex flex-col items-center">
            <p className="text-[50px] font-bold">{title}</p>
            <p className="text-[22px] mt-[-5px]">{desc}</p>
        </div>
    )
}

export default Counter