export const DashboardHome = ()=> {

    return (
        <div className="w-full h-full p-10">
            <h2>
                Dashboard 
                </h2>

                <div className="w-full flex justify-center items-center space-x-5 mt-5">
                    <div className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg">
                    <p>0</p>
                    <p>Enrolled Courses</p>
                    </div>

                     <div className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg">
                    <p>0</p>
                    <p>Enrolled Courses</p>
                    </div>

                     <div className="w-1/3 flex flex-col p-5 shadow-lg bg-white rounded-lg">
                    <p>0</p>
                    <p>Enrolled Courses</p>
                    </div>
                </div>

                  <h2 className="mt-10">
                My Courses 
                </h2>

                <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-5">
                    <div className="w-[49%] h-56 flex flex-col items-center justify-center p-5 shadow-lg bg-white rounded-lg">
                    <p>Reading</p>
                    </div>

                     <div className="w-[49%] h-56 flex flex-col items-center justify-center p-5 shadow-lg bg-white rounded-lg">
                     <p>Writing</p>
                    </div>

                     <div className="w-[49%] h-56 flex flex-col items-center justify-center p-5 shadow-lg bg-white rounded-lg">
                    <p>Listening</p>
                    </div>

                     <div className="w-[49%] h-56 flex flex-col items-center justify-center p-5 shadow-lg bg-white rounded-lg">
                     <p>Speaking</p>
                    </div>
                </div>

        </div>
    )
}