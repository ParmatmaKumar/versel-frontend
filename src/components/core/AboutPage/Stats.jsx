const Stats = [
    {count: "5K+", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
 
]
const StatsComponent = () => {
    return (
        <section>
            <div >
                <div className="flex justify-between items-center mx-30 py-10 ">
                    {
                        Stats.map((data,index)=>{
                            return (
                                <div key={index} className="text-center">
                                    <h1 className="text-4xl font-bold text-white">{data.count}</h1>
                                    <h2 className="text-gray-400">{data.label}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent