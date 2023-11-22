import RealtorCard from "./realtor-card"

const RealtorLayout = ({realtors}) => {
    return (
        <div className="w-full p-3 flex flex-col items-center  h-[90vh] overflow-auto">
            {realtors.map((realtor, index) => 
                <RealtorCard key={index} realtor={...realtor} />
            )}
        </div>
    )
}

export default RealtorLayout